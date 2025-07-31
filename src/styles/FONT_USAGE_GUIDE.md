# Metro Mellow Font Usage Guide

## 🎨 Font Strategy

**Baloo 2 (Primary)** - Used for headings, titles, and brand elements
**Montserrat (Secondary)** - Used for body text, UI elements, and readability

## 📝 Usage Patterns

### 1. Headings & Titles (Baloo 2)

Use Baloo 2 for all headings, titles, and brand elements to maintain the friendly, approachable brand personality.

```scss
// SCSS Mixins (Automatic)
.heading--1 {
  @include heading-1;
} // Uses Baloo 2
.heading--2 {
  @include heading-2;
} // Uses Baloo 2
.title {
  @include title;
} // Uses Baloo 2
```

```jsx
// Tailwind CSS
<h1 className="font-heading text-4xl font-bold">Welcome to Metro Mellow</h1>
<h2 className="font-baloo2 text-2xl font-semibold">Our Services</h2>
```

```scss
// CSS Classes
.brand-title {
  font-family: $font-family-heading; // Baloo 2
}
```

### 2. Body Text & UI Elements (Montserrat)

Use Montserrat for all body text, descriptions, form elements, and UI components for optimal readability.

```scss
// SCSS Mixins (Automatic)
.body--1 {
  @include body-1;
} // Uses Montserrat
.body--2 {
  @include body-2;
} // Uses Montserrat
.paragraph {
  @include paragraph;
} // Uses Montserrat
.caption {
  @include caption;
} // Uses Montserrat
```

```jsx
// Tailwind CSS
<p className="font-body text-lg">Professional home services tailored to your needs.</p>
<span className="font-montserrat text-sm">Form label text</span>
```

```scss
// CSS Classes
.description {
  @include font-secondary; // Montserrat
}
```

### 3. Buttons & Interactive Elements

Buttons automatically use Montserrat for better readability and professional appearance.

```scss
// Automatic in button mixins
@include button-primary; // Uses Montserrat
@include button-secondary; // Uses Montserrat
```

## 🎯 Component Examples

### Hero Section

```jsx
<section className="hero">
  <h1 className="font-heading text-6xl font-bold mb-4">
    Professional Home Services
  </h1>
  <p className="font-body text-xl mb-8">
    Experience the convenience of professional cleaning, cooking, and more.
  </p>
  <button className="btn-primary">Get Started Today</button>
</section>
```

### Service Card

```jsx
<div className="service-card">
  <h3 className="font-heading text-2xl font-semibold mb-2">
    Professional Cleaning
  </h3>
  <p className="font-body text-base mb-4">
    Comprehensive cleaning services for your home or office.
  </p>
  <span className="font-body text-sm text-gray-600">Starting from $50</span>
</div>
```

### Navigation

```jsx
<nav className="navbar">
  <div className="font-heading text-xl font-bold">Metro Mellow</div>
  <ul className="nav-links">
    <li>
      <a className="font-body">Services</a>
    </li>
    <li>
      <a className="font-body">About</a>
    </li>
    <li>
      <a className="font-body">Contact</a>
    </li>
  </ul>
</nav>
```

## 🔧 Utility Classes

### Tailwind CSS Classes

- `font-heading` - Baloo 2 for headings
- `font-body` - Montserrat for body text
- `font-baloo2` - Direct Baloo 2 access
- `font-montserrat` - Direct Montserrat access

### SCSS Classes

- `.font-heading` - Baloo 2 for headings
- `.font-body` - Montserrat for body text
- `.font-primary` - Baloo 2 (legacy)
- `.font-secondary` - Montserrat (legacy)

### SCSS Mixins

- `@include heading-1` through `@include heading-6` - Baloo 2 headings
- `@include body-1`, `@include body-2` - Montserrat body text
- `@include font-secondary` - Montserrat font family
- `@include button-primary`, `@include button-secondary` - Montserrat buttons

## 📊 Font Weights

### Baloo 2 (Headings) - Available Weights

- Regular (400) - Default headings
- Medium (500) - Subheadings
- SemiBold (600) - Important headings
- Bold (700) - Main headings
- ExtraBold (800) - Hero headings

### Montserrat (Body Text) - Available Weights

- Thin (100) - Ultra-light text, decorative elements
- ExtraLight (200) - Very light text, captions
- Light (300) - Light body text, captions
- Regular (400) - Default body text
- Medium (500) - Emphasized body text
- SemiBold (600) - Important body text, subheadings
- Bold (700) - Buttons, strong emphasis
- ExtraBold (800) - Very strong emphasis
- Black (900) - Maximum emphasis, hero text

## 🎨 Best Practices

1. **Consistency**: Always use the same font for the same type of content
2. **Hierarchy**: Use Baloo 2 for visual hierarchy, Montserrat for content
3. **Readability**: Montserrat excels at smaller sizes and longer text
4. **Branding**: Baloo 2 maintains the friendly, approachable brand personality
5. **Performance**: Both fonts are locally hosted for optimal loading

## 🔄 Migration Notes

- All existing heading mixins automatically use Baloo 2
- All existing body text mixins automatically use Montserrat
- Buttons automatically use Montserrat for better readability
- Legacy classes remain available for backward compatibility
