import React from 'react';
import { 
  Home, Calendar, Building, CreditCard, Users, Settings, Gift, 
  HelpCircle, Clock, Bell, Award, CheckCircle, RefreshCw, 
  Package, Coffee, Shield, MapPin, User, Info, X, ChevronUp, 
  ChevronDown, ArrowRight, AlertCircle, Headphones, CalendarPlus,
  ClipboardList, Zap
} from 'react-feather';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ name, className, size = 20, color }) => {
  const iconProps = { size, color, className };

  switch (name) {
    case 'home':
      return <Home {...iconProps} />;
    case 'calendar':
      return <Calendar {...iconProps} />;
    case 'building':
      return <Building {...iconProps} />;
    case 'credit-card':
      return <CreditCard {...iconProps} />;
    case 'users':
      return <Users {...iconProps} />;
    case 'settings':
      return <Settings {...iconProps} />;
    case 'gift':
      return <Gift {...iconProps} />;
    case 'help-circle':
      return <HelpCircle {...iconProps} />;
    case 'clock':
      return <Clock {...iconProps} />;
    case 'bell':
      return <Bell {...iconProps} />;
    case 'award':
      return <Award {...iconProps} />;
    case 'check-circle':
      return <CheckCircle {...iconProps} />;
    case 'refresh-cw':
      return <RefreshCw {...iconProps} />;
    case 'package':
      return <Package {...iconProps} />;
    case 'coffee':
      return <Coffee {...iconProps} />;
    case 'shield':
      return <Shield {...iconProps} />;
    case 'map-pin':
      return <MapPin {...iconProps} />;
    case 'user':
      return <User {...iconProps} />;
    case 'info':
      return <Info {...iconProps} />;
    case 'x':
      return <X {...iconProps} />;
    case 'chevron-up':
      return <ChevronUp {...iconProps} />;
    case 'chevron-down':
      return <ChevronDown {...iconProps} />;
    case 'arrow-right':
      return <ArrowRight {...iconProps} />;
    case 'alert-circle':
      return <AlertCircle {...iconProps} />;
    case 'headphones':
      return <Headphones {...iconProps} />;
    case 'calendar-plus':
      return <CalendarPlus {...iconProps} />;
    case 'clipboard-list':
      return <ClipboardList {...iconProps} />;
    case 'zap':
      return <Zap {...iconProps} />;
    default:
      return <Package {...iconProps} />;
  }
};

export default Icon;