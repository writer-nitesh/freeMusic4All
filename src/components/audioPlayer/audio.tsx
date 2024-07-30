import React, { useRef, RefObject } from 'react';
import { useData } from '../../data/store';
type AudioProps = React.AudioHTMLAttributes<HTMLAudioElement>;

export function Audio(props: AudioProps): JSX.Element {
    const player: RefObject<HTMLAudioElement> = useRef<HTMLAudioElement>(null);
    useData((state) => state.setAudioPlayer(player))
    return (
        <audio
            ref={player}
            {...props}
        />
    );
}
