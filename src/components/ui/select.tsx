import { MouseEvent, useEffect, useRef, useState } from 'react'

interface SelectProps extends OptionsAlignment {
    options: Array<string | number>
    defaultOption?: string | number
    label: string
    name: string
    onSelect?: (name: string, value: string) => void
}

interface OptionsAlignment {
    h?: "left" | "right"
    v?: "top" | "bottom"
    gap?: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5
}

const ALIGNMENT_MAP = {
    "left": "left-0",
    "right": "right-0",
    "top": "bottom-full",
    "bottom": "top-full"
} as const;

const getAlignmentClasses = (h: OptionsAlignment['h'], v: OptionsAlignment['v'], gap: OptionsAlignment['gap']) => {
    return `${ALIGNMENT_MAP[h || 'left']} ${ALIGNMENT_MAP[v || 'bottom']} gap-${gap || 0}`;
};

export default function Select({ options, label, defaultOption, gap, h = "left", v = "bottom", onSelect, name }: SelectProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const alignment = getAlignmentClasses(h, v, gap);
    const [selected, setSelected] = useState<string | number | undefined>(defaultOption)

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    function handleSelect(event: MouseEvent<HTMLDivElement>) {
        const value = event.currentTarget.innerText
        const name = event.currentTarget.ariaLabel || ""
        setSelected(value)
        if (onSelect) {
            onSelect(name, value)
        }
        setIsOpen(false)
    }

    return (
        <div ref={ref} className='cursor-pointer select-none flex flex-col relative min-w-36 pb-1 '>
            <div onClick={() => setIsOpen(!isOpen)} className='flex items-center text-xs p-2 flex-col w-full bg-zinc-800 rounded-md capitalize'>
                {selected === undefined ? label : selected}
            </div>

            {
                isOpen &&
                <div className={`absolute cursor-pointer w-full ${alignment} shadow-md rounded-md glass_black overflow-hidden overflow-y-auto max-h-52 z-10`}>
                    {options.map((option) => {
                        return (
                            <div
                                onClick={handleSelect}
                                className={`flex items-start p-2 w-full hover:bg-primary hover:text-white1 
                                            ${selected === option ? 'bg-primary text-white' : ''}`
                                }
                                aria-label={name}
                            >
                                {option}
                            </div>
                        )
                    })}
                </div>
            }


        </div >
    )
}
