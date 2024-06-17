export function getArtist(artists: any): string {
    return artists.primary.map((artist: any) => artist.name).join(", ");
}


export function formatTime(durationInSeconds: number) {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    const formattedTime =
        (hours > 0 ? hours + ':' : '') +
        String(minutes).padStart(2, '0') +
        ':' +
        String(seconds).padStart(2, '0');

    return formattedTime;
}


export async function downloadURL(url: string, filename: string) {
    const response = await fetch(url);
    const blob = await response.blob();
    const urlObject = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = urlObject;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(urlObject);
}

export function decodeHtmlEntities(encodedStr: string) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedStr;
    return textArea.value;
}

