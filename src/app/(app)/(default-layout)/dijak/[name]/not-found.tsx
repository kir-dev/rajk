import Link from "next/link";

export default function AwardNotFound() {
    return (
        <div className="min-h-screen flex flex-col w-full relative bg-black text-white justify-center items-center gap-4">
            <h2 className="text-4xl">Not Found 404</h2>
            <p className="text-xl">Could not find requested award</p>
            <p>Check out our existing awards</p>
            <div>
                <ul className="list-disc list-inside">
                    <li><Link href="/dijak/neumann-janos">Neumann János-díj</Link></li>
                    <li><Link href="/dijak/herbert-simon">Herbert Simon-díj</Link></li>
                </ul>
            </div>
            <p>or</p>
            <Link href="/">Return Home</Link>
        </div>
    )
}