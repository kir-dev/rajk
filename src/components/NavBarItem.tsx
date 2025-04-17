import Link from "next/link";

export default function NavBarItem(
    { text, href, selected = false, bordered = false }: {
        text: string;
        href: string;
        selected?: boolean;
        bordered?: boolean;
    }
) {
    return (<>
        <Link className={`font-black px-2  ${bordered ? ' inline-block border-2 border-white rounded mx-2 px-2 py-1 hover:border-gray-300' : 'hover:underline underline-offset-4 '} duration-100`} href={href}>{text}</Link>
    </>)
}
