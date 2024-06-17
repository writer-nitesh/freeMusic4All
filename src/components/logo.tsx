import { useNavigate } from "react-router-dom";

export function Logo() {
    const navigate = useNavigate();
    return (
        <button
            type="button"
            aria-label="home"
            className='logo text-primary lg:text-3xl md:text-2xl text-xl'
            onClick={() => navigate("/")}
        >
            freeMusic4all
        </button>
    )
}
