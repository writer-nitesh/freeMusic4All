import { Logo } from "./logo";
import Navbar from "./navbar";

export function Header() {
    return (
        <header className="flex justify-between items-center px-4 rounded-b-xl glass_white">
            <Logo />
            <Navbar />
        </header>
    )
}
