import NavBarItem from "@/components/NavBarItem";

export type SubCategory = [string, string];

export default function NavBarDropDown(
    {text, subCategories}: {
        text: string;
        subCategories?: SubCategory[];
    }
) {
    return (<div className = 'group relative inline-block'>
        <div className = {'font-black px-2 group-hover:scale-105 duration-100 hover:'}>{text}</div>
        <div className = {'absolute -left-2 top-full hidden pt-2 group-hover:block z-20 min-w-28'}>
            <div className = 'flex flex-col group gap-2 p-2 bg-green-800'>
                {subCategories && subCategories.map((subCategory, index) => {
                    return (
                        <div key = {index}>
                            <NavBarItem href = {subCategory[1]} text = {subCategory[0]}>
                            </NavBarItem>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>)
}
