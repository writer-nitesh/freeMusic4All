export enum ImageSize {
    '50x50' = "0",
    '150x150' = "1",
    '500x500' = "2",
}

interface ImageProps {
    images: any
    alt: string
    size: ImageSize
}

export function Image({ images, alt, size}: ImageProps) {

    return (
        <div className='max-h-20 max-w-20 rounded-md'>
            <img
                src={images[size].url}
                alt={alt}
                className="h-full w-full object-cover rounded-md"
            />
        </div>
    )
}
