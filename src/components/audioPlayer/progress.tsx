import { ChangeEvent, ComponentProps, RefObject, useRef, } from 'react'

export function Progress(props: Omit<ComponentProps<"input">, "type" | "onInput" | "ref">) {


    const inputRange: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    function progressScript() {
        const slider = inputRange.current
        if (slider) {
            const progress = Number(((Number(slider.value) / Number(slider.max)) * 100).toFixed(2));
            slider.style.background = `linear-gradient(to right, #EF4E8A ${progress}%, #ccc ${progress}%)`;
        }

    }
    const { onChange: originalOnChange, ...rest } = props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        originalOnChange?.(event);
        const slider = inputRange.current
        if (slider) {
            const progress = Number(((Number(slider.value) / Number(slider.max)) * 100).toFixed(2));
            slider.style.background = `linear-gradient(to right, #EF4E8A ${progress}%, #ccc ${progress}%)`;
        }
    };



    return (
        <input
            ref={inputRange}
            type="range"
            onInput={progressScript}
            {...rest}
            onSeeking={progressScript}
            onChange={handleChange}
        />
    )
}

