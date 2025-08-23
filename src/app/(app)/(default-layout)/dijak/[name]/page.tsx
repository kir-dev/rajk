import AwardLandingSection from "@/components/Dijak/AwardLandingSection";
import TitleNextToContent from "@/components/TitleNextToContent";
import SubTitle from "@/components/PageTitle/SubTitle";
import {fetchAwards} from "@/fetch/fetchAwards";


export default async function page() {
    
    const awards = await fetchAwards();
    
    
    return (
        
        <div className = "bg-black min-h-screen flex flex-col items-center py-20">
            <AwardLandingSection/>
            <TitleNextToContent title = "About the John von Neumann Award"
                                content = "The John von Neumann Award, named after John von Neumann is given annually by the Rajk College for Advanced Studies (Budapest, Hungary), to an outstanding scholar in the exact social sciences, whose works have had substantial influence over a long period of time on the studies and intellectual activity of the students of the college. The award was established in 1994 and is given annually. In 2013, separately from the annual prize, Kenneth J. Arrow was given the Honorary John von Neumann Award."/>
            
            <SubTitle text={"Korábbi díjazottak"}></SubTitle>
            
        </div>
    )
}
