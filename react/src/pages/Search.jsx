import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
    faHome,
    faNewspaper,
    faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

import axiosClient from "~/axios-clients";
import { Sidebar } from "~/layoutComponents";
import { ListUser, Post } from "~/layoutComponents/components";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export default function Search() {
    const query = useQuery().get("q");
    const navigate = useNavigate();
    const { type } = useParams();
    const [resultQuery, setResultQuery] = useState(null);

    const sidebar = [
        {
            name: "All",
            icon: faHome,
            to: "/search/all?q=" + query,
            onClick: () => setResultQuery(null),
        },
        {
            name: "User",
            icon: faUserGroup,
            to: "/search/user?q=" + query,
            onClick: () => setResultQuery(null),
        },
        {
            name: "Post",
            icon: faNewspaper,
            to: "/search/post?q=" + query,
            onClick: () => setResultQuery(null),
        },
    ];
    sidebar.map((item) => {
        item.name.toLowerCase() === type.toLowerCase()
            ? (item.active = true)
            : (item.active = false);
    });
    useEffect(() => {
        axiosClient
            .get(`/search/${type}/?q=${query}&type=${type}`)
            .then((res) => {
                setResultQuery(res.data);
            });
    }, [query, type]);

    const renderResult = () => {
        if (!resultQuery) {
            return <p>Loading...</p>;
        }
        switch (type) {
            case "all":
                return (
                    <div>
                        <ListUser
                            users={resultQuery?.users}
                            type="box"
                            onClickSeeAll={() => {
                                setResultQuery(null);
                                navigate("/search/user?q=" + query);
                            }}
                        />
                        <ul>
                            {resultQuery?.posts.map((post) => (
                                <li key={post.id}>
                                    <Post data={post} />
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case "user":
                return <ListUser users={resultQuery} />;
            case "post":
                return (
                    <ul>
                        {resultQuery.map((post) => (
                            <li key={post.id}>
                                <Post data={post} />
                            </li>
                        ))}
                    </ul>
                );

            default:
                return <ListUser users={resultQuery} type="box" />;
        }
    };

    return (
        <div className="flex justify-between margin-left-width-notice">
            <div className="fixed top-14 left-0 bottom-0 width-notice px-2 bg-zinc-900">
                <h1 className="text-2xl">Result query</h1>
                <hr className="my-2" />
                <div className="h-full scrollbar-webkit overflow-y-scroll scroll-track-gray">
                    <Sidebar data={sidebar} />
                </div>
            </div>
            <div className="mx-auto w-1/2 mt-4">
                {resultQuery && renderResult()}
            </div>
        </div>
    );
}
