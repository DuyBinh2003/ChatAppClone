import Tippy from "@tippyjs/react";

export default function TippyComponent({ children, content, placement }) {
    return (
        <Tippy
            content={content}
            allowHTML={true}
            duration={[500, 0]}
            placement={placement}
        >
            <div>{children}</div>
        </Tippy>
    );
}
