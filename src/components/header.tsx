import { Logo } from "./logo";
import { SearchBar } from "./searchBar";

export function Header() {
    return (
        <header className="flex justify-between h-16 py-4 items-center">
            <Logo />
            <nav className="flex justify-center w-1/2  items-center">
                <ul className="flex justify-end items-center gap-4 w-full text-white text-lg">
                    <li>
                        <SearchBar />
                    </li>
                </ul>
            </nav>
        </header>
    )
}
