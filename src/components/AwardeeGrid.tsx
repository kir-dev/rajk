import {Awardee} from "@/payload-types";
import AwardeePicture from "@/components/AwardeePicture";

export default function AwardeeGrid({awardees}: { awardees: Awardee[] }) {
    if (!awardees || awardees.length === 0) {
        return <div className = "text-white">No awardees found</div>;
    }
    return (<div className = 'grid gap-2 grid-cols-2 md:grid-cols-4 gap-4 w-full mx-auto container'>
        {
            awardees.map((awardee, index) => (
                    <div key = {awardee.id + "-" + index} >
                        <AwardeePicture awardee = {awardee}/>
                    </div>
                )
            )
        }
    </div>)
}
