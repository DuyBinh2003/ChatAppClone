import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import axiosClient from "../../../axios-clients";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function Account() {
    const { currentUser, setCurrentUser, setToken } = useStateContext();

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
        <div className="width-notice px-2 py-4 rounded-b-lg bg-zinc-900">
            <Button text={currentUser.name} imgPath={currentUser.avt_img} />
            <Button text="Logout" iconClass={faDoorOpen} onClick={onLogout} />
        </div>
    );
}
