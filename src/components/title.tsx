import { HiChevronLeft } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export function Title({ title }: { title: string }) {
    return (
        <div className="flex items-center justify-start gap-1 py-3">
            <Link to="/" ><HiChevronLeft className="size-6" /></Link>
            <h1 className="text-xl font-bold items-center justify-center flex">
                <div className="flex items-center justify-center">
                    {title}
                </div>
            </h1>
        </div>
    )
}
