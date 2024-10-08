import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import { Button } from "~/layoutComponents/components";
import { useStateContext } from "~/contexts/ContextProvider";

export default function Notify({ setButtonActive }) {
    const { currentUser } = useStateContext();
    return (
        <div className="width-notice px-2 py-4 rounded-b-lg bg-zinc-900">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl pl-2">Notify</h1>
                <div className="flex items-center">
                    <Button iconClass={faEllipsis} moreClass={["mr-2"]} />
                </div>
            </div>
            <ul className="mt-2"></ul>
        </div>
    );
}
