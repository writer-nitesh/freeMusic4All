import { Progress } from "./progress";
import { useData } from "../../data/store";
import { MdFileDownload } from "react-icons/md";
import { decodeHtmlEntities, formatTime, getArtist } from "../../utils";
import { HiPlay, HiPause, HiChevronRight, HiChevronLeft, HiListBullet } from "react-icons/hi2";



export function Player() {


    const { currentMusic, setCurrentMusic, audioPlayer } = useData((state) => state)
    const { musicId, playerData, currentTime, duration, startTime, isAudioPlaying } = currentMusic

    function handlePlayPause() {
        if (audioPlayer && audioPlayer.current) {
            if (audioPlayer.current.paused) {
                audioPlayer.current.play()
                setCurrentMusic(
                    {
                        ...currentMusic,
                        isAudioPlaying: true
                    }
                )
            }
            else {
                audioPlayer.current.pause()
                setCurrentMusic(
                    {
                        ...currentMusic,
                        isAudioPlaying: false
                    }
                )
            }
        }

    }
    return (
        <>
            {
                musicId
                &&
                <div className="flex flex-col items-center justify-center min-h-[85vh]">
                    <div className="flex flex-col items-center justify-center gap-4 lg:w-1/2 w-full ">
                        <div className="rounded-md size-48">
                            <img
                                src={playerData.image[2].url}
                                alt={playerData.name}
                                className="h-full w-full object-cover rounded-md"
                                onClick={handlePlayPause}
                            />
                        </div>

                        <div className="flex flex-col gap-1 justify-center items-center">
                            <div className="text-2xl font-bold">{decodeHtmlEntities(playerData.name)}</div>
                            <div className="text-xs text-gray-400">{getArtist(playerData.artists)}</div>

                        </div>

                        <div className="w-full">
                            <div className="flex gap-2 w-full justify-between">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>

                            </div>
                            <Progress
                                aria-label="progress"
                                className="w-full"
                                min={startTime}
                                value={currentTime}
                                step="0.01"
                                max={duration}
                            // onChange={handleSeek}
                            />
                        </div>

                        <div className="flex gap-4 justify-between w-full">

                            <button type="button" aria-label="download"><HiListBullet className="size-6 hover:text-primary" /></button>
                            <div className="flex gap-2">
                                <button aria-label="pause" onClick={handlePlayPause} type="button"><HiChevronLeft className="size-6 hover:text-primary" /></button>
                                {
                                    isAudioPlaying ?
                                        <button aria-label="pause" onClick={handlePlayPause} type="button"><HiPause className="size-6 hover:text-primary" /></button> :
                                        <button aria-label="play" onClick={handlePlayPause} type="button"><HiPlay className="size-6 hover:text-primary" /></button>
                                }
                                <button aria-label="pause" onClick={handlePlayPause} type="button"><HiChevronRight className="size-6 hover:text-primary" /></button>
                            </div>

                            <button type="button" aria-label="download"><MdFileDownload className="size-6 hover:text-primary" /></button>
                        </div>
                    </div>
                </div >

            }

        </>
    )

}
