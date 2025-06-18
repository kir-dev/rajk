interface BuildingDotProps {
    text: string;
}

export default function BuildingDot(props: BuildingDotProps){
    return (
        <div className="absolute top-1/3 left-1/4 rounded-full p-2 bg-blue-950 relative">
            <div className="absolute -left-10 -top-10 hover:hidden text-white p-2 bg-red-700">
                {props.text}
            </div>
            <div className="w-7 h-7 rounded-full p-2 bg-gray-500">
                +
            </div>
        </div>
    )
}