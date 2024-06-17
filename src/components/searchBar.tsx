import { useState } from "react";
import { HiSearch, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
    const [search, setSearch] = useState<string>("");
    const [wantSearch, setWantSearch] = useState<boolean>(false);

    const navigate = useNavigate();

    return (
        <div className="flex w-full h-8 justify-end items-center gap-2">

            {
                wantSearch &&
                <div className="flex w-72 glass items-center justify-center h-full  rounded-md   gap-2 p-0.5 px-2">
                    <input
                        type="text"
                        placeholder="Search songs, albums, artists, podcasts"
                        className="bg-transparent outline-none w-full text-white text-xs border-none"
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
                            <HiX className="text-xs text-white hover:text-primary" />
                        </button>
                    }

                </div>
            }
            <div className="flex justify-center h-full w-8 items-center">
                <HiSearch onClick={() => setWantSearch(!wantSearch)} className="text-2xl hover:text-primary" />
            </div>



        </div >
    )
}
