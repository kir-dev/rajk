interface LeafDecorationProps {
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    className?: string;
}

export const LeafDecoration = ({ position, className = '' }: LeafDecorationProps) => {
    const getPositionClasses = () => {
        switch (position) {
            case 'top-left':
                return 'absolute -top-4 -left-4 rotate-[-25deg]';
            case 'top-right':
                return 'absolute -top-4 -right-4 rotate-[25deg] scale-x-[-1]';
            case 'bottom-left':
                return 'absolute -bottom-4 -left-4 rotate-[155deg]';
            case 'bottom-right':
                return 'absolute -bottom-4 -right-4 rotate-[-155deg] scale-x-[-1]';
            default:
                return '';
        }
    };

    return (
        <div className={`${getPositionClasses()} ${className}`}>
            <svg
                width="180"
                height="120"
                viewBox="0 0 180 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-sm"
            >
                {/* Main branch */}
                <path
                    d="M15 60 Q45 52 75 60 Q105 68 135 60 Q157 57 172 60"
                    stroke="hsl(var(--leaf-secondary))"
                    strokeWidth="4"
                    fill="none"
                />

                {/* Leaves */}
                <ellipse cx="37" cy="37" rx="12" ry="22" fill="hsl(var(--leaf-primary))" transform="rotate(-30 37 37)" />
                <ellipse cx="30" cy="75" rx="10" ry="18" fill="hsl(var(--leaf-accent))" transform="rotate(45 30 75)" />
                <ellipse cx="60" cy="30" rx="13" ry="24" fill="hsl(var(--leaf-secondary))" transform="rotate(-45 60 30)" />
                <ellipse cx="52" cy="82" rx="12" ry="21" fill="hsl(var(--leaf-primary))" transform="rotate(30 52 82)" />
                <ellipse cx="90" cy="37" rx="15" ry="27" fill="hsl(var(--leaf-accent))" transform="rotate(-20 90 37)" />
                <ellipse cx="82" cy="90" rx="13" ry="22" fill="hsl(var(--leaf-secondary))" transform="rotate(50 82 90)" />
                <ellipse cx="120" cy="30" rx="12" ry="21" fill="hsl(var(--leaf-primary))" transform="rotate(-35 120 30)" />
                <ellipse cx="112" cy="82" rx="10" ry="19" fill="hsl(var(--leaf-accent))" transform="rotate(25 112 82)" />
                <ellipse cx="142" cy="45" rx="13" ry="24" fill="hsl(var(--leaf-secondary))" transform="rotate(-15 142 45)" />
                <ellipse cx="150" cy="75" rx="12" ry="18" fill="hsl(var(--leaf-primary))" transform="rotate(40 150 75)" />
            </svg>
        </div>
    );
};