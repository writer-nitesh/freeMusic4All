import { RefObject } from 'react'
import { create } from 'zustand'
import { PlayerProperties } from '../components/audioPlayer/types'

interface Quality {
    stream: "12kbps" | "40kbps" | "96kbps" | "160kbps" | "320kbs"
    download: "12kbps" | "40kbps" | "96kbps" | "160kbps" | "320kbs"
    image: "50x50" | "150x150" | "500x500"
}

type State = {
    audioPlayer: RefObject<HTMLAudioElement> | null
    setAudioPlayer: (player: RefObject<HTMLAudioElement>) => void
    currentMusic: PlayerProperties
    setCurrentMusic: (data: PlayerProperties) => void
    queue: Array<any>
    setQueue: (data: any) => void
    quality: Quality
    setQuality: (data: Quality) => void
}

export const useData = create<State>((set) => ({
    audioPlayer: null,
    setAudioPlayer: (player: RefObject<HTMLAudioElement>) => set((state) => ({ ...state, audioPlayer: player })),
    currentMusic: {
        startTime: 0,
        currentTime: 0,
        duration: 0,
        isFullScreen: false,
        isAudioPlaying: true,
        volume: 1,
        musicId: "",
        playerData: undefined
    },
    setCurrentMusic: (data: PlayerProperties) => set((state) => ({ ...state, currentMusic: data })),
    queue: [],
    setQueue: (data: any) => set((state) => ({ ...state, queue: data })),
    quality: {
        stream: "96kbps",
        download: "320kbs",
        image: "50x50"
    },
    setQuality: (data: Quality) => set((state) => ({ ...state, quality: data }))

}))