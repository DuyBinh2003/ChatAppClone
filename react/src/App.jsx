import { useEffect } from "react";
import { useStateContext } from "./contexts/ContextProvider";
import axiosClient from "./axios-clients";

function App({ children }) {
    const { setCurrentUser } = useStateContext();
    useEffect(() => {
        axiosClient
            .get("/user")
            .then((res) => {
                setCurrentUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return <>{children}</>;
}

export default App;
