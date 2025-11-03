export default function GalleryPage() {
    return (
        <div className="min-h-screen flex flex-col py-20 bg-bezs gap-y-6 pt-40 text-black">
            <div className="flex flex-col items-center">
                {/* single video, opened within the playlist */}
                <iframe
                    src="https://www.youtube-nocookie.com/embed/T24j8XTcpe0?list=PLNmMGesxW4dOAWp8dT3ssBAPwTnRE6eNh"
                    title="YouTube video player"
                    className="aspect-video w-2/3"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            </div>

            <div className="flex flex-col items-center">
                {/* start at index 2 (0-based: 0,1,2) */}
                <iframe
                    src="https://www.youtube-nocookie.com/embed/KLdnISYOUo4?list=PLNmMGesxW4dOAWp8dT3ssBAPwTnRE6eNh&index=2"
                    title="YouTube video player"
                    className="aspect-video w-2/3"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            </div>

            <div className="flex flex-col items-center">
                <iframe
                    src="https://www.youtube-nocookie.com/embed/KLdnISYOUo4?list=PLNmMGesxW4dOAWp8dT3ssBAPwTnRE6eNh&index=3"
                    title="YouTube video player"
                    className="aspect-video w-2/3"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            </div>
        </div>
    );
}