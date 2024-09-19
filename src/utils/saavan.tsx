import { useState, useEffect } from 'react';
import { SaavanProps, SaavanAPIResponse, URLS } from './saavan.types';

const baseUrl: string = "https://api-fm4all.vercel.app/api";


const urls: URLS = {
    search: {
        global: "/search",
        songs: "/search/songs",
        albums: "/search/albums",
        artists: "/search/artists",
        playlist: "/search/playlists"
    },
    songs: {
        id_links: "/songs",
        id: "/songs",
    },
    album: { id_links: "/albums" },
    artists: {
        id_links: "/artists",
        id: "/artists"
    },
    playlist: {
        id_links: "/playlists"
    },
    other: {
        lyrics: "/lyrics",
        song_suggestions: "/suggestions",
        artists_songs: "/songs",
        artist_albums: "/albums"
    }
};

export function useSaavnAPI({ action, option, params }: SaavanProps): SaavanAPIResponse {
    const [response, setResponse] = useState<SaavanAPIResponse>({ status: "idle" });


    const url = () => {
        const actionUrls = urls[action] as Record<string, string>;
        const opt: string = option as string;

        if (action === "other") {
            return `${baseUrl}/${params}/${actionUrls[opt]}`;
        }

        if (action === "artists" || action === "playlist") {
            return `${baseUrl}${actionUrls[opt]}?query=${params}`;
        }

        if (action === "search") {
            return `${baseUrl}${actionUrls[opt]}?query=${params}`;
        }
        return `${baseUrl}${actionUrls[opt]}?id=${params}`;
    };

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            setResponse({ status: "loading" });

            try {
                const res = await fetch(url()); // Call the URL function here
                const json = await res.json();
                setResponse({ status: "success", data: json });
            } catch (error: any) {
                setResponse({ status: "error", message: error.message });
            }
        };

        if (url()) {
            console.log(url());

            fetchData();
        }
    }, [action, option, params]);

    return response;
}
