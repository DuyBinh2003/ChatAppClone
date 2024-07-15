import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Header from "../layoutComponents/Header";
export default function DefaultLayout() {
    const { token } = useStateContext();

    if (!token) return <Navigate to="/login" />;
    return (
        <div className="text-white">
            <Header />
            <div className="min-h-screen pt-14 bg-black">
                <Outlet />
            </div>
        </div>
    );
}
