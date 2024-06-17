import { useSearchParams } from "react-router-dom";
import { useFetch } from "../utils";
import { Card, Error, Loader, Title } from "../components";


export function Search() {
    const [searchParams] = useSearchParams();

    const { data, loading, error } = useFetch(`https://saavn.dev/api/search?query=${searchParams.get("query")}`)

    console.log(data);
    


    return (
        <div>

            {loading && <Loader />}
            {

                data &&
                <>
                    {/* <h1 className="text-lg gap-4 font-bold py-4">"</h1> */}
                    <Title title={`Search Result for "${searchParams.get("query")}" `} />
                    <div className="flex flex-col gap-2 overflow-y-auto h-[580px] py-2 " >
                        {
                            data.data.songs.results.map((song: any) => {
                                return <Card type="song" data={song} key={song.id} />
                            })
                        }
                        {
                            data.data.playlists.results.map((playlist: any) => {
                                return <Card type="playlist" data={playlist} key={playlist.id} />
                            })
                        }
                        {
                            data.data.albums.results.map((album: any) => {
                                return <Card type="album" data={album} key={album.id} />
                            })
                        }

                    </div>
                </>
            }
            {error && <Error />}
        </div>
    )
}
