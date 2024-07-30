import { RefObject } from 'react'
import { create } from 'zustand'

type State = {
    audioPlayer: RefObject<HTMLAudioElement> | null
    setAudioPlayer: (player: RefObject<HTMLAudioElement>) => void
    currentMusicId: string
    setCurrentMusicId: (data: any) => void
    queue: Array<any>
    setQueue: (data: any) => void

}

export const useData = create<State>((set) => ({
    audioPlayer: null,
    setAudioPlayer: (player: RefObject<HTMLAudioElement>) => set((state) => ({ ...state, audioPlayer: player })),
    currentMusicId: "",
    setCurrentMusicId: (data: any) => set((state) => ({ ...state, musicId: data })),
    queue: [],
    setQueue: (data: any) => set((state) => ({ ...state, queue: data }))
}))