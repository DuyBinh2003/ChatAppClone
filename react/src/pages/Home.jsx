import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    faEllipsis,
    faFaceSmile,
    faImages,
    faSearch,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";

import { useStateContext } from "../contexts/ContextProvider";
import { DefaultContext } from "../layouts/DefaultLayout";
import { Button } from "~/layoutComponents/components";
import { Sidebar, Content } from "~/layoutComponents";
import { CreatePost } from "~/layoutComponents/formComponents";
import axiosClient from "../axios-clients";

export default function Home() {
    const { currentUser } = useStateContext();
    const { friends, setFriends, addChatting } = DefaultContext();
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const leftSidebar = [
        {
            id: 1,
            name: currentUser.name,
            avatar: currentUser.avatar,
            to: "/profile/?id=" + currentUser.id,
        },
        {
            id: 2,
            name: "Friend",
            avatar: "",
            to: "/friends",
        },
    ];

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
                setPosts((prevPosts) => [...prevPosts, ...response.data]);
                setHasMore(response.data.length > 0);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [page]);

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
                    <CreatePost />
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
                        <Sidebar
                            data={friends.map((friend) => ({
                                ...friend,
                                onClick: () => addChatting(friend),
                            }))}
                        />
                    )}
                </div>
            </nav>
        </div>
    );
}
