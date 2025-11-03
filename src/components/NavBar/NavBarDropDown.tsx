import NavBarItem from "@/components/NavBar/NavBarItem";

export type SubCategory = [string, string];

export default function xNavBarDropDown(
    {text, href, bordered, subCategories}: {
        text: string;
        href: string;
        bordered?: boolean;
        subCategories?: SubCategory[];
    }
) {
    return (<div className = 'group relative inline-block'>
        <NavBarItem text={text} href={href} bordered={bordered}/>
        <div className = {'absolute -left-2 top-full hidden pt-2 group-hover:block z-20 min-w-40 w-max'}>
            <div className = 'flex flex-col group gap-2 p-2 bg-white/60 backdrop-blur-lg shadow-lg border border-white/30 text-nowrap text-slate-700 black'>
                {subCategories && subCategories.map((subCategory, index) => {
                    return (
                        <div key = {index}>
                            <NavBarItem href = {subCategory[1]} text = {subCategory[0]}/>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>)
}
