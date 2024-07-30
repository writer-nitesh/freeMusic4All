import { Card, Error, Loader } from "../index"
import { useFetch } from "../../utils/useFetch"

export function Party() {
    const { data, loading, error } = useFetch("https://saavn.dev/api/search/playlists?query=party")

    return (
        <div className="flex flex-col gap-4">
            {loading && <Loader />}
            {
                data &&
                <>
                    <h1 className="text-2xl font-bold ">Party Playlist</h1>

                    <div className="lg:grid grid-cols-2 flex flex-col gap-2" >
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
