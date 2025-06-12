interface WawyBorderProps {
    direction: "top" | "bottom";
}

export default function WawyBorder(props: WawyBorderProps) {
    return (
        <div className = {`absolute left-0 w-full overflow-hidden leading-0 transform ${(props.direction === "top") ? "translate-y-[-98%] top-0" : "translate-y-[98%] rotate-180 bottom-0"} z-10 bg-foreground`}>
            <svg
                className = "relative block w-full h-[70px]"
                data-name = "Layer 1"
                xmlns = "http://www.w3.org/2000/svg"
                viewBox = "0 0 1200 120"
                preserveAspectRatio = "none"
            >

                <path
                    d = "M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                    fill = "#23A455"
                ></path>
            </svg>
        </div>
    )
}