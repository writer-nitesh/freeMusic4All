import { useSearchParams } from "react-router-dom";
import { FetchRequest } from "../utils";
import { Card, Error, Loader, SearchBar, Title } from "../components";
import { useEffect, useState } from "react";

const defaultQueryResult: FetchRequest = {
    data: null,
    error: false,
    loading: false
};

export function Search() {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState<string | null>(null);
    const [queryResult, setQueryResult] = useState<FetchRequest>(defaultQueryResult);

    const { data, error, loading } = queryResult;

    useEffect(() => {
        const searchResults = async () => {
            setQueryResult({ ...queryResult, error: false, loading: true });
            try {
                const response = await fetch(`https://api-fm4all.vercel.app/api/search?query=${query}`);
                const json: any = await response.json();
                setQueryResult({ data: json.data, error: false, loading: false });
            } catch (error) {
                setQueryResult({ ...queryResult, error: true, loading: false });
            }
        };

        if (query !== null) {
            searchResults();
        }
    }, [query]);



    useEffect(() => {
        const newQuery = searchParams.get("query");
        setQuery(newQuery);
    }, [searchParams]);


    return (
        <div className="flex flex-col gap-2 w-full h-full">
            <SearchBar />
            <div>

                {

                    query !== null && <>
                        {loading && <Loader />}
                        {data && (
                            <>
                                <Title isBackBtn={false} title={`Search Result for "${query}"`} />
                                <div className="flex flex-col gap-2 overflow-y-auto h-[580px] py-2">
                                    {data.songs?.results?.length > 0 ? (
                                        data.songs.results.map((song: any) => (
                                            <Card type="song" data={song} key={song.id} />
                                        ))
                                    ) : (
                                        <p>No song results found</p>
                                    )}
                                    {data.playlists?.results?.length > 0 ? (
                                        data.playlists.results.map((playlist: any) => (
                                            <Card type="playlist" data={playlist} key={playlist.id} />
                                        ))
                                    ) : (
                                        <p>No playlist results found</p>
                                    )}
                                    {data.albums?.results?.length > 0 ? (
                                        data.albums.results.map((album: any) => (
                                            <Card type="album" data={album} key={album.id} />
                                        ))
                                    ) : (
                                        <p>No album results found</p>
                                    )}
                                    {data.songs?.results?.length === 0 &&
                                        data.playlists?.results?.length === 0 &&
                                        data.albums?.results?.length === 0 && (
                                            <p>No results found</p>
                                        )}
                                </div>
                            </>
                        )}
                        {error && <Error />}
                    </>
                }
            </div>
        </div>
    );
}
