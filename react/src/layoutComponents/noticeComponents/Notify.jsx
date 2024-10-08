import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import { Button } from "~/layoutComponents/components";
import axiosClient from "~/axios-clients";

const textNotify = {
    comment: "commented on your post",
    like: "liked your post",
    follow: "followed you",
    mention: "mentioned you in a comment",
    reply: "replied to your comment",
    share: "shared your post",
    post: "posted",
};
export default function Notify({ setButtonActive }) {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        axiosClient
            .get("/notifications")
            .then((response) => {
                setNotifications(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="width-notice px-2 py-4 rounded-b-lg bg-zinc-900">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl pl-2">Notifications</h1>
                <div className="flex items-center">
                    <Button iconClass={faEllipsis} moreClass={["mr-2"]} />
                </div>
            </div>
            <ul className="mt-2">
                {notifications.map((item) => (
                    <li key={item.id}>
                        <Button
                            imgPath={item.reference.user.avatar}
                            text={`${item.reference.user.name} ${
                                textNotify[item.type]
                            }`}
                            onClick={() => {
                                setButtonActive(null);
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
