import { Navigate, Outlet } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import { useStateContext } from "../contexts/ContextProvider";

import Header from "../layoutComponents/Header";
import Chat from "~/layoutComponents/noticeComponents/Chat";
import TippyComponent from "~/layoutComponents/components/TippyComponent";
import Button from "~/layoutComponents/components/Button";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const DefaultLayoutContext = createContext({
    friends: null,
    setFriends: () => {},
    addChatting: () => {},
});

export default function DefaultLayout() {
    const { token } = useStateContext();
    const [friends, setFriends] = useState([]);
    const [isChatting, setIsChatting] = useState([]);

    if (!token) return <Navigate to="/login" />;

    const removeChatting = (friendId) => {
        setIsChatting(isChatting.filter((item) => item.id !== friendId));
    };
    const changeChattingState = (userId, state) => {
        setIsChatting(
            isChatting.map((chat) => {
                if (chat.id === userId) {
                    return { ...chat, state: state };
                }
                return chat;
            })
        );
    };
    const addChatting = (friend) => {
        if (!isChatting.some((chat) => chat.id === friend.id)) {
            setIsChatting([
                ...isChatting,
                {
                    ...friend,
                    state: "show",
                },
            ]);
        } else {
            setIsChatting(
                isChatting.map((chat) => {
                    if (chat.id === friend.id) {
                        return { ...chat, state: "show" };
                    }
                    return chat;
                })
            );
        }
    };
    return (
        <div className="text-white">
            <DefaultLayoutContext.Provider
                value={{ friends, setFriends, addChatting }}
            >
                <Header />
                <div className="min-h-screen pt-14 bg-black">
                    <Outlet />
                </div>
            </DefaultLayoutContext.Provider>
            {isChatting.length > 0 && (
                <div className="fixed bottom-0 right-0">
                    <div className="flex items-end">
                        <ul className="flex flex-reverse">
                            {isChatting
                                .filter((chat) => chat.state === "show")
                                .map((friend) => (
                                    <li key={friend.id} className="mr-2">
                                        <Chat
                                            changeChattingState={
                                                changeChattingState
                                            }
                                            removeChatting={removeChatting}
                                            userChat={friend}
                                        />
                                    </li>
                                ))}
                        </ul>
                        <ul className="flex items-center flex-col-reverse mb-1 mr-1">
                            {isChatting
                                .filter((chat) => chat.state === "hide")
                                .map((friend) => (
                                    <li key={friend.id} className="m-1">
                                        <TippyComponent
                                            content={friend.name}
                                            placement="left"
                                        >
                                            <div className="btn-container">
                                                <Button
                                                    imgPath={friend.avatar}
                                                    size="large"
                                                    onClick={() => {
                                                        changeChattingState(
                                                            friend.id,
                                                            "show"
                                                        );
                                                    }}
                                                />
                                                <div className="icon-hidden">
                                                    <Button
                                                        iconClass={faXmark}
                                                        size="small"
                                                        bgColor="gray"
                                                        onClick={() => {
                                                            removeChatting(
                                                                friend.id
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </TippyComponent>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export const DefaultContext = () => useContext(DefaultLayoutContext);
