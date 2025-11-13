import * as Icons from "lucide-react";

interface DynamicIconProps {
    iconName: string;
    className?: string;
}

export function DynamicLucideIcon({iconName, className}: DynamicIconProps) {
    const LucideIcon = Icons[iconName as keyof typeof Icons] as React.FC<{ className?: string }>;

    if (!LucideIcon) {
        console.warn(`Icon "${iconName}" not found in lucide-react.`);
        return null;
    }

    return <LucideIcon className = {className}/>;
}