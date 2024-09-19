import { Outlet, useLocation } from "react-router-dom";
import { Header, PlayerStatus } from "../components";
import { useData } from "../data/store";

export function Layout() {
    const { pathname } = useLocation();

    const { currentMusic } = useData((state) => state)

    return (
        <main className="text-white flex flex-col">
            <div className="bg-primary rounded-full blur-[300px] translate-x-[10%] translate-y-[-100%] absolute h-[80%] w-[80%]"></div>
            <div className="flex-shrink flex-col sticky top-0 z-50">
                <Header />
            </div>
            <div className="flex flex-col  w-full items-center px-4 py-4 z-40 min-h-[82.7vh]">
                <div className="flex w-full  flex-grow overflow-y-auto ">
                    <Outlet />
                </div>

            </div>

            {currentMusic.musicId && <div className={`z-50 glass_black sticky w-full left-0 bottom-0 h-16 p-1 ${pathname === "/listern" && "hidden"}`}>
                <PlayerStatus />
            </div>}


        </main>
    );
}