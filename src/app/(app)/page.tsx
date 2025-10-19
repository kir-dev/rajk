import LandingPage from "@/components/LandingPage/LandingPage";
import getEvents from "@/payload-find/getEvents";

export default async function Home() {
    const data = await getEvents()

    return (
        <LandingPage data={data} />
    );
}