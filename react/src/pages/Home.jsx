import Button from "../layoutComponents/components/Button";
import Content from "../layoutComponents/Content";
import Sidebar from "../layoutComponents/Sidebar";
import { faEllipsis, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import axiosClient from "../axios-clients";
import { DefaultContext } from "../layouts/DefaultLayout";

export default function Home() {
    const { friends, setFriends, addChatting } = DefaultContext();
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
                    {friends && (
                        <Sidebar data={friends} setItemSelected={addChatting} />
                    )}
                </div>
            </nav>
        </div>
    );
}
