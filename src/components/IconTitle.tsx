export default function IconTitle({
    title,
    Icon,
    className = "",
    iconAnimation = "",
}: {
    title: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    className?: string;
    iconAnimation?: string;
}) {
    return (
        <h2 className={`text-3xl font-bold my-2 inline-block ${className}`}>
                <span className="flex items-center justify-center gap-3">
                    <Icon className={`h-8 w-8 text-rajk-green ${iconAnimation}`} />
                    <span className="underline decoration-rajk-green decoration-2 underline-offset-8 ">{title}</span>
                </span>
        </h2>
    );
}