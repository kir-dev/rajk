export default function ActionButton(
    {text, onClick, href, className}: {
        text?: string;
        onClick?: () => void;
        href?: string;
        className?: string;
    }
) {
    return (<>
        <button className = 'bg-rajk-green text-foreground py-2 px-4 rounded-md h-fit'>
            Action
        </button>
    </>)
}
