import { useEffect } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const usePusher = (channelName, eventName, callback) => {
    window.Pusher = Pusher;

    const echo = new Echo({
        broadcaster: "pusher",
        key: `${import.meta.env.VITE_PUSHER_APP_KEY}`,
        cluster: `${import.meta.env.VITE_PUSHER_APP_CLUSTER}`,
        encrypted: true,
        authEndpoint: "http://localhost:8000/broadcasting/auth", // URL Laravel backend
        auth: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`, // Thêm tiêu đề xác thực nếu cần
            },
        },
    });

    useEffect(() => {
        echo.private(channelName).listen(eventName, (data) => {
            callback(data);
        });
        return () => {
            echo.leave(channelName);
        };
    }, []);

    return echo;
};

export default usePusher;
