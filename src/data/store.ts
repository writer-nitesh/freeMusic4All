import { create } from 'zustand'

type State = {
    musicId: string,
    setMusicId: (data: any) => void
}


export const usePlayer = create<State>((set) => ({
    musicId: "",
    setMusicId: (data: any) => set((state) => ({ ...state, musicId: data })),
}))