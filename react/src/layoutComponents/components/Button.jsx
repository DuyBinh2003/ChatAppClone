import { Icon, AvatarIcon } from "~/layoutComponents/components";
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
        "flex items-center",
        ...moreClass,
        {
            "h-fit p-2 rounded-md": text && type !== "round", // If text is provided, then apply these classes
            "justify-center rounded-full": !text || type === "round", // For icon only
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
            "text-blue-500 bg-zinc-800": isActived,
            "text-slate-200": !isActived,
            "bg-blue-800 hover:bg-blue:700": bgColor === "blue",
            "bg-red-700": bgColor === "red",
        },
        {
            "w-full": type === "default" && text,
            "w-24 rounded-md": type === "square",
            "w-fit": type === "fit",
        },
        {
            "cursor-not-allowed bg-zinc-500 hover:bg-zinc-500": isDisabled,
            "cursor-pointer": !isDisabled,
        }
    );
    const textClassName = classNames({
        "flex-1": subText,
        "ml-2": type !== "fit" && type !== "round",
        "text-center text-xs": type === "round",
    });

    return (
        <div className={className} onClick={!isDisabled ? onClick : null}>
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
