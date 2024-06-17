import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react"
import { PlayerProperties } from "./types"
import { HiPlay, HiPause, HiChevronRight, HiChevronLeft, HiListBullet } from "react-icons/hi2";
import { usePlayer } from "../../data/store";
import { decodeHtmlEntities, downloadURL, formatTime, getArtist } from "../../utils";
import { MdFileDownload } from "react-icons/md";
import { Progress } from "./progress";



export function Player() {
    const player: RefObject<HTMLAudioElement> = useRef<HTMLAudioElement>(null)

    const [playerProperties, setPlayerProperties] = useState<PlayerProperties>({
        startTime: 0,
        currentTime: 0,
        duration: 0,
        isFullScreen: false,
        isAudioPlaying: true,
        volume: 1
    })

    function loadInfo() {
        if (player.current) {
            setPlayerProperties(
                {
                    ...playerProperties,
                    startTime: player.current.currentTime,
                    currentTime: player.current.currentTime,
                    duration: player.current.duration ?? 0
                })
        }
    }

    function handleTimeUpdate() {
        if (player.current) {
            setPlayerProperties(
                {
                    ...playerProperties,
                    currentTime: player.current.currentTime
                })

            if (player.current.ended) {
                setPlayerProperties({
                    ...playerProperties,
                    isAudioPlaying: false
                })
            }
        }

    }

    function handleSeek(event: ChangeEvent<HTMLInputElement>) {
        event.currentTarget
        if (player.current) {
            player.current.currentTime = Number(event.target.value)
            setPlayerProperties({
                ...playerProperties,
                currentTime: Number(event.target.value)
            })
        }

    }

    const [playerData, setPlayerData] = useState<any>(null)
    const musicData = usePlayer((state) => state.musicId)

    useEffect(() => {
        const req = async () => {
            const response = await fetch(`https://saavn.dev/api/songs/${musicData}`)
            const json = await response.json();
            setPlayerData(json.data[0])
        }
        req()
    }, [musicData])


    useEffect(() => {
        if ("mediaSession" in navigator) {
            if (playerData) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: playerData.name,
                    artist: getArtist(playerData.artists),
                    album: playerData.album.name,
                    artwork: [
                        {
                            src: playerData.image[0].url,
                            sizes: playerData.image[0].quality,
                            type: "image/png"
                        },
                        {
                            src: playerData.image[1].url,
                            sizes: playerData.image[1].quality,
                            type: "image/png"
                        },
                        {
                            src: playerData.image[2].url,
                            sizes: playerData.image[2].quality,
                            type: "image/png"
                        }
                    ]
                });
            }
        }

        navigator.mediaSession.setActionHandler("play", handlePlayPause);
        navigator.mediaSession.setActionHandler("pause", handlePlayPause);

        return () => {
            if ("mediaSession" in navigator) {
                navigator.mediaSession.setActionHandler("play", null);
                navigator.mediaSession.setActionHandler("pause", null);
            }
        }
    }, [playerData, musicData]);

    function handlePlayPause() {
        if (player.current) {
            if (player.current.paused) {
                player.current.play()
                setPlayerProperties(
                    {
                        ...playerProperties,
                        isAudioPlaying: true
                    }
                )
            }
            else {
                player.current.pause()
                setPlayerProperties(
                    {
                        ...playerProperties,
                        isAudioPlaying: false
                    }
                )
            }
        }
    }

    const download = async () => { return await downloadURL(playerData.downloadUrl[2].url, playerData.name) }



    navigator.mediaSession.setActionHandler("play", handlePlayPause);

    return (
        <>
            {
                playerData
                &&
                <div className="flex flex-col h-full items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-4 w-1/2">
                        <div className="rounded-md size-48">
                            <img
                                src={playerData.image[2].url}
                                alt={playerData.name}
                                className="h-full w-full object-cover rounded-md"
                            />
                        </div>

                        <div className="flex flex-col gap-1 justify-center items-center">
                            <div className="text-xl font-bold">{decodeHtmlEntities(playerData.name)}</div>
                            <div className="text-xs text-gray-400">{getArtist(playerData.artists)}</div>

                        </div>

                        {
                            playerData && <audio
                                ref={player}
                                src={playerData.downloadUrl[2].url}
                                autoPlay
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedData={loadInfo}

                            />
                        }
                        <div className="w-full">
                            <div className="flex gap-2 w-full justify-between">
                                <span>{formatTime(playerProperties.currentTime)}</span>
                                <span>{formatTime(playerProperties.duration)}</span>

                            </div>
                            <Progress
                                aria-label="progress"
                                className="w-full"
                                min={playerProperties.startTime}
                                value={playerProperties.currentTime}
                                step="0.01"
                                max={playerProperties.duration}
                                onChange={handleSeek}
                            />
                        </div>

                        <div className="flex gap-4 justify-between w-full">

                            <button type="button" aria-label="download"><HiListBullet className="size-6 hover:text-primary" /></button>
                            <div className="flex gap-2">
                                <button aria-label="pause" onClick={handlePlayPause} type="button"><HiChevronLeft className="size-6 hover:text-primary" /></button>
                                {
                                    playerProperties.isAudioPlaying ?
                                        <button aria-label="pause" onClick={handlePlayPause} type="button"><HiPause className="size-6 hover:text-primary" /></button> :
                                        <button aria-label="play" onClick={handlePlayPause} type="button"><HiPlay className="size-6 hover:text-primary" /></button>
                                }
                                <button aria-label="pause" onClick={handlePlayPause} type="button"><HiChevronRight className="size-6 hover:text-primary" /></button>
                            </div>

                            <button onClick={download} type="button" aria-label="download"><MdFileDownload className="size-6 hover:text-primary" /></button>
                        </div>
                    </div>
                </div >

            }

        </>
    )
}
