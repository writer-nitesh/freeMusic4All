
export enum ImageSize {
    SMALL = "0",
    MEDIUM = "1",
    LARGE = "2",
}

export function Image({ images, alt, size = ImageSize.MEDIUM }: { images: any, alt: string, size: ImageSize }) {
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
