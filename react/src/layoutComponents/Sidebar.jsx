import Button from "./components/Button";

export default function Sidebar({ data, setItemSelected }) {
    return (
        <ul className="flex flex-col items-center py-2">
            {data.map((item) => (
                <Button
                    text={item.name}
                    imgPath={item.avt_img}
                    key={item.id}
                    onClick={() => {
                        setItemSelected(item);
                    }}
                />
            ))}
        </ul>
    );
}
