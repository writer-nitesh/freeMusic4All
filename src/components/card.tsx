import { Link } from "react-router-dom"
import { Image, ImageSize } from "./image"
import { useData } from "../data/store"
import { decodeHtmlEntities, getArtist } from "../utils"

export function Card({ type, data }: { type: "song" | "playlist" | "album" | "artist", data: any }) {

    const { setCurrentMusic, quality, currentMusic } = useData((state) => state)

    function handleSong() {
        setCurrentMusic({ ...currentMusic, musicId: data.id })
    }

    if (type === "playlist") {
        return (
            <Link to={`/playlist?id=${data.id}`} className="flex items-center gap-3 hover:bg-[#d1d1d13b] rounded-md">
                <Image images={data.image} size={ImageSize[quality.image]} alt={data.title} />
                <div className="flex flex-col">
                    <div className="text-sm">{data.title ? decodeHtmlEntities(data.title) : decodeHtmlEntities(data.name)}</div>
                    <div className="flex text-xs text-gray-400 gap-1 capitalize">{data.type}</div>
                </div>

            </Link>
        )
    }

    if (type === "song") {
        return (
            <div onClick={handleSong} className="flex items-center gap-3 cursor-pointer hover:bg-[#d1d1d13b] rounded-md" >
                <Image images={data.image} size={ImageSize[quality.image]} alt={data.title} />
                <div className="flex flex-col">
                    <div>
                        <div className="text-sm">{data.title ? decodeHtmlEntities(data.title) : decodeHtmlEntities(data.name)}</div>
                    </div>
                    <div className="flex text-xs text-gray-400 gap-1 capitalize">
                        <div>{data.artists ? getArtist(data.artists) : data.primaryArtists}</div>
                    </div>
                </div>
            </div>
        )
    }

    // if (type === "artist") {
    //     return (
    //         <Link to={`/artist/${data.id}`} className="flex items-center gap-2">
    //             <Image images={data.image} size={ImageSize.SMALL} alt={data.title} />
    //             <div className="flex flex-col">
    //                 <div className="text-sm">{data.title ? decodeHtmlEntities(data.title) : decodeHtmlEntities(data.name)}</div>
    //                 <div className="flex text-xs text-gray-400 gap-1 capitalize">{data.type}</div>
    //             </div>
    //         </Link>
    //     )
    // }

    if (type === "album") {
        return (
            <Link to={`/album?id=${data.id}`} className="flex items-center gap-3 hover:bg-[#d1d1d13b] rounded-md">
                <Image images={data.image} size={ImageSize[quality.image]} alt={data.title} />
                <div className="flex flex-col">
                    <div className="text-sm">{data.title ? decodeHtmlEntities(data.title) : decodeHtmlEntities(data.name)}</div>
                    <div className="flex text-xs text-gray-400 gap-1 capitalize">{data.type}</div>
                </div>
            </Link>
        )
    }

}
