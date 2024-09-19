import { Link } from "react-router-dom";

export function Logo() {
    return (
        <Link
            to="/"
            aria-label="home"
            className='logo text-primary lg:text-2xl md:text-2xl text-2xl outline-none'
        >
            freeMusic4all
        </Link>
    )
}
