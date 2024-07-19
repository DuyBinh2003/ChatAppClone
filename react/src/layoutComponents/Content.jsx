import Post from "./components/Post";
import axiosClient from "../axios-clients";
import { useEffect, useState, useRef, useCallback } from "react";

export default function Content() {
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
    return (
        <div>
            {posts &&
                posts.map((post, index) => {
                    if (posts.length === index + 1) {
                        return (
                            <div ref={lastPostRef} key={post.id}>
                                <Post data={post} />
                            </div>
                        );
                    } else return <Post key={post.id} data={post} />;
                })}
            {loading && <h1>Loading...</h1>}
        </div>
    );
}
