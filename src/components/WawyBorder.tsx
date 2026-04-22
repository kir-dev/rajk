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
        <div className={`absolute left-0 w-full overflow-hidden leading-none transform ${(props.direction === "top") ? "translate-y-[-98%] top-0" : "translate-y-[98%] rotate-180 bottom-0"} z-20 bg-transparent ${props.backgroundColor || "bg-transparent"}`}>
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
                        <defs>
                            <pattern id={`img-${props.szin || "default"}`} patternUnits="userSpaceOnUse" width="1200" height="120" preserveAspectRatio="xMidYMid slice">
                                <image
                                    href={bgImage}
                                    x="0"
                                    y="-540"
                                    width="1200"
                                    height="1200"
                                    preserveAspectRatio="xMidYMid slice"
                                />
                            </pattern>
                        </defs>
                        <path
                            d="M0,0 L200,60 L400,30 L600,80 L800,20 L1000,70 L1200,40 L1200,120 L0,120 Z"
                            fill={`url(#img-${props.szin || "default"})`}
                        ></path>
                    </>
                )}
            </svg>
        </div>
    )
}