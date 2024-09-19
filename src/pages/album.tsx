import { useSearchParams } from "react-router-dom";
import { Card, Error, Loader, Title } from "../components"
import { useFetch } from "../utils"

export function Album() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id")
    const { data, loading, error } = useFetch(`https://api-fm4all.vercel.app/api/albums?id=${id}&limit=40`)
    console.log(data);


    return (
        <div className="h-full flex flex-col py-1">
            {loading && <Loader />}
            {
                data &&
                <>
                    <Title title={data.data.name} />
                    <div className="flex flex-col gap-2 overflow-y-auto h-[620px] py-2" >
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
