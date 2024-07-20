import Button from "../layoutComponents/components/Button";
import Content from "../layoutComponents/Content";
import Sidebar from "../layoutComponents/Sidebar";
import { faEllipsis, faSearch } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../axios-clients";
import { DefaultContext } from "../layouts/DefaultLayout";
import { useStateContext } from "../contexts/ContextProvider";

import { useEffect, useState, useRef, useCallback } from "react";

export default function Home() {
    const { currentUser } = useStateContext();
    const { friends, setFriends, addChatting } = DefaultContext();

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

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
            .get(`/posts?page=${page}`)
            .then((response) => {
                console.log(response.data);
                setPosts((prevPosts) => [...prevPosts, ...response.data]);
                setHasMore(response.data.length > 0);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [page]);
    const leftSidebar = [
        {
            id: currentUser.id,
            name: currentUser.name,
            avatar: currentUser.avatar,
            to: "/profile/?id=" + currentUser.id,
        },
        {
            id: 2,
            name: "Friend",
            avatar: "",
        },
    ];
    useEffect(() => {
        axiosClient
            .get("/friends")
            .then((res) => {
                setFriends(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="w-full">
            <nav className="fixed left-2 top-14 bottom-0 w-1/5 overflow-y-scroll scrollbar-webkit scrollbar-hover">
                <div className="h-full pr-2">
                    <Sidebar data={leftSidebar} />
                </div>
            </nav>
            <main className="flex justify-center">
                <div className="w-2/5 pt-2">
                    <Content
                        posts={posts}
                        lastPostRef={lastPostRef}
                        loading={loading}
                    />
                </div>
            </main>
            <nav className="fixed right-2 top-14 bottom-0 w-1/5 overflow-y-scroll scrollbar-webkit scrollbar-hover">
                <div className="h-full p-2">
                    <div className="flex items-center justify-between ml-2">
                        <p className="text-md">Contact</p>
                        <div className="flex items-center">
                            <Button iconClass={faSearch} moreClass={["mr-2"]} />
                            <Button iconClass={faEllipsis} />
                        </div>
                    </div>
                    {friends && (
                        <Sidebar data={friends} onClickItem={addChatting} />
                    )}
                </div>
            </nav>
        </div>
    );
}
