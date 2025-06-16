import {AboutTimelineEvent} from "@/payload-types";
import {RichText} from "@payloadcms/richtext-lexical/react";

interface HistoryCardProps {
    event: AboutTimelineEvent;
    isEven: boolean;
}

export default function HistoryCard(props: HistoryCardProps) {
    return(
        <div>
            <p className="text-lg font-bold mb-4">
                {props.event.name}
            </p>
            <RichText data={props.event.description} className="text-md mb-4"/>
        </div>
    )
}