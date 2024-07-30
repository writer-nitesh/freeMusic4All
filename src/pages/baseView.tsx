import { Romantic, Trending, Indie, Party } from "../components"


export function BaseView() {


    return (
        <div className="flex flex-col gap-4">
            <Indie />
            <Trending />
            <Romantic />
            <Party />
        </div >
    )
}
