import classNames from "classnames";
import Button from "./Button";

export default function Input({
    leftIcon = null,
    rightIcon = null,
    placeholder = null,
    data,
    setData,
}) {
    const className = classNames(
        "flex items-center bg-zinc-800 pr-2 rounded-full",
        {
            "pl-2 py-1": leftIcon,
            "pl-4 py-2": rightIcon,
        }
    );

    return (
        <div className={className}>
            {leftIcon && <Button iconClass={leftIcon} />}
            <input
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="flex-1 bg-transparent outline-none"
                placeholder={placeholder}
            />
            {rightIcon && <Button iconClass={rightIcon} size="small" />}
        </div>
    );
}
