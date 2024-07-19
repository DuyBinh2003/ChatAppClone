import {
    faFaceSmile,
    faMinus,
    faPaperPlane,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import AvatarIcon from "./AvatarIcon";
import axiosClient from "../../axios-clients";
import { useStateContext } from "../../contexts/ContextProvider";
import echo from "../../echo";

export default function Chat({
    userChat,
    changeChattingState,
    removeChatting,
}) {
    const { currentUser } = useStateContext();
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        echo.channel(`message.${currentUser.id}`).listen(
            "NewMessage",
            (data) => {
                setMessages((prevMessages) => [data, ...prevMessages]);
            }
        );
        return () => {
            echo.leaveChannel(`message.${currentUser.id}`);
        };
    }, []);

    useEffect(() => {
        axiosClient
            .get(`/messages/${userChat.id}`)
            .then((res) => {
                setMessages(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const sendMessage = () => {
        const payload = {
            message: messageInput,
        };
        setMessageInput("");
        setMessages((prevMessages) => [
            {
                content: messageInput,
                user_id_send: currentUser.id,
                user_id_receive: userChat.id,
            },
            ...prevMessages,
        ]);
        axiosClient
            .post(`/message/${userChat.id}`, payload)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="w-80 height-message flex flex-col justify-between rounded-t-lg bg-zinc-900">
            <header className="flex justify-between items-center border-b border-zinc-700">
                <Button text={userChat.name} imgPath={userChat.avt_img} />
                <div className="flex items-center mx-2">
                    <Button
                        iconClass={faMinus}
                        moreClass={["mr-2"]}
                        onClick={() => {
                            changeChattingState(userChat.id, "hide");
                        }}
                    />
                    <Button
                        iconClass={faXmark}
                        onClick={() => {
                            removeChatting(userChat.id);
                        }}
                    />
                </div>
            </header>
            <div className="flex-1 flex flex-col-reverse pb-1 overflow-y-scroll scrollbar-webkit scrollbar-hover">
                {messages?.length > 0 &&
                    messages.map((message) => {
                        return message.user_id_send === userChat.id ? (
                            <div
                                key={message.id}
                                className="flex items-end mx-2 mt-2"
                            >
                                <AvatarIcon imgPath={userChat.avt_img} />
                                <p className="max-w-44 rounded-2xl bg-zinc-800 px-2 py-1 ml-2">
                                    {message.content}
                                </p>
                            </div>
                        ) : (
                            <div
                                key={message.id}
                                className="self-end mx-2 mt-2 max-w-60 rounded-2xl bg-blue-400 px-2 py-1 ml-2"
                            >
                                {message.content}
                            </div>
                        );
                    })}
            </div>
            <footer className="flex items-center p-1 border-t border-zinc-700">
                <div className="flex-1 mr-2">
                    <Input
                        rightIcon={faFaceSmile}
                        data={messageInput}
                        setData={setMessageInput}
                    />
                </div>
                <Button iconClass={faPaperPlane} onClick={sendMessage} />
            </footer>
        </div>
    );
}
