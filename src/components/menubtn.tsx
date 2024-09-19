import Dropdown from "./ui/dropdown";


const ActionButton = () => {
    return (
        <button className="bg-primary text-white p-2  hover:bg-red-400 ">Image</button>
    )
}

const DropdownItem = () => {
    return (
        <div className="flex items-center gap-2 p-2 flex-col  w-fit bg-yellow-300 ">
            <p>5465</p>
            <p>54655465</p>
            <p>54655465564655456</p>
            <p>54655465564655456654654</p>
        </div>
    )
}



export default function Menu() {
    return (
        <Dropdown
            actionButton={<ActionButton />}
            dropDownItems={<DropdownItem />}
            gap={4}
            h="right"
            v="bottom"
        />
    )
}
