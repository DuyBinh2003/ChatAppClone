import {
    faUserCheck,
    faUserPlus,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import { SidebarLayout } from "~/layouts";

export default function Friend() {
    const sidebar = [
        {
            id: 1,
            name: "Home",
            icon: faUsers,
            to: "/friends",
        },
        {
            id: 1,
            name: "Requests",
            icon: faUserCheck,
            to: "/friends/requests",
        },
        {
            id: 1,
            name: "Suggestions",
            icon: faUserPlus,
            to: "/friends/suggestions",
        },
    ];
    const { type } = useParams();
    return (
        <SidebarLayout sidebar={sidebar} title="Friends">
            <h1>{type}</h1>
        </SidebarLayout>
    );
}
