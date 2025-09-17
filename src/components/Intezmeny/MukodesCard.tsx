interface MukodesCardProps {
    title: string
    text: string
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function MukodesCard(props: MukodesCardProps) {
    return (
        <div className="flex flex-col w-full">
            <div className="rounded-full self-center p-2 bg-rajk-green">
                <props.Icon className="w-25 h-25 p-4 text-white"/>
            </div>
            <div className="text-lg font-bold self-center">{props.title}</div>
            <div className="text-justify">{props.text}</div>
        </div>
    )
}