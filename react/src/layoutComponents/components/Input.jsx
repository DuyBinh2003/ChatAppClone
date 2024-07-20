import classNames from "classnames";
import Button from "./Button";

export default function Input({
    leftIcon = null,
    rightIcon = null,
    placeholder = null,
    data,
    handleChange,
    isFocused,
    setIsFocused,
    onKeyDown,
}) {
    const className = classNames(
        "h-full w-full flex items-center bg-zinc-800 pr-2 rounded-full",
        {
            "pl-2 py-1": leftIcon,
            "pl-4 py-2": rightIcon,
        }
    );

    return (
        <div className={className}>
            {leftIcon && !isFocused && <Button iconClass={leftIcon} />}
            <input
                value={data}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 ml-2 bg-transparent outline-none"
                placeholder={placeholder}
                onKeyDown={onKeyDown}
            />
            {rightIcon && <Button iconClass={rightIcon} size="small" />}
        </div>
    );
}
