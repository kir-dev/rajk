import WawyBorder from "@/components/WawyBorder";

export default function Statistics(){
    return(
        <div className="relative">
            <WawyBorder direction={"top"}/>
            <div className="bg-rajk-green text-white py-16 px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-2">SZAKMA</h2>
                        <div className="w-20 h-1 bg-white mx-auto"></div>
                    </div>

                    {/* Statistics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {/* First Stat */}
                        <div className="space-y-4">
                            <p className="text-lg md:text-xl font-light">A 2022/23-es tanévben</p>
                            <div className="text-6xl md:text-7xl font-bold">48</div>
                            <p className="text-lg md:text-xl font-light">Kurzus</p>
                        </div>

                        {/* Second Stat */}
                        <div className="space-y-4">
                            <p className="text-lg md:text-xl font-light">Az elmúlt 5 évben</p>
                            <div className="text-6xl md:text-7xl font-bold">201</div>
                            <p className="text-lg md:text-xl font-light">Leadott TDK</p>
                        </div>

                        {/* Third Stat */}
                        <div className="space-y-4">
                            <p className="text-lg md:text-xl font-light">Az elmúlt 5 év alatt</p>
                            <div className="text-6xl md:text-7xl font-bold">93</div>
                            <p className="text-lg md:text-xl font-light">Helyezett TDK</p>
                        </div>
                    </div>
                </div>
            </div>
            <WawyBorder direction={"bottom"}/>
        </div>
    )
}