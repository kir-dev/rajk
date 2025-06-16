import WawyBorder from "@/components/WawyBorder";

interface StatisticsProps {
    isLast?: boolean;
    color: "green" | "blue" | "purple" | "cream";
    szin: "zold" | "kek" | "lila" | "bezs";
}

export default function Statistics(props: StatisticsProps) {
    const bgClass = (() => {
        switch (props.szin) {
            case "bezs": return "bg-bezs";
            case "kek": return "bg-kek";
            case "lila": return "bg-lila";
            case "zold": return "bg-zold";
            default: return "bg-zold";
        }
    })();

    return(
        <div className="relative">
            <WawyBorder direction={"top"} color={props.color} szin={props.szin}/>
            <div className={`${bgClass} text-white py-16 px-8`}>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-2">SZAKMA</h2>
                        <div className="w-20 h-1 mx-auto"></div>
                    </div>

                    {/* Statistics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {/* First Stat */}
                        <div className="space-y-4 animate-count-up" style={{animationDelay: '0.2s'}}>
                            <p className="text-lg md:text-xl font-light">A 2022/23-es tanévben</p>
                            <div className="text-6xl md:text-7xl font-bold relative">
                                <span className="inline-block transform transition-all hover:scale-110 duration-300">48</span>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white opacity-50"></div>
                            </div>
                            <p className="text-lg md:text-xl font-light">Kurzus</p>
                        </div>

                        {/* Second Stat */}
                        <div className="space-y-4 animate-count-up" style={{animationDelay: '0.2s'}}>
                            <p className="text-lg md:text-xl font-light">Az elmúlt 5 évben</p>
                            <div className="text-6xl md:text-7xl font-bold relative">
                                <span className="inline-block transform transition-all hover:scale-110 duration-300">48</span>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white opacity-50"></div>
                            </div>
                            <p className="text-lg md:text-xl font-light">Leadott TDK</p>
                        </div>

                        {/* Third Stat */}
                        <div className="space-y-4 animate-count-up" style={{animationDelay: '0.2s'}}>
                            <p className="text-lg md:text-xl font-light">Az elmúlt 5 év alatt</p>
                            <div className="text-6xl md:text-7xl font-bold relative">
                                <span className="inline-block transform transition-all hover:scale-110 duration-300">48</span>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white opacity-50"></div>
                            </div>
                            <p className="text-lg md:text-xl font-light">Helyezett TDK</p>
                        </div>
                    </div>
                </div>
            </div>
            {props.isLast ? null : <WawyBorder direction={"bottom"} color={props.color} szin={props.szin}/>}
        </div>
    )
}