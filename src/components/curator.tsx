import { Card, Error, Loader } from "./index"
import { useSaavnAPI } from "../utils/saavan"

export function Curator({ type }: { type: string }) {
    const response = useSaavnAPI({ action: "search", option: "playlist", params: type })

    return (
        <div className="flex flex-col gap-4 w-full">
            {response.status === "loading" && <Loader />}
            {
                response.status === "success" &&
                <>
                    <h1 className="text-2xl font-bold capitalize">{type} Playlist</h1>

                    <div className="lg:grid grid-cols-4 flex flex-col gap-4 py-1 w-full" >
                        {
                            response.data.data.results.map((playlist: any) => {
                                return <Card key={playlist.id} type="playlist" data={playlist} />
                            })
                        }
                    </div>
                </>
            }
            {response.status === "error" && <Error />}
        </div >
    )
}
