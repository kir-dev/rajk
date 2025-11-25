import Link from "next/link";

export default function AwardNotFound() {
    return (
        <div className="min-h-screen flex flex-row h-full w-full relative bg-black">
            <h2>Not Found</h2>
            <p>Could not find requested award</p>
            <Link href="/">Return Home</Link>
        </div>
    )
}