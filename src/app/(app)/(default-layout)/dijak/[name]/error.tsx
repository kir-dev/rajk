'use client'

import { useEffect } from 'react'

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex flex-col w-full relative bg-black text-white justify-center items-center gap-4">
            <h2>Something went wrong!</h2>
            <p>Message: {error.message}</p>
            {error.stack && (
                <pre className="whitespace-pre-wrap">{error.stack}</pre>
            )}
            <p>Digest: {error.digest}</p>
            <button
                onClick={
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}