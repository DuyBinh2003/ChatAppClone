import { Sidebar } from "~/layoutComponents";

export default function SidebarLayout({ children, sidebar, title }) {
    return (
        <div className="flex justify-between margin-left-width-notice">
            <div className="fixed top-14 left-0 bottom-0 width-notice px-2 bg-zinc-900">
                <h1 className="text-2xl">{title}</h1>
                <hr className="my-2" />
                <div className="h-full scrollbar-webkit overflow-y-scroll scroll-track-gray">
                    <Sidebar data={sidebar} />
                </div>
            </div>
            <div className="mx-auto w-1/2 mt-4">{children}</div>
        </div>
    );
}
