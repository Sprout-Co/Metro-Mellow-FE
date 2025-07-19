# CTAButton Component

A powerful, attention-grabbing Call-to-Action button component built on top of the base Button component with advanced animations designed to maximize user engagement and conversions.

## Features

- 🎯 **9 Attention-Grabbing Animations**: pulse, heartbeat, glow, bounce, shimmer, flash, vibrate, wobble, flicker
- ⚡ **Performance Optimized**: Uses CSS animations where possible, Framer Motion for complex transforms
- 🎛️ **Highly Configurable**: Control timing, intensity, continuity, and behavior
- ♿ **Accessible**: Respects `prefers-reduced-motion` and high contrast preferences
- 🎨 **Design System Integration**: Leverages your existing color, spacing, and animation tokens
- 📱 **Responsive**: Works perfectly across all device sizes

## Quick Start

```tsx
import { CTAButton } from '@/components/ui/Button/CTAButton';

// Basic usage
<CTAButton animationType="pulse" variant="primary">
  Get Started Now
</CTAButton>

// Advanced configuration
<CTAButton
  animationType="heartbeat"
  animationIntensity="intense"
  autoAnimate={2000}
  animationInterval={5000}
  pauseOnHover={true}
  variant="secondary"
  size="lg"
>
  Limited Time Offer!
</CTAButton>
```

## Animation Types

### 🫀 `pulse` (Recommended for primary CTAs)

Gentle scaling that draws attention without being distracting. Perfect for main call-to-action buttons.

### 💓 `heartbeat`

Double-pulse animation that creates urgency. Ideal for limited-time offers and important actions.

### ✨ `glow`

Continuous rotating glow effect that suggests premium or special content. Great for upgrades and premium features.

### 🏀 `bounce`

Playful vertical movement that adds personality. Perfect for fun, casual, or gaming interfaces.

### 🌟 `shimmer`

Elegant light sweep effect that suggests newness or discovery. Excellent for "new feature" highlights.

### ⚡ `flash`

High-intensity attention grabber with color explosion. Use sparingly for maximum impact sales or alerts.

### 📳 `vibrate`

Rapid horizontal shake that mimics device vibration. Perfect for notifications and alerts.

### 🎭 `wobble`

Quirky rotation and scale combination. Great for creative or artistic brand personalities.

### 🔥 `flicker`

Electrical effect with brightness variations. Ideal for tech-focused or high-energy actions.

## Props

| Prop                 | Type                                | Default    | Description                                       |
| -------------------- | ----------------------------------- | ---------- | ------------------------------------------------- |
| `animationType`      | `AnimationType`                     | `"pulse"`  | The animation style to use                        |
| `animationIntensity` | `"subtle" \| "medium" \| "intense"` | `"medium"` | Controls the strength of the animation            |
| `autoAnimate`        | `number`                            | `2000`     | Delay before first animation (ms), 0 to disable   |
| `animationInterval`  | `number`                            | `5000`     | Interval between animations (ms), 0 for no repeat |
| `animationDuration`  | `number`                            | `800`      | Duration of each animation (ms)                   |
| `continuous`         | `boolean`                           | `false`    | Whether animation runs continuously               |
| `pauseOnHover`       | `boolean`                           | `false`    | Pause animation when user hovers                  |

_All other props from the base Button component are also supported._

## Best Practices

### 🎯 Conversion Optimization

- **Primary CTAs**: Use `pulse` or `heartbeat` with medium intensity
- **Secondary CTAs**: Use `bounce` or `shimmer` with subtle intensity
- **Urgent Actions**: Use `flash` or `flicker` with intense intensity, but sparingly

### ⏰ Timing Guidelines

- **Auto-animate delay**: 2-4 seconds (gives users time to read content first)
- **Animation interval**: 5-8 seconds (frequent enough to catch attention, not annoying)
- **Duration**: 600-1000ms (quick enough to feel responsive, long enough to notice)

### 🎨 Design Harmony

- **Limit usage**: Only 1-2 animated CTAs per page to maintain focus
- **Match brand personality**: Playful brands can use `bounce`/`wobble`, professional brands should stick to `pulse`/`glow`
- **Consider context**: Use `vibrate` for notifications, `shimmer` for new features, `flash` for sales

### ♿ Accessibility

- The component automatically disables animations for users with `prefers-reduced-motion`
- In high contrast mode, complex visual effects are simplified
- All animations maintain keyboard focus and screen reader compatibility

## Examples

### E-commerce Product Page

```tsx
// Primary purchase button
<CTAButton
  animationType="pulse"
  animationIntensity="medium"
  autoAnimate={3000}
  animationInterval={8000}
  variant="primary"
  size="lg"
>
  Add to Cart - $29.99
</CTAButton>

// Urgency for limited stock
<CTAButton
  animationType="heartbeat"
  animationIntensity="intense"
  continuous={true}
  variant="secondary"
>
  Only 3 Left!
</CTAButton>
```

### SaaS Landing Page

```tsx
// Main CTA
<CTAButton
  animationType="glow"
  continuous={true}
  pauseOnHover={true}
  variant="primary"
  size="lg"
>
  Start Free Trial
</CTAButton>

// Secondary action
<CTAButton
  animationType="shimmer"
  autoAnimate={4000}
  animationInterval={10000}
  variant="ghost"
>
  Watch Demo
</CTAButton>
```

### Notification System

```tsx
<CTAButton
  animationType="vibrate"
  animationIntensity="subtle"
  autoAnimate={1000}
  animationInterval={0}
  variant="primary"
  size="sm"
>
  You have 3 new messages
</CTAButton>
```

## Performance Notes

- CSS animations are used where possible for optimal performance
- Framer Motion handles complex transform animations
- `will-change` and `transform3d` ensure GPU acceleration
- Animations automatically pause when not in viewport (if using Intersection Observer)

## Browser Support

- Modern browsers (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Graceful degradation to static buttons in older browsers
- Full accessibility support across all supported browsers
