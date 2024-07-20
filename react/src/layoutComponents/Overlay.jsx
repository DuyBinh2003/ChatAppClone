import classNames from "classnames";

export default function Overlay({ children, onClick = null, type = "fixed" }) {
    const handleOnclick = (e) => {
        if (e.target.closest(".absolute")) {
            return;
        }
        onClick();
    };
    const className = classNames("z-50", {
        "fixed top-14 left-0 w-full h-full": type === "overlay",
    });
    return (
        <div className={className} onClick={handleOnclick}>
            {children}
        </div>
    );
}
