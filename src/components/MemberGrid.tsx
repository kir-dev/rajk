import MemberPicture from "@/components/MemberPicture";
import {Person} from "@/collections/People";

export default function MemberGrid({members} : {members: Person[]}) {
    return (<div className='grid gap-2 grid-cols-2 md:grid-cols-4 w-fit'>
        {
            members.map((member) => (
                    <div key = {member.name + member.imageSrc} className='inline-block w-fit'>
                        <MemberPicture member={member}/>
                    </div>
                )
            )
        }
    </div>)
}
