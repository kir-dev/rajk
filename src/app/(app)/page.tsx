import getEvents from "@/payload-find/getEvents";
import LandingPage from "@/components/LandingPage/LandingPage";
import getFAQs from "@/payload-find/getFAQs";

export default async function Home() {
    const data = await getEvents()
    const faq = await getFAQs()

    return (
        <LandingPage data={data} />
    );
}