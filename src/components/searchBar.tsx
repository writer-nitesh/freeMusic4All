import { useState } from "react";
import { HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();
    return (

        <div className="flex w-full bg-white z-10 items-center justify-center h-10  rounded-md  gap-2 p-0.5 px-2 ">
            <input
                type="text"
                placeholder="Search songs, albums, artists, podcasts"
                className="bg-transparent outline-none w-full h-10 text-black text-xs border-none"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        navigate(`/search?query=${search}`);
                    }
                }}
            />

            {
                search && <button type="button" aria-label="clear" onClick={() => setSearch("")}>
                    <HiX className="text-lg text-black hover:text-primary" />
                </button>
            }

        </div>



    )
}
