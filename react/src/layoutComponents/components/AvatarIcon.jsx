import classNames from "classnames";

export default function AvatarIcon({ imgPath, size = "default" }) {
    const className = classNames("rounded-full object-cover", {
        "w-8 h-8": size == "default", // If size small is provided, then apply these classes
        "w-10 h-10": size == "large", // For size large
        "w-4 h-4": size == "small", // For size small
        "w-44 h-44": size == "max", // For size max
    });
    return (
        <div>
            <img src={imgPath} alt="Avatar" className={className} />
        </div>
    );
}
