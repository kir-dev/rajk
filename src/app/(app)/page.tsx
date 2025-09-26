import getEvents from "@/payload-find/getEvents";
import LandingPage from "@/components/LandingPage/LandingPage";

export default async function Home() {
    const data = await getEvents()

    return (
        <LandingPage data={data} />
    );
}
