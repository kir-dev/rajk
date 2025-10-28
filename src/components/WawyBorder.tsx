interface WawyBorderProps {
    direction: "top" | "bottom";
    color?: "green" | "blue" | "purple" | "cream";
    szin?: "zold" | "kek" | "lila" | "bezs";
    backgroundColor?: string;
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
        <div className={`absolute left-0 w-full overflow-hidden leading-none transform ${(props.direction === "top") ? "translate-y-[-100%] top-0" : "translate-y-[100%] rotate-180 bottom-0"} z-10 bg-transparent ${props.backgroundColor || "bg-transparent"}`}>
            <svg
                className="relative block w-full h-[70px]"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
            >
                {!props.szin ? (
                    <path
                        d="M0,0 L200,60 L400,30 L600,80 L800,20 L1000,70 L1200,40 L1200,120 L0,120 Z"
                        fill={props.color === "cream" ? "#FBFBEF" : props.color === "blue" ? "#97D7FB" : props.color === "purple" ? "#CDB3EE" : "#1C9647"}
                    ></path>
                ) : (
                    <>
                        <path
                            d="M0,0 L200,60 L400,30 L600,80 L800,20 L1000,70 L1200,40 L1200,120 L0,120 Z"
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