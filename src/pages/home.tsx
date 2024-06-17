import { Outlet } from "react-router-dom";
import { Header, Player } from "../components";

export function Home() {
    return (
        <section className="text-white h-full flex flex-col px-4 ">
            <Header />
            <div className="flex h-full ">
                <div className="w-full">
                    <Outlet />
                </div>
                
                <div className="w-full h-full ">
                    <Player />
                </div>
            </div>

        </section>
    )
}
