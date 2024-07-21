import { DefaultContext } from "../../layouts/DefaultLayout";
import AvatarIcon from "./AvatarIcon";
import Button from "./Button";

export default function ListUser({
    users,
    type = "list",
    onClickSeeAll = null,
}) {
    const { friends } = DefaultContext();
    return (
        <div>
            {type === "box" && (
                <div className="bg-zinc-900 my-2 rounded-md py-2 px-4">
                    <h1 className="text-2xl">Users</h1>
                    <ul>
                        {users.map((user) => (
                            <li
                                key={user.id}
                                className="flex items-center my-2"
                            >
                                <div className="flex flex-1">
                                    <AvatarIcon
                                        imgPath={user.avatar}
                                        size="x-max"
                                    />
                                    <div className="ml-4">
                                        <p className="text-lg">{user.name}</p>
                                        <p className="text-slate-500">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                {friends.some(
                                    (friend) => friend.id === user.id
                                ) ? (
                                    <p>Friend</p>
                                ) : (
                                    <p>No friend</p>
                                )}
                            </li>
                        ))}
                        <Button
                            text="See all"
                            bgColor="gray"
                            moreClass={["justify-center"]}
                            onClick={onClickSeeAll}
                        />
                    </ul>
                </div>
            )}
            {type === "list" && (
                <ul className="mt-2">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="flex items-center bg-zinc-900 mb-4 rounded-md py-2 px-4"
                        >
                            <div className="flex flex-1">
                                <AvatarIcon
                                    imgPath={user.avatar}
                                    size="x-max"
                                />
                                <div className="ml-4">
                                    <p className="text-lg">{user.name}</p>
                                    <p className="text-slate-500">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            {friends.some((friend) => friend.id === user.id) ? (
                                <p>Friend</p>
                            ) : (
                                <p>No friend</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}