import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export default function Icon({ iconClass, size = "default" }) {
    const className = classNames({
        "w-6 h-6": size == "large", // For size large
        "w-5 h-5": size == "default", // If size default is provided, then apply these classes
        "w-4 h-4": size == "small", // For size small
    });
    return <FontAwesomeIcon className={className} icon={iconClass} />;
}
