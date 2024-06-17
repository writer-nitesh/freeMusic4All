import { Card, Error, Loader } from "../components"
import { useFetch } from "../utils"

export function BaseView() {
    const { data, loading, error } = useFetch("https://saavn.dev/api/search/playlists?query=trending")

    return (
        <div className="h-full flex flex-col py-1">
            {loading && <Loader />}
            {
                data &&
                <>
                    <h1 className="text-2xl font-bold py-2">Trending Playlist</h1>

                    <div className="flex flex-col gap-2 overflow-y-auto h-[620px] py-2  " >
                        {
                            data.data.results.map((playlist: any) => {
                                return <Card key={playlist.id} type="playlist" data={playlist} />
                            })
                        }

                    </div>
                </>
            }

            {error && <Error />}
        </div >
    )
}
