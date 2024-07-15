import AvatarIcon from "./AvatarIcon";
import Icon from "./Icon";
import classNames from "classnames";

export default function Button({
    text = null,
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
            "w-10 h-10 justify-center rounded-full": !text, // For icon only
            "justify-center": text && iconClass,
        },
        {
            "w-8 h-8": size === "default",
            "w-10 h-10": size === "large",
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

    return (
        <div className={className} onClick={!isDisabled && onClick}>
            {iconClass && <Icon iconClass={iconClass} size={size} />}
            {imgPath && <AvatarIcon imgPath={imgPath} size={size} />}
            {text && <div className="ml-2">{text}</div>}
        </div>
    );
}
