import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout, GuestLayout } from "./layouts";
import {
    Home,
    Profile,
    Search,
    Login,
    Signup,
    NotFound,
    Friend,
} from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/search/:type",
                element: <Search />,
            },
            {
                path: "friends/:type",
                element: <Friend />,
            },
            {
                path: "/friends",
                element: <Friend />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
