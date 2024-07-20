import Sidebar from "../layoutComponents/Sidebar";
import {
    faHome,
    faNewspaper,
    faPlus,
    faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosClient from "../axios-clients";
import AvatarIcon from "../layoutComponents/components/AvatarIcon";
import { DefaultContext } from "../layouts/DefaultLayout";
import Button from "../layoutComponents/components/Button";
import Post from "../layoutComponents/components/Post";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export default function Search() {
    const query = useQuery().get("q");
    const { type } = useParams();
    const [resultQuery, setResultQuery] = useState(null);
    const { friends } = DefaultContext();

    const sidebar = [
        {
            name: "All",
            icon: faHome,
            to: "/search/all/?q=" + query,
        },
        {
            name: "User",
            icon: faUserGroup,
            to: "/search/user/?q=" + query,
        },
        {
            name: "Post",
            icon: faNewspaper,
            to: "/search/post/?q=" + query,
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
                console.log(res.data);
                setResultQuery(res.data);
            });
    }, [query, type]);

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
                {resultQuery?.users && (
                    <div className="bg-zinc-900 my-2 rounded-md py-2 px-4">
                        <h1 className="text-2xl">Users</h1>
                        <ul>
                            {resultQuery.users.map((user) => (
                                <li
                                    key={user.id}
                                    className="flex items-center my-2"
                                >
                                    <div className="flex flex-1">
                                        <AvatarIcon
                                            imgPath={user.avatar}
                                            size="x-max"
                                        />
                                        <div className="ml-4">
                                            <p className="text-lg">
                                                {user.name}
                                            </p>
                                            <p className="text-slate-500">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                    {friends.some(
                                        (friend) => friend.id === user.id
                                    ) ? (
                                        <p>Friend</p>
                                    ) : (
                                        <p>No friend</p>
                                    )}
                                </li>
                            ))}
                            <Button
                                text="See all ..."
                                bgColor="gray"
                                iconClass={faPlus}
                            />
                        </ul>
                    </div>
                )}
                {resultQuery?.posts && (
                    <ul>
                        {resultQuery.posts.map((post) => (
                            <li
                                key={post.id}
                                className="flex items-center my-2"
                            >
                                <Post data={post} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
