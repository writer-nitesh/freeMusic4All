import { Logo } from "./logo";
import Navbar from "./navbar";

export function Header() {
    return (
        <header className="flex justify-between  items-center">
            <Logo />
            <Navbar />
        </header>
    )
}
