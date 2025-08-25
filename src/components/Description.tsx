export default function Description({text} : {text: string}) {
    return (<>
        <div className = "flex flex-col py-8 bg-bezs items-center h-auto">
            <h4 className = {"text-black font-medium text-xl"}>{text}</h4>
        </div>
    </>)
}
