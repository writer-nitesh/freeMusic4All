import { Progress } from "./progress";
import { useData } from "../../data/store";
import { MdFileDownload } from "react-icons/md";
import { ChangeEvent, RefObject, useEffect, useRef } from "react"
import { decodeHtmlEntities, downloadURL, formatTime, getArtist } from "../../utils";
import { HiPlay, HiPause, HiChevronRight, HiChevronLeft, HiListBullet } from "react-icons/hi2";
import { Link } from "react-router-dom";



export function PlayerStatus() {
    const player: RefObject<HTMLAudioElement> = useRef<HTMLAudioElement>(null)
    const { currentMusic, setCurrentMusic } = useData((state) => state)
    const { musicId, playerData, currentTime, duration, startTime, isAudioPlaying } = currentMusic

    function loadInfo() {
        if (player.current) {
            setCurrentMusic(
                {
                    ...currentMusic,
                    startTime: player.current.currentTime,
                    currentTime: player.current.currentTime,
                    duration: player.current.duration ?? 0
                })
        }
    }

    function handleTimeUpdate() {
        if (player.current) {
            setCurrentMusic(
                {
                    ...currentMusic,
                    currentTime: player.current.currentTime
                })

            if (player.current.ended) {
                setCurrentMusic({
                    ...currentMusic,
                    isAudioPlaying: false
                })
            }
        }

    }

    function handleSeek(event: ChangeEvent<HTMLInputElement>) {
        event.currentTarget
        if (player.current) {
            player.current.currentTime = Number(event.target.value)
            setCurrentMusic({
                ...currentMusic,
                currentTime: Number(event.target.value)
            })
        }

    }


    // useEffect(() => {
    //     const req = async () => {
    //         const response = await fetch(`https://saavn.dev/api/songs/${musicData}`)
    //         console.log("response");
    //         console.log(response);

    //         const json = await response.json();
    //         setPlayerData(json.data[0])
    //     }
    //     req()
    // }, [musicData])

    useEffect(() => {
        const req = async () => {
            try {
                const response = await fetch(`https://api-fm4all.vercel.app/api/songs/${currentMusic.musicId}`);
                // const response = await fetch(`https://saavn.dev/api/songs/Stsn85oM`);
                console.log("response:", response);

                if (!response.ok) {
                    console.error(`HTTP error! status: ${response.status}`);
                    return;
                }

                const json = await response.json();
                setCurrentMusic({ ...currentMusic, playerData: json.data[0] });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        req();
    }, [musicId]);



    useEffect(() => {
        if ("mediaSession" in navigator) {
            if (playerData) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: decodeHtmlEntities(playerData.name),
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
    }, [playerData, musicId]);

    function handlePlayPause() {
        if (player.current) {
            if (player.current.paused) {
                player.current.play()
                setCurrentMusic(
                    {
                        ...currentMusic,
                        isAudioPlaying: true
                    }
                )
            }
            else {
                player.current.pause()
                setCurrentMusic(
                    {
                        ...currentMusic,
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
                <div className="h-full px-2">
                    <div className="flex justify-between h-full w-full gap-2 ">

                        {/* Music Image and Name */}
                        <Link to="/listern" className="flex items-center justify-center lg:w-[400px] gap-4">
                            {/* Image */}
                            <div>
                                <div className="h-12 w-12">
                                    <img
                                        src={playerData.image[2].url}
                                        alt={playerData.name}
                                        className="object-cover rounded-md"
                                    />
                                </div>
                            </div>
                            {/* Name */}
                            <div className="lg:flex hidden flex-col gap-1 justify-center items-start w-full">
                                <div className="line-clamp-1 text-2xl font-bold">
                                    {decodeHtmlEntities(playerData.name)}
                                </div>
                                <div className="line-clamp-1 text-xs text-gray-400">
                                    {getArtist(playerData.artists)}
                                </div>
                            </div>
                        </Link>

                        {/* Hidden Audio Tag */}

                        {
                            playerData && <audio
                                ref={player}
                                src={playerData.downloadUrl[2].url}
                                autoPlay
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedData={loadInfo}
                            />
                        }

                        {/* Player Controls */}
                        <div className="w-full flex flex-col items-center justify-center px-10">

                            {/* Controls */}
                            <div className="flex gap-2 items-center justify-center">
                                <button aria-label="pause" onClick={handlePlayPause} type="button"><HiChevronLeft className="size-5 hover:text-primary" /></button>
                                {
                                    isAudioPlaying ?
                                        <button aria-label="pause" onClick={handlePlayPause} type="button"><HiPause className="size-5 hover:text-primary" /></button> :
                                        <button aria-label="play" onClick={handlePlayPause} type="button"><HiPlay className="size-5 hover:text-primary" /></button>
                                }
                                <button aria-label="pause" onClick={handlePlayPause} type="button"><HiChevronRight className="size-5 hover:text-primary" /></button>
                            </div>
                            <div className="flex flex-col gap-1 items-center justify-center w-full">
                                {/* Music Time */}
                                <div className="flex w-full text-xs items-center justify-between">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>

                                </div>
                                {/* Progress Bar */}
                                <Progress
                                    aria-label="progress"
                                    className="w-full"
                                    min={startTime}
                                    value={currentTime}
                                    step="0.01"
                                    max={duration}
                                    onChange={handleSeek}
                                />
                            </div>
                        </div>

                        <div className="lg:flex gap-4 items-center justify-center hidden">
                            <button type="button" aria-label="playlist"><HiListBullet className="size-6 hover:text-primary" /></button>
                            <button onClick={download} type="button" aria-label="download"><MdFileDownload className="size-6 hover:text-primary" /></button>
                        </div>
                    </div>
                </div>

            }

        </>
    )
}
