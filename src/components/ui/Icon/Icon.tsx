import React from 'react';
import * as LucideIcons from 'lucide-react';

export type IconName = keyof typeof LucideIcons;

interface IconProps {
    name: IconName;
    color?: string;
    size?: number | string;
    className?: string;
}

export function Icon({ name, color, size = 24, className, ...props }: IconProps) {
    const LucideIcon = LucideIcons[name];
    return <LucideIcon color={color} size={size} className={className} {...props} />;
}