import getEventsMedia from "@/payload-find/getEventsMedia";
import LandingPage from "@/components/LandingPage/LandingPage";

export default async function Home() {
    const data = await getEventsMedia()

    return (
        <LandingPage data={data} />
    );
}