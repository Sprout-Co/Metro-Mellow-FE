//@ts-nocheck
"use client";
import { LucideProps } from "lucide-react";
import dynamic from "next/dynamic";
import { memo } from "react";

// Import specific icons to reduce bundle size
import {
  Home,
  CalendarPlus,
  Calendar,
  Search,
  Bell,
  User,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Clock,
  CheckCircle,
  RefreshCw,
  Award,
  Activity,
  Zap,
  MapPin,
  Headphones,
  Settings,
  PlusCircle,
  Plus,
  Minus,
  X,
  ClipboardList,
  Square,
  Bed,
  Droplet,
  Shield,
  Coffee,
  Package,
  Users,
  AlertTriangle,
  Info,
  AlertCircle,
  FileText,
  BarChart3,
  TrendingUp,
  Quote,
  Bug,
  Rat,
  BugOff,
  Star,
  Repeat,
  Heart,
  Edit,
} from "lucide-react";

// Map of icon names to components
const icons = {
  home: Home,
  "calendar-plus": CalendarPlus,
  calendar: Calendar,
  search: Search,
  bell: Bell,
  user: User,
  "chevron-down": ChevronDown,
  "chevron-up": ChevronUp,
  "chevron-right": ChevronRight,
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,
  clock: Clock,
  "check-circle": CheckCircle,
  "refresh-cw": RefreshCw,
  award: Award,
  activity: Activity,
  zap: Zap,
  "map-pin": MapPin,
  headphones: Headphones,
  settings: Settings,
  "plus-circle": PlusCircle,
  plus: Plus,
  minus: Minus,
  x: X,
  "clipboard-list": ClipboardList,
  square: Square,
  bed: Bed,
  droplet: Droplet,
  shield: Shield,
  coffee: Coffee,
  package: Package,
  users: Users,
  "alert-triangle": AlertTriangle,
  info: Info,
  "alert-circle": AlertCircle,
  "file-text": FileText,
  "bar-chart": BarChart3,
  "trending-up": TrendingUp,
  quote: Quote,
  ant: Bug,
  rat: Rat,
  "bug-off": BugOff,
  mosquito: Bug,
  star: Star,
  repeat: Repeat,
  heart: Heart,
  edit: Edit,
  "help-circle": dynamic(() =>
    import("lucide-react").then((mod) => mod.HelpCircle)
  ),
  building: dynamic(() => import("lucide-react").then((mod) => mod.Building)),
  "credit-card": dynamic(() =>
    import("lucide-react").then((mod) => mod.CreditCard)
  ),
  gift: dynamic(() => import("lucide-react").then((mod) => mod.Gift)),
};

export type IconName = keyof typeof icons;

interface IconProps extends LucideProps {
  name: IconName | any;
  className?: string;
}

const memoIcon = ({ name, className = "", ...rest }: IconProps) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent className={className} {...rest} />;
};

export const Icon = memo(memoIcon);
