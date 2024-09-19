// API Response Types

type ResponseSuccess = {
    data: any;
    status: "success";
}

type ResponseError = {
    message: string;
    status: "error";
}

type ResponseLoading = {
    status: "loading";
}

type ResponseDefault = {
    status: "idle";
}

export type SaavanAPIResponse = ResponseSuccess | ResponseError | ResponseLoading | ResponseDefault;
// Function Props Types


type search = "global" | "songs" | "albums" | "artists" | "playlist"
type songs = "id"
type album = "id"
type artists = "id"
type playlist = "id"
type other = {
    action: "lyrics" | "song_suggestions" | "artists_songs" | "artist_albums",
    id: string
}

export type SaavanProps<ActionType = keyof URLS
> = {
    action: ActionType
    option: ActionType extends "search" ? search :
    ActionType extends "songs" ? songs :
    ActionType extends "album" ? album :
    ActionType extends "artists" ? artists :
    ActionType extends "playlist" ? playlist :
    ActionType extends "other" ? other : never
    params: string
}


// URLS Types

export type URLS = {
    search: {
        global: string;
        songs: string;
        albums: string;
        artists: string;
        playlist: string;
    };
    songs: {
        id_links: string;
        id: string;
    };
    album: {
        id_links: string;
    };
    artists: {
        id_links: string;
        id: string;
    };
    playlist: {
        id_links: string;
    };
    other: {
        lyrics: string,
        song_suggestions: string
        artists_songs: string
        artist_albums: string
    }
};