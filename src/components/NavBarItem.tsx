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
        <Link className={`font-black px-2 hover:scale-105 duration-100 ${bordered ? 'border-2 border-white rounded mx-1 px-2 py-1 ' : ''}`} href={href}>{text}</Link>
    </>)
}
