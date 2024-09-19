import React, { useEffect, useRef, useState } from 'react'

interface DropdownItemAlginment {
    h?: "left" | "right"
    v?: "top" | "bottom"
    gap?: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5
}

interface DropdownProps extends DropdownItemAlginment {
    actionButton: React.ReactNode
    dropDownItems: React.ReactNode
}

const alignmentMap = {
    "left": "left-0",
    "right": "right-0",
    "top": "bottom-full",
    "bottom": "top-full"
}



export default function Dropdown({ actionButton, dropDownItems, gap = 0, h = "left", v = "bottom" }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

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

    return (
        <div ref={ref} className='flex items-center gap-2 flex-col relative w-full'>
            <div className='cursor-pointer select-none w-full' onClick={() => setIsOpen(!isOpen)}>
                {actionButton}
            </div>
            {
                isOpen &&
                <div className={`absolute cursor-pointer w-full ${alignmentMap[h]} ${alignmentMap[v]} gap-${gap} } `}>
                    {dropDownItems}
                </div>
            }
        </div >
    )
}
