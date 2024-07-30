import { HiHome, HiMagnifyingGlass, HiMiniQueueList } from "react-icons/hi2";
import { Link } from "react-router-dom";


export default function Navbar() {
    return (
        <nav className="flex justify-center items-center">
            <ul className="flex justify-end items-center gap-4 w-full text-white text-lg">
                <li><Link title="Home" to="/"><HiHome className="lg:text-2xl text-base hover:text-primary" /></Link></li>
                <li><Link title="Search" to="/search"><HiMagnifyingGlass className="lg:text-xl text-base hover:text-primary" /></Link></li>
                <li><Link title="Queue" to="/search"><HiMiniQueueList className="lg:text-xl text-base hover:text-primary" /></Link></li>
            </ul>
        </nav>
    )
}
