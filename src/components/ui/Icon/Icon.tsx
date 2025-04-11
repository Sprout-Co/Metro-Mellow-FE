import React from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon as LucideIconType } from "lucide-react";

export type IconName = keyof typeof LucideIcons;

interface IconProps {
  name: IconName;
  color?: string;
  size?: number | string;
  className?: string;
}

export function Icon({
  name,
  color,
  size = 24,
  className,
  ...props
}: IconProps) {
  const LucideIcon = LucideIcons[name] as LucideIconType;

  if (!LucideIcon) {
    console.error(`Icon "${name}" not found in LucideIcons`);
    return null;
  }

  return (
    <LucideIcon color={color} size={size} className={className} {...props} />
  );
}
