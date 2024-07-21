import { Link } from "react-router-dom";
import { Button } from "~/layoutComponents/components";

export default function Sidebar({ data }) {
    return (
        <ul className="flex flex-col items-center py-2">
            {data.map((item) => (
                <li key={item.id} className="w-full">
                    <Link to={item.to}>
                        <Button
                            text={item.name}
                            imgPath={item.avatar}
                            iconClass={item.icon}
                            isActived={item.active}
                            onClick={item.onClick}
                            size="large"
                        />
                    </Link>
                </li>
            ))}
        </ul>
    );
}
