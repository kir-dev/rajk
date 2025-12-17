export const getEmbedUrl = (url: string | null | undefined): string | undefined => {
    if (!url) return undefined;

    try {
        // Handle standard youtube.com/watch?v=ID
        if (url.includes("youtube.com/watch")) {
            const urlObj = new URL(url);
            const videoId = urlObj.searchParams.get("v");
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }
        
        // Handle shortened youtu.be/ID
        if (url.includes("youtu.be/")) {
            const urlObj = new URL(url);
            const videoId = urlObj.pathname.slice(1);
             if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }
        
        // Handle already correct embed links or other cases
        return url;
    } catch {
        console.error("Invalid video URL", url);
        return url;
    }
};
