import { MdHome, MdOutlineQueueMusic, MdSearch, MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex justify-center items-center py-4">
            <ul className="flex justify-end items-center lg:gap-4 gap-2 w-full text-white text-lg">
                <li>
                    <Link title="Home" to="/">
                        <MdHome className="lg:text-2xl text-lg hover:text-primary" />
                    </Link>
                </li>
                <li>
                    <Link title="Search" to="/search">
                        <MdSearch className="lg:text-2xl text-lg hover:text-primary" />
                    </Link>
                </li>
                <li>
                    <Link title="Queue" to="/search">
                        <MdOutlineQueueMusic className="lg:text-2xl text-lg hover:text-primary" />
                    </Link>
                </li>
                <li>
                    <Link title="Settings" to="/settings">
                        <MdSettings className="lg:text-2xl text-lg hover:text-primary" />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
