# Metromellow Design System - SCSS Setup Guide

## 📁 File Structure

```
src/styles/
├── abstracts/
│   ├── _variables.scss    # Design tokens and configuration
│   ├── _functions.scss    # Utility functions for design tokens
│   └── _mixins.scss       # Reusable style patterns
├── _reset.scss           # CSS reset and normalize
└── main.scss            # Main stylesheet with utilities
```

## 🚀 Setup Instructions

### 1. Import Order in your `globals.scss` or main CSS file:

```scss
// Reset styles first
@import "@/styles/reset";

// Main styles with utilities
@import "@/styles/main";

// Component styles come after
```

### 2. Using in Component Modules:

```scss
// Component.module.scss
@import "@/styles/abstracts/variables";
@import "@/styles/abstracts/functions";
@import "@/styles/abstracts/mixins";

.component {
  @include button-primary;
  color: color("primary", "base");
  padding: spacing("md");
}
```

### 3. TypeScript Path Configuration:

Add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/styles/*": ["./src/styles/*"]
    }
  }
}
```

## 🎨 Design System Usage

### Colors

```scss
// Using the color function
.element {
  background-color: color("primary", "base"); // #075056
  color: color("neutral", "white"); // #ffffff
  border-color: color("secondary", "light"); // #fe9d68
}

// Using color utilities with alpha
.overlay {
  background-color: color-alpha("neutral", "black", 0.5);
}
```

### Typography

```scss
// Using typography mixins
.heading {
  @include heading-1; // Responsive heading with proper scaling
}

.body-text {
  @include body-2; // Standard body text
}

// Using typography functions
.custom-text {
  font-size: font-size("title");
  font-weight: font-weight("semibold");
  line-height: line-height("tight");
}
```

### Spacing

```scss
// Using spacing function
.card {
  padding: spacing("lg"); // 1.5rem (24px)
  margin-bottom: spacing("xl"); // 2rem (32px)
}

// Using spacing utilities (available as classes)
// class="p-lg mb-xl"
```

### Breakpoints

```scss
// Responsive design
.component {
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  @include breakpoint-up("md") {
    grid-template-columns: repeat(2, 1fr);
  }

  @include breakpoint-up("lg") {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Buttons

```scss
// Using button mixins
.custom-button {
  @include button-primary("lg");

  // Custom modifications
  border-radius: border-radius("full");
  box-shadow: shadow("lg");
}

// Using pre-built button classes
// class="btn btn--secondary btn--lg"
```

### Layout

```scss
// Using layout mixins
.container {
  @include container; // Responsive container
  @include section-spacing; // Standard section spacing
}

.flex-layout {
  @include flex-center; // Centered flex layout
}

.grid-layout {
  @include grid-responsive(1, 2, 3, 4); // Responsive grid: 1->2->3->4 cols
}
```

## 🎯 BEM Methodology Examples

### Component Structure

```scss
// Block
.card {
  @include card;

  // Element
  &__header {
    @include card-body;
    border-bottom: border-width("thin") solid color("neutral", "light");
  }

  &__body {
    @include card-body;
  }

  &__footer {
    @include card-body;
    background-color: color("neutral", "lightest");
  }

  // Modifier
  &--elevated {
    box-shadow: shadow("lg");
  }

  &--compact {
    .card__body {
      padding: spacing("sm");
    }
  }
}
```

### Usage in React

```tsx
// Card.tsx
import styles from "./Card.module.scss";

interface CardProps {
  elevated?: boolean;
  compact?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ elevated, compact, children }) => {
  const cardClasses = [
    styles.card,
    elevated && styles["card--elevated"],
    compact && styles["card--compact"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses}>
      <div className={styles.card__header}>Header</div>
      <div className={styles.card__body}>{children}</div>
      <div className={styles.card__footer}>Footer</div>
    </div>
  );
};
```

## 🛠️ Utility Classes

### Available Utility Classes

```html
<!-- Spacing -->
<div class="p-lg m-xl">Padding large, margin extra large</div>
<div class="pt-sm pb-md">Padding top small, padding bottom medium</div>

<!-- Colors -->
<div class="bg--primary-base text--neutral-white">Primary background</div>
<div class="border--secondary-light">Secondary border</div>

<!-- Typography -->
<h1 class="heading--1">Main heading</h1>
<p class="body--2 text--center">Centered body text</p>

<!-- Display -->
<div class="d-flex flex--between">Flex with space-between</div>
<div class="d-grid grid--3 grid--gap-lg">3-column grid</div>

<!-- Responsive -->
<div class="d-none md:d-block">Hidden on mobile, visible on tablet+</div>
```

## 🎬 Animation Classes

```html
<!-- Animation utilities -->
<div class="animate--fade-in">Fades in on load</div>
<div class="animate--slide-up">Slides up on load</div>
<div class="animate--scale-in">Scales in on load</div>
```

## 📱 Responsive Utilities

```scss
// Responsive utilities follow this pattern:
.{breakpoint}\\:{property}--{value}

// Examples:
.sm\\:text--center    // Center text on sm+ screens
.md\\:flex--column    // Column direction on md+ screens
.lg\\:d-none          // Hide on lg+ screens
```

## 🔧 Customization

### Extending Colors

```scss
// In your _variables.scss
$custom-colors: (
  "brand": (
    "base": #ff6b6b,
    "light": #ff8e8e,
    "dark": #ff4757,
  ),
);

// Merge with existing colors
$colors: map-deep-merge($colors, $custom-colors);
```

### Custom Mixins

```scss
// Create custom mixins in your component files
@mixin special-button {
  @include button-base;
  background: linear-gradient(
    45deg,
    color("primary", "base"),
    color("secondary", "base")
  );

  &:hover {
    transform: scale(1.05);
  }
}
```

## ⚡ Performance Tips

1. **Import only what you need**: Import specific abstracts in component modules
2. **Use CSS custom properties**: For runtime theme switching
3. **Leverage utility classes**: For rapid prototyping and consistent spacing
4. **Follow BEM**: For maintainable and scalable stylesheets

## 🧪 Testing

### Testing Component Styles

```tsx
// Component.test.tsx
import { render } from "@testing-library/react";
import styles from "./Component.module.scss";

test("applies correct CSS classes", () => {
  const { container } = render(<Component variant="primary" size="lg" />);

  expect(container.firstChild).toHaveClass(
    styles.component,
    styles["component--primary"],
    styles["component--lg"]
  );
});
```

## 📚 Resources

- [BEM Methodology](http://getbem.com/)
- [SCSS Documentation](https://sass-lang.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Design Tokens](https://amzn.github.io/style-dictionary/)

---

This design system provides a solid foundation for the Metromellow website while maintaining consistency, scalability, and developer experience. The modular approach allows for easy maintenance and future enhancements.
