import { Link } from "react-router-dom";
import Button from "./components/Button";

export default function Sidebar({ data }) {
    return (
        <ul className="flex flex-col items-center py-2">
            {data.map((item) => (
                <Link key={item.id} className="w-full" to={item.to}>
                    <Button
                        text={item.name}
                        imgPath={item.avatar}
                        key={item.id}
                        onCLinkck={item.onClick}
                    />
                </Link>
            ))}
        </ul>
    );
}
