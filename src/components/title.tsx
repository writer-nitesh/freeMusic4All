import { HiChevronLeft } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
interface TitleProps {
    title: string
    isBackBtn?: boolean
    path?: string
}

export function Title({ title, isBackBtn = true, path = "/" }: TitleProps) {
    return (
        <div className="flex items-center justify-start gap-1 py-3">
            {isBackBtn && <Link to={path}><HiChevronLeft className="size-6" /></Link>}
            <h1 className="text-xl font-bold items-center justify-center flex">
                <div className="flex items-center justify-center">
                    {title}
                </div>
            </h1>
        </div>
    )
}
