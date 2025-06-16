import NavBarItem from "@/components/NavBar/NavBarItem";

export type SubCategory = [string, string];

export default function NavBarDropDown(
    {text, subCategories}: {
        text: string;
        subCategories?: SubCategory[];
    }
) {
    return (<div className = 'group relative inline-block'>
        <div className = {'font-bold px-2 group-hover:underline underline-offset-4 duration-100 hover:'}>{text}</div>
        <div className = {'absolute -left-2 top-full hidden pt-2 group-hover:block z-20 min-w-40 w-max'}>
            <div className = 'flex flex-col group gap-2 p-2 bg-rajk-blue text-nowrap black'>
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
