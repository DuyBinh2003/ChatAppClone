import Button from "../components/Button";
import {
    faEllipsis,
    faExpand,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../components/Input";
import { DefaultContext } from "../../layouts/DefaultLayout";
import { useStateContext } from "../../contexts/ContextProvider";
import { Link } from "react-router-dom";

export default function Message({ setButtonActive }) {
    const { currentUser } = useStateContext();
    const { friends, addChatting } = DefaultContext();
    return (
        <div className="width-notice px-2 py-4 rounded-b-lg bg-zinc-900">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl pl-2">Message</h1>
                <div className="flex items-center">
                    <Button iconClass={faEllipsis} moreClass={["mr-2"]} />
                    <Link to="/messenger">
                        <Button iconClass={faExpand} moreClass={["mr-2"]} />
                    </Link>
                    <Button iconClass={faSearch} />
                </div>
            </div>
            <Input placeholder="Search in messenger" leftIcon={faSearch} />
            <ul className="mt-2">
                {friends.map((friend) => (
                    <li key={friend.id}>
                        <Button
                            imgPath={friend.avatar}
                            text={friend.name}
                            subText={
                                friend.latestMessage &&
                                `
                                    ${
                                        friend.latestMessage.user_id_send ===
                                        currentUser.id
                                            ? "You: "
                                            : ""
                                    }
                                    ${friend.latestMessage.content}
                                    ${friend.latestMessage.release}
                                `
                            }
                            onClick={() => {
                                addChatting(friend);
                                setButtonActive(null);
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
