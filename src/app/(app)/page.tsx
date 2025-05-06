import ActionButton from "@/components/ActionButton";
import {ArrowRight} from "lucide-react";
import SubTitle from "@/components/SubTitle";
import IconTitle from "@/components/IconTitle";
import MemberGrid from "@/components/MemberGrid";
import {mockMembers} from "@/mock-data/mock-members";

export default function Home() {
    return (<>
            {/*            <div>
                <iframe
                    src = "https://www.youtube.com/embed/lJgPfSw4w2c?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1"
                    title = "YouTube video player"
                    allow = "autoplay; encrypted-media"
                    allowFullScreen
                    className = 'aspect-video w-full'
                />
            </div>*/}
            <div className = 'bg-foreground h-screen w-full flex flex-col'>
                <SubTitle text = 'Második cím'/>
                <ActionButton>
                    Menjünk
                    <ArrowRight size = {20}/>
                </ActionButton>
                <MemberGrid members = {mockMembers}/>
                <IconTitle text = 'Rajk László Szakkollégium' icon = "Landmark"/>
            </div>
        </>
    );
}
