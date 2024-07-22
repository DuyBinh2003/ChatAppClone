import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
    faHome,
    faNewspaper,
    faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

import axiosClient from "~/axios-clients";
import { SidebarLayout } from "~/layouts";
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
            id: 1,
            name: "All",
            icon: faHome,
            to: "/search/all?q=" + query,
            onClick: () => setResultQuery(null),
        },
        {
            id: 2,
            name: "User",
            icon: faUserGroup,
            to: "/search/user?q=" + query,
            onClick: () => setResultQuery(null),
        },
        {
            id: 3,
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
        <SidebarLayout sidebar={sidebar} title="Search query">
            {resultQuery && renderResult()}
        </SidebarLayout>
    );
}
