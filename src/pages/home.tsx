import { Outlet } from "react-router-dom";
import { Header, Player } from "../components";
import { useData } from "../data/store";

export function Home() {
    const { currentMusicId } = useData((state) => state)
    return (
        <main>
            <div className="bg-primary rounded-full blur-[300px] translate-x-[10%] translate-y-[-100%]  absolute h-[80%] w-[80%]">
            </div>

            {/* <Audio  /> */}

            <div className="container text-white">
                <div className="header">
                    <Header />
                </div>
                <div className="main">
                    <Outlet />
                </div>
                <div className="sidebar bg-white">
                    <Player />
                </div>
                {currentMusicId && <div className="footer">Player</div>}
            </div>


        </main>
    )

}
