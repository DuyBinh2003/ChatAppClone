import Post from "./components/Post";
import axiosClient from "../axios-clients";
import { useEffect, useState } from "react";

export default function Content() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axiosClient
            .get("/posts")
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div>
            {posts && posts.map((post) => <Post key={post.id} data={post} />)}
        </div>
    );
}
