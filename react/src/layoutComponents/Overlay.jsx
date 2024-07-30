import classNames from "classnames";

export default function Overlay({
    children,
    onClick = null,
    type = "fixed",
    bgColor = "transparent",
}) {
    const handleOnclick = (e) => {
        if (e.target.closest("#children")) {
            return;
        }
        onClick();
    };
    const className = classNames(
        "z-50",
        {
            "fixed top-0 left-0 w-full h-full":
                type === "overlay" || type === "overlay-header",
            "top-14": type === "overlay-header",
        },
        {
            "bg-black bg-opacity-50": bgColor === "black",
            "bg-transparent": bgColor === "transparent",
        }
    );
    return (
        <div className={className} onClick={handleOnclick}>
            {children}
        </div>
    );
}
