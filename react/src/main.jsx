import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./output.css";
import "tippy.js/dist/tippy.css";

import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ContextProvider } from "./contexts/ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ContextProvider>
        <App>
            <RouterProvider router={router} />
        </App>
    </ContextProvider>
);
