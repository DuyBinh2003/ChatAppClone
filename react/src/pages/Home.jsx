import Button from "../layoutComponents/components/Button";
import Content from "../layoutComponents/Content";
import Sidebar from "../layoutComponents/Sidebar";
import {
    faEllipsis,
    faSearch,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axiosClient from "../axios-clients";
import Overlay from "../layoutComponents/Overlay";
import Message from "../layoutComponents/components/Message";
import TippyComponent from "../layoutComponents/components/TippyComponent";
import { useStateContext } from "../contexts/ContextProvider";
import echo from "../echo";

export default function Home() {
    const [friends, setFriends] = useState([]);
    const [isChatting, setIsChatting] = useState([]);

    const { currentUser } = useStateContext();
    useEffect(() => {
        echo.private(`message-send.${currentUser.id}`) // Thay `message-send` bằng tên kênh bạn đã định nghĩa trong Laravel
            .listen(".MessageSendEvent", (event) => {
                console.log("Received message:", event.message);
                // Xử lý logic khi nhận được sự kiện
            });
    }, [currentUser.id]);
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
            {/* <nav className="fixed left-2 top-14 bottom-0 w-1/5 overflow-y-scroll scrollbar-webkit scrollbar-hover">
                <div className="h-full pr-2">
                    <Sidebar />
                    <hr />
                    <Sidebar />
                </div>
            </nav> */}
            <main className="flex justify-center">
                <div className="w-2/5 pt-2">
                    <Content />
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
                    <Sidebar data={friends} setItemSelected={addChatting} />
                </div>
            </nav>
            {isChatting.length > 0 && (
                <Overlay positionClassName="fixed bottom-0 right-0">
                    <div className="flex items-end">
                        <ul className="flex flex-reverse">
                            {isChatting
                                .filter((chat) => chat.state === "show")
                                .map((friend) => (
                                    <li key={friend.id} className="mr-2">
                                        <Message
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
                                                    imgPath={friend.avt_img}
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
                </Overlay>
            )}
        </div>
    );
}
