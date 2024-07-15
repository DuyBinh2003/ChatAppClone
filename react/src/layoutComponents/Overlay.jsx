export default function Overlay({ children, positionClassName }) {
    return (
        <div className="z-50">
            <div className={positionClassName}>{children}</div>
        </div>
    );
}
