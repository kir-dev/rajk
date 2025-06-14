interface WawyBorderProps {
    direction: "top" | "bottom";
    color?: "green" | "blue" | "purple" | "cream";
    szin?: "zold" | "kek" | "lila" | "bezs";
}

export default function WawyBorder(props: WawyBorderProps) {
    const getBgImage = () => {
        switch (props.szin) {
            case "zold": return "/lap_zold.png";
            case "kek": return "/lap_kek.png";
            case "lila": return "/lap_lila.png";
            case "bezs": return "/lap_bezs.png";
            default: return "/lap_zold.png";
        }
    };

    const bgImage = getBgImage();

    return (
        <div className = {`absolute left-0 w-full overflow-hidden leading-none transform ${(props.direction === "top") ? "translate-y-[-98%] top-0" : "translate-y-[98%] rotate-180 bottom-0"} z-10 bg-foreground`}>
            <svg
                className = "relative block w-full h-[70px]"
                data-name = "Layer 1"
                xmlns = "http://www.w3.org/2000/svg"
                viewBox = "0 0 1200 120"
                preserveAspectRatio = "none"
            >
                {!props.szin ? (
                    <path
                        d = "M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                        fill ={props.color === "cream" ? "#FBFBEF" : props.color === "blue" ? "#97D7FB" : props.color === "purple" ? "#CDB3EE" : "#1C9647"}
                    ></path>
                ) : (
                    <>
                        <path
                            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                            fill="transparent"
                            style={{ fill: `url(#img-${props.szin || "default"})` }}
                        ></path>

                        <defs>
                            <pattern id={`img-${props.szin || "default"}`} patternUnits="userSpaceOnUse" width="100%" height="100%">
                                <image href={bgImage} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
                            </pattern>
                        </defs>
                    </>
                )}

            </svg>
        </div>
    )
}