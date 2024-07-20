import { useStateContext } from "../contexts/ContextProvider";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "../axios-clients";
import Button from "../layoutComponents/components/Button";
import AvatarIcon from "../layoutComponents/components/AvatarIcon";
import Content from "../layoutComponents/Content";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export default function Profile() {
    const { currentUser } = useStateContext();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const userId = query.get("id");

    const [user, setUser] = useState({});
    const [userFriends, setUserFriends] = useState([]);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        userId === currentUser.id
            ? setUser(currentUser)
            : axiosClient
                  .get(`/user/${userId}`)
                  .then((res) => {
                      setUser(res.data);
                  })
                  .catch((err) => {
                      console.log(err);
                  });
        axiosClient
            .get(`/friends/${userId}`)
            .then((res) => {
                setUserFriends(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const observer = useRef();
    const lastPostRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    useEffect(() => {
        axiosClient
            .get(`/user-posts/${user.id}?page=${page}`)
            .then((response) => {
                console.log(response.data);
                setPosts((prevPosts) => [...prevPosts, ...response.data]);
                setHasMore(response.data.length > 0);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [page, user]);

    return (
        <div className="w-full">
            <header className="bg-zinc-900">
                <div className="w-3/5 mx-auto">
                    <div className="h-80 rounded-b-xl overflow-hidden">
                        <img
                            className="h-full w-full object-cover"
                            src={user.background}
                            alt={user.name}
                        />
                    </div>
                    <div className="flex items-end px-8 z-10 -translate-y-10">
                        <AvatarIcon imgPath={user.avatar} size="max" />
                        <div className="pb-4 ml-8">
                            <h1 className="text-2xl font-bold">{user.name}</h1>
                            <p className="text-gray-400 my-3">
                                {user.numfriends} friends
                            </p>
                            <ul className="flex">
                                {userFriends.map(
                                    (friend, index) =>
                                        index < 6 && (
                                            <li key={index}>
                                                <Button
                                                    imgPath={friend.avatar}
                                                />
                                            </li>
                                        )
                                )}
                                <li key={6}>
                                    <Button iconClass={faPlus} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <div className="flex w-3/5 mx-auto mt-2 px-8">
                <div className="w-2/5 mr-4">
                    <Content
                        posts={posts}
                        lastPostRef={lastPostRef}
                        loading={loading}
                    />
                </div>
                <div className="flex-1">
                    <Content
                        posts={posts}
                        lastPostRef={lastPostRef}
                        loading={loading}
                    />
                </div>
            </div>
            <div></div>
        </div>
    );
}
