export default function Nevvalasztas() {
    return (
        <div className="flex flex-col h-full px-4 md:px-8 lg:px-12">
            <div className="text-center my-5 max-w-4xl mx-auto">
                Mióta Szakkollégiumunk felvette Rajk László (kommunista politikus) nevét, e választás gondolkodásra ösztönzi tagjait, és időről időre a külvilágot is. Az alábbiakban szeretnénk megvilágítani a név kiválasztásának és megtartásának körülményeit.
            </div>

            {/* Responsive content layout - switches to column on mobile */}
            <div className="flex flex-col md:flex-row gap-8 py-5">
                <div className="w-full md:pr-4 lg:pr-8">
                    <div className="bg-rajk-blue/10 p-6 rounded-lg">
                        Intézményünket 1974 óta nevezik Rajk László Szakkollégiumnak. Rajk László nevének felvétele egy egyetemista diákközösség bátor döntése volt a Kádár-korszakban. Az állampárt hangsúlyozott elve volt ugyanis az ideológiai folytonosság; de az 1949-es Rajk-per, majd az '56-os, tüntetésbe torkolló újratemetés – sok minden mással együtt – aláásta ezt az elvet. Ezek az események is a saját híveit sem kímélő rezsim torz és ellentmondásos mivoltát mutatták. A rendszer emlékeket elnyomó, történelemhamisító gyakorlatát bizonyítja, hogy Rajk neve a '70-es évek elején is tabunak számított. Egy Rajkról elnevezett intézmény, amely mindezekre felhívta környezete figyelmét, nyilvánvalóan szálka volt a politikai vezetés szemében. A hetvenes évek kollégistái úgy érezték, Rajk neve kifejezi a rendszerhez való kritikus hozzáállásukat.

                        A név felvétele részint arra hivatkozva vált mégis lehetővé, hogy Rajk László a Kollégium számára mintaként szolgáló népi kollégiumok legfőbb támogatója volt. Fontos körülmény, hogy 1973-ban, a névfelvétel kezdeményezésének évében a rendszert komoly belső kritikák érték az új gazdasági mechanizmus sikertelensége miatt, és az MSZMP szűk körű vezetésében is kiéleződtek az ellentétek. Ennek egyik megnyilvánulása lehetett a névválasztás jóváhagyása, hiszen ez kellemetlenül érintette az olyan vezetőket, akiknek szerepük volt Rajk László kivégzésében – például magát Kádár Jánost is.

                        A Rajk név ellentmondásossága már az 1980-as évek elején felmerült az akkori kollégiumi közéletben. A névkérdés azóta generációról generációra visszatérő téma a Kollégiumban.

                        Mindezek mellett a Rajk Szakkollégium szakmai és közéleti megnyilvánulásai mindig is egyértelműen jelezték a totalitárius rendszerrel szembeni kritikusságot, amely a nyolcvanas években aktív ellenzékiségbe torkollott.
                    </div>
                </div>

                <div className="w-full md:pl-4 lg:pl-8 mt-6 md:mt-0">
                    <div className="bg-rajk-blue/10 p-6 rounded-lg">
                        A kollégisták számára a Rajk név mára már eltávolodott a személytől: mindinkább magát a Szakkollégiumot jelképezi, annak több mint 50 évnyi történetével. Ugyanakkor a név megtartásával tisztelgünk is a Szakkollégium szellemisége és múltja előtt. Ezzel együtt nem szándékunk relativizálni Rajk László történelmi szerepét, vagy kisebbíteni a bűneit. Egyetértünk azokkal, akik ezek miatt elítélik, és megértjük azokat, akik a név használatával szemben ellenérzésekkel viseltetnek. Nem értünk azonban egyet azzal a történelemfelfogással, amely a múlt feldolgozását csak az eltörlés és megváltoztatás útján tartja lehetségesnek. Rajk László neve nagyon erős szimbóluma történelmünknek: egyszerre, elválaszthatatlanul volt bűnös és áldozat. A név minden rajkos generációt emlékeztet arra, hogy összetett, ellentmondásokkal terhelt XX. századunk mélyebb megértésére törekedjen.

                        <div className="mt-6 p-4 border-l-4 border-rajk-green bg-white/20">
                            <p className="font-medium mb-2">A szakkollégium kollégiumi gyűlése 2018 december 13-án a következő határozatot hozta:</p>
                            <p className="italic">
                                A kollégium nevét Rajk Szakkollégiumra változtatja. A személyhez kötődő keresztnév elhagyása révén a szakkollégium jelenlegi tagjai, a volt szakkollégisták felmért és érezhető egyetértésével, ki akarják fejezni, hogy elhatárolódnak Rajk László (kommunista politikus) személyétől és cselekedeteitől.
                            </p>
                            <p className="italic mt-2">
                                Ugyanakkor a kollégium fél évszázados múltját, elveit és történetét meg kívánják tisztelni azzal, hogy a személytől immár elváló, a kollégium identitásához szorosan kapcsolódó Rajk Szakkollégium nevet használják.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}