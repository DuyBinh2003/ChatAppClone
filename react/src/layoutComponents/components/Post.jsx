import { Link } from "react-router-dom";
import { AvatarIcon, Button, Icon, Input } from "~/layoutComponents/components";
import { useStateContext } from "../../contexts/ContextProvider";

import {
    faEllipsis,
    faXmark,
    faPaperPlane as fasPaperPlane,
    faComment as fasCommentSolid,
    faShare as fasShareSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
    faThumbsUp,
    faPaperPlane as farPaperPlane,
    faShareFromSquare,
    faComment as farComment,
} from "@fortawesome/free-regular-svg-icons";

export default function Post({ data }) {
    const { user, release, content, image, post_attributes, comments } = data;
    const { currentUser } = useStateContext();
    const findTopTwoType = (arr) => {
        let frequencyMap = {};

        arr.forEach((obj) => {
            if (obj.type) {
                if (frequencyMap[obj.type]) {
                    frequencyMap[obj.type]++;
                } else {
                    frequencyMap[obj.type] = 1;
                }
            }
        });

        let frequencyArray = Object.entries(frequencyMap);

        frequencyArray.sort((a, b) => b[1] - a[1]);

        let topTwoTypes = frequencyArray.slice(0, 2).map((item) => item[0]);

        return topTwoTypes;
    };
    return (
        <>
            {data && (
                <div className="bg-zinc-900 py-2.5 rounded-lg shadow-md mt-2">
                    <div className="flex items-center justify-between px-2.5">
                        <div className="flex items-center">
                            <Link to={`/profile?id=` + user.id}>
                                <AvatarIcon
                                    imgPath={user.avatar}
                                    size="large"
                                />
                            </Link>
                            <div className="ml-2">
                                <Link to={`/profile?id=` + user.id}>
                                    <h2 className="text-lg font-semibold hover:underline hover:underline-offset-1">
                                        {user.name}
                                    </h2>
                                </Link>
                                <p className="text-xs text-gray-500">
                                    {release}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Button
                                iconClass={faEllipsis}
                                moreClass={["mr-2"]}
                            />
                            <Button iconClass={faXmark} />
                        </div>
                    </div>
                    <p className="mt-2 text-md text-gray-200 px-2.5">
                        {content}
                    </p>
                    <img
                        className="mt-2 w-full h-auto"
                        src={image}
                        alt="Post"
                    />
                    <div className="p-2.5 flex items-center justify-between">
                        {post_attributes.filter((a) => a.type !== "share")
                            .length > 0 ? (
                            <div className="flex items-center">
                                {findTopTwoType(post_attributes).map(
                                    (type, key) => (
                                        <Button
                                            key={key}
                                            imgPath={`/assets/icon/${type}.png`}
                                            size="small"
                                        />
                                    )
                                )}
                                <p className="text-sm ml-2 cursor-pointer hover:underline hover:underline-offset-1">
                                    {
                                        post_attributes.filter(
                                            (a) => a.type !== "share"
                                        ).length
                                    }
                                </p>
                            </div>
                        ) : (
                            <div></div>
                        )}

                        <div className="flex items-center">
                            {comments.length > 0 && (
                                <>
                                    <p className="text-sm mr-2 cursor-pointer hover:underline hover:underline-offset-1">
                                        {comments.length}
                                    </p>
                                    <Button
                                        iconClass={fasCommentSolid}
                                        size="small"
                                    />
                                </>
                            )}
                            {post_attributes.filter((a) => a.type === "share")
                                .length > 0 && (
                                <>
                                    <p className="text-sm ml-4 mr-2 cursor-pointer hover:underline hover:underline-offset-1">
                                        {
                                            post_attributes.filter(
                                                (a) => a.type === "share"
                                            ).length
                                        }
                                    </p>
                                    <Icon
                                        iconClass={fasShareSolid}
                                        size="small"
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <div className="mt-2 flex justify-between py-1 mx-2.5 border-t border-slate-700">
                        <Button
                            text="Like"
                            iconClass={faThumbsUp}
                            moreClass={["justify-center"]}
                        />
                        <Button
                            text="Comment"
                            iconClass={farComment}
                            moreClass={["justify-center"]}
                        />
                        <Button
                            text="Send"
                            iconClass={farPaperPlane}
                            moreClass={["justify-center"]}
                        />
                        <Button
                            text="Share"
                            iconClass={faShareFromSquare}
                            moreClass={["justify-center"]}
                        />
                    </div>
                    {comments.length > 0 && (
                        <div className="flex mx-2.5 py-2 border-t border-slate-700">
                            <Button imgPath={comments[0].user.avatar} />
                            <div className="flex-1 ml-2 flex items-center">
                                <div>
                                    <div className="mr-2 bg-zinc-800 rounded-2xl px-3 py-1">
                                        <p className="text-base font-semibold">
                                            {comments[0].user.name}
                                        </p>
                                        <p className="text-base">
                                            {comments[0].content}
                                        </p>
                                    </div>
                                    <div className="flex item-centers px-3 mt-2">
                                        <p className="text-sm text-gray-300">
                                            2h
                                        </p>
                                        <p className="text-sm text-gray-300 ml-2 hover:underline hover:underline-offset-1">
                                            Like
                                        </p>
                                        <p className="text-sm text-gray-300 ml-2 hover:underline hover:underline-offset-1">
                                            Comment
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <Button iconClass={faEllipsis} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center mx-2 py-1">
                        <AvatarIcon imgPath={currentUser.avatar} />
                        <div className="flex-1 ml-2">
                            <Input
                                rightIcon={fasPaperPlane}
                                placeholder="Comment"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
