import Button from "./components/Button";
import AvatarIcon from "./components/AvatarIcon";
import {
    faBars,
    faBell,
    faGamepad,
    faHome,
    faMessage,
    faSearch,
    faUserGroup,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import axiosClient from "../axios-clients";
import { useStateContext } from "../contexts/ContextProvider";
import TippyComponent from "./components/TippyComponent";
import Input from "./components/Input";
import Overlay from "./Overlay";
import Menu from "./components/noticeComponents/Menu";
import Message from "./components/noticeComponents/Message";
import Notify from "./components/noticeComponents/Notify";

export default function Header() {
    const { currentUser, setCurrentUser, setToken } = useStateContext();
    const [buttonActive, setButtonActive] = useState(null);
    const onLogout = () => {
        axiosClient
            .post("/logout")
            .then(() => {
                setToken(null);
                setCurrentUser({});
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <header className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-zinc-900 px-2.5 py-2">
            <div className="flex-1 flex items-center">
                <AvatarIcon
                    imgPath="https://store-images.s-microsoft.com/image/apps.37935.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.91f8693c-c75b-4050-a796-63e1314d18c9?h=210"
                    size="large"
                />
                <div className="w-72 ml-2">
                    <Input leftIcon={faSearch} placeholder="Search" />
                </div>
            </div>
            <div className="flex-1 justify-center flex">
                <TippyComponent content="Home" placement="bottom">
                    <Button
                        iconClass={faHome}
                        type="square"
                        size="large"
                        isActived={true}
                    />
                </TippyComponent>
                <TippyComponent content="Video" placement="bottom">
                    <Button iconClass={faVideo} type="square" size="large" />
                </TippyComponent>
                <TippyComponent content="Group" placement="bottom">
                    <Button
                        iconClass={faUserGroup}
                        type="square"
                        size="large"
                    />
                </TippyComponent>

                <TippyComponent content="Game" placement="bottom">
                    <Button iconClass={faGamepad} type="square" size="large" />
                </TippyComponent>
            </div>
            <div className="flex-1 justify-end flex">
                <TippyComponent content="Menu" placement="bottom">
                    <Button
                        iconClass={faBars}
                        size="large"
                        moreClass={["mr-2"]}
                        bgColor="gray"
                        onClick={() => {
                            setButtonActive((prev) =>
                                prev === "Menu" ? null : "Menu"
                            );
                        }}
                        isActived={"Menu" === buttonActive}
                    />
                </TippyComponent>
                <TippyComponent content="Message" placement="bottom">
                    <Button
                        iconClass={faMessage}
                        moreClass={["mr-2"]}
                        bgColor="gray"
                        size="large"
                        onClick={() => {
                            setButtonActive((prev) =>
                                prev === "Message" ? null : "Message"
                            );
                        }}
                        isActived={"Message" === buttonActive}
                    />
                </TippyComponent>
                <TippyComponent content="Notify" placement="bottom">
                    <Button
                        iconClass={faBell}
                        moreClass={["mr-2"]}
                        bgColor="gray"
                        size="large"
                        onClick={() => {
                            setButtonActive((prev) =>
                                prev === "Notify" ? null : "Notify"
                            );
                        }}
                        isActived={"Notify" === buttonActive}
                    />
                </TippyComponent>
                <TippyComponent content="Account" placement="bottom">
                    <Button
                        imgPath={currentUser.avt_img}
                        size="large"
                        onClick={() => {
                            setButtonActive("account");
                        }}
                    />
                </TippyComponent>
            </div>
            {buttonActive !== null && (
                <Overlay
                    positionClassName="absolute top-0 right-4"
                    type="overlay"
                    onClick={() => {
                        setButtonActive(null);
                    }}
                >
                    {buttonActive === "Menu" && <Menu />}
                    {buttonActive === "Message" && (
                        <Message setButtonActive={setButtonActive} />
                    )}
                    {buttonActive === "Notify" && <Notify />}
                </Overlay>
            )}
        </header>
    );
}
