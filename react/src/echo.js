import Echo from "laravel-echo";
import Pusher from "pusher-js"; // hoặc import 'laravel-echo/dist/log-adapter';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    encrypted: true,
});

export default echo;
