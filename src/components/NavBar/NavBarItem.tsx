import Link from "next/link";

export default function NavBarItem(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { text, href, selected = false, bordered = false, onClick }: {
        text: string;
        href: string;
        selected?: boolean;
        bordered?: boolean;
        onClick?: () => void;
    }
) {
    return (<>
        <Link className={`font-bold px-2 inline-block max-lg:w-auto max-xl:w-min lg:text-center ${bordered ? 'border-2 border-white rounded mx-2 px-4 py-1 hover:border-gray-300' : 'hover:underline underline-offset-4 '} duration-100`} href={href} onClick={onClick}>{text}</Link>
    </>)
}
