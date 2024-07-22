import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    faEllipsis,
    faFaceSmile,
    faImages,
    faSmile,
    faVideo,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { Overlay } from "~/layoutComponents";
import { AvatarIcon, Button } from "~/layoutComponents/components";
import { useStateContext } from "~/contexts/ContextProvider";

export default function CreatePost() {
    const { currentUser } = useStateContext();
    const navigate = useNavigate();
    const [isCreatePost, setIsCreatePost] = useState(false);
    const [inputPost, setInputPost] = useState("");
    return (
        <>
            <div className="bg-zinc-900 py-2.5 px-2 rounded-lg shadow-md mt-2">
                <div className="flex items-center">
                    <Button
                        imgPath={currentUser.avatar}
                        size="large"
                        onClick={() => {
                            navigate(`/profile?id=${currentUser.id}`);
                        }}
                    />
                    <div className="ml-2 flex-1">
                        <Button
                            bgColor="gray"
                            text={`What's on your mind, ${currentUser.name}?`}
                            onClick={() => {
                                setIsCreatePost(true);
                            }}
                        />
                    </div>
                </div>
                <div className="mt-2 flex justify-between py-1 border-t border-slate-700">
                    <Button
                        text="Live Video"
                        iconClass={faVideo}
                        moreClass={["justify-center"]}
                    />
                    <Button
                        text="Photo/Video"
                        iconClass={faImages}
                        moreClass={["justify-center"]}
                    />
                    <Button
                        text="Feeling/Activity"
                        iconClass={faFaceSmile}
                        moreClass={["justify-center"]}
                    />
                </div>
            </div>
            {isCreatePost && (
                <Overlay
                    type="overlay"
                    bgColor="black"
                    onClick={() => {
                        setIsCreatePost(false);
                    }}
                >
                    <div className="absolute w-full h-full flex items-center justify-center">
                        <div className="relative width-notice h-fit bg-zinc-900 py-2.5 px-4 rounded-lg shadow-md">
                            <h3 className="flex-1 text-center text-xl leading-10 border-b-slate-500">
                                Create Post
                            </h3>
                            <div className="absolute right-4 top-2.5">
                                <Button
                                    iconClass={faXmark}
                                    size="large"
                                    onClick={() => {
                                        setIsCreatePost(false);
                                    }}
                                />
                            </div>
                            <div className="flex items-center">
                                <AvatarIcon imgPath={currentUser.avatar} />
                                <span className="ml-2">{currentUser.name}</span>
                            </div>
                            <textarea
                                value={inputPost}
                                onChange={(e) => setInputPost(e.target.value)}
                                className="w-full h-32 mt-2 p-2 rounded-lg bg-transparent outline-none text-white"
                                placeholder={`What's on your mind, ${currentUser.name}?`}
                            />
                            <div className="flex items-center justify-between p-2 my-2 rounded-md border-2 border-slate-600">
                                <p className="text-md">Add for posts</p>
                                <div className="flex">
                                    <Button
                                        iconClass={faImages}
                                        moreClass={["mr-2"]}
                                    />
                                    <Button
                                        iconClass={faSmile}
                                        moreClass={["mr-2"]}
                                    />
                                    <Button iconClass={faEllipsis} />
                                </div>
                            </div>
                            <Button
                                text="Post"
                                moreClass={["justify-center"]}
                                isDisabled={inputPost === ""}
                                bgColor="blue"
                                onClick={() => {
                                    alert(inputPost);
                                }}
                            />
                        </div>
                    </div>
                </Overlay>
            )}
        </>
    );
}
