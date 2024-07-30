import { useState, useEffect } from 'react';

export interface FetchRequest {
    data: any
    loading: boolean
    error: boolean
}

export function useFetch(url: string) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        }
        if (url) {
            fetchData();
        }
    }, [url]);

    return { data, loading, error } as FetchRequest
}

