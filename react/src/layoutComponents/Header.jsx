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
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import TippyComponent from "./components/TippyComponent";
import Input from "./components/Input";
import Menu from "./components/noticeComponents/Menu";
import Message from "./components/noticeComponents/Message";
import Notify from "./components/noticeComponents/Notify";
import Account from "./components/noticeComponents/Account";
import { Link } from "react-router-dom";

export default function Header() {
    const { currentUser } = useStateContext();
    const [buttonActive, setButtonActive] = useState(null);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <header className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-zinc-900 px-2.5 py-2">
            <div className="h-fit flex-1 flex items-center">
                {isFocused ? (
                    <Button iconClass={faArrowLeft} size="large" />
                ) : (
                    <Link to="/">
                        <AvatarIcon
                            imgPath="https://store-images.s-microsoft.com/image/apps.37935.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.91f8693c-c75b-4050-a796-63e1314d18c9?h=210"
                            size="large"
                        />
                    </Link>
                )}
                <div className="h-10 w-72 ml-2">
                    <Input
                        leftIcon={faSearch}
                        placeholder="Search"
                        isFocused={isFocused}
                        setIsFocused={setIsFocused}
                    />
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
                        imgPath={currentUser.avatar}
                        size="large"
                        onClick={() => {
                            setButtonActive((prev) =>
                                prev === "Account" ? null : "Account"
                            );
                        }}
                    />
                </TippyComponent>
            </div>
            {buttonActive !== null && (
                <div className="fixed top-14 right-4">
                    {buttonActive === "Menu" && <Menu />}
                    {buttonActive === "Message" && (
                        <Message setButtonActive={setButtonActive} />
                    )}
                    {buttonActive === "Notify" && <Notify />}
                    {buttonActive === "Account" && <Account />}
                </div>
            )}
        </header>
    );
}
