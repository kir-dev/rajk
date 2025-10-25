interface MukodesCardProps {
    title: string
    text: string
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function MukodesCard(props: MukodesCardProps) {
    return (
        <div className="flex flex-col w-full pt-6 p-4 sm:p-8">
            {props.title && <div className="text-lg font-bold self-center mb-2">{props.title}</div>}
            <div className="text-base sm:text-lg text-justify leading-relaxed">{props.text}</div>
        </div>
    )
}