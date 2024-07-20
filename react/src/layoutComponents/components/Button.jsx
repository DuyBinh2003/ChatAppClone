import AvatarIcon from "./AvatarIcon";
import Icon from "./Icon";
import classNames from "classnames";

export default function Button({
    text = null,
    subText = null,
    iconClass = null,
    imgPath = null,
    type = "default",
    size = "default",
    bgColor = "default",
    isActived = false,
    isDisabled = false,
    moreClass = [],
    onClick = () => {},
}) {
    const className = classNames(
        "flex items-center cursor-pointer",
        ...moreClass,
        {
            "h-fit w-full p-2 rounded-md ": text, // If text is provided, then apply these classes
            "justify-center rounded-full": !text, // For icon only
        },
        {
            "w-8 h-8": size === "default",
            "w-10 h-10": size === "large",
            "w-44 h-44": size === "max",
            "w-4 h-4": size === "small",
        },
        {
            "bg-zinc-800 hover:bg-zinc-700": bgColor === "gray",
            "hover:bg-zinc-800 bg-transparent": bgColor === "default",
            "text-blue-500": isActived,
            "text-slate-200": !isActived,
        },
        {
            "w-24 rounded-md": type === "square",
        }
    );
    const textClassName = classNames("ml-2", {
        "flex-1": subText,
    });

    return (
        <div className={className} onClick={!isDisabled && onClick}>
            {iconClass && <Icon iconClass={iconClass} size={size} />}
            {imgPath && <AvatarIcon imgPath={imgPath} size={size} />}
            {text && (
                <div className={textClassName}>
                    <h3>{text}</h3>
                    <p className="text-sm text-gray-400">{subText}</p>
                </div>
            )}
        </div>
    );
}
