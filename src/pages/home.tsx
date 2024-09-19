
import { Curator } from "../components";

export function Home() {

    return (
        <div className="flex flex-col gap-4 w-full"  >
            <Curator type="indie" />
            <Curator type="trending" />
            <Curator type="romantic" />
            <Curator type="party" />
        </div >
    )
}
