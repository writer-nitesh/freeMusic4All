import { useSearchParams } from "react-router-dom";
import { Card, Error, Loader, Title } from "../components"
import { useFetch } from "../utils"
import { HiPlay } from "react-icons/hi2";


export function Playlist() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id")
    const { data, loading, error } = useFetch(`https://api-fm4all.vercel.app/api/playlists?id=${id}&limit=40`)


    return (
        <div className="h-full flex flex-col py-1 w-full">

            {loading && <Loader />}
            {
                data &&
                <>
                    <div className="flex justify-between gap-2 items-center pr-2 w-full">
                        <Title title={data.data.name} />
                        <button
                            type="button"
                            title="Play All"
                            className="bg-primary hover:bg-pink-900 shadow-sm z-50 lg:size-10 size-8 rounded-full items-center justify-center flex "
                        >
                            <HiPlay size={20} />
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 overflow-y-auto h-full py-2" >
                        {
                            data.data.songs.map((song: any) => {
                                return <Card type="song" data={song} key={song.id} />
                            })
                        }
                    </div>
                </>
            }

            {error && <Error />}
        </div >
    )
}
