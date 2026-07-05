---
name: SSWMS Precision Interface
colors:
  surface: '#f6fafc'
  surface-dim: '#d6dbdd'
  surface-bright: '#f6fafc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f4f6'
  surface-container: '#eaeef1'
  surface-container-high: '#e4e9eb'
  surface-container-highest: '#dfe3e5'
  on-surface: '#171c1e'
  on-surface-variant: '#3e484c'
  inverse-surface: '#2c3133'
  inverse-on-surface: '#edf1f3'
  outline: '#6e797d'
  outline-variant: '#bdc8cd'
  surface-tint: '#00677d'
  primary: '#00677d'
  on-primary: '#ffffff'
  primary-container: '#49afcc'
  on-primary-container: '#003f4d'
  inverse-primary: '#72d3f1'
  secondary: '#42636f'
  on-secondary: '#ffffff'
  secondary-container: '#c5e8f6'
  on-secondary-container: '#486975'
  tertiary: '#794d8f'
  on-tertiary: '#ffffff'
  tertiary-container: '#c190d8'
  on-tertiary-container: '#502666'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b3ebff'
  primary-fixed-dim: '#72d3f1'
  on-primary-fixed: '#001f27'
  on-primary-fixed-variant: '#004e5f'
  secondary-fixed: '#c5e8f6'
  secondary-fixed-dim: '#aaccd9'
  on-secondary-fixed: '#001f28'
  on-secondary-fixed-variant: '#2a4b56'
  tertiary-fixed: '#f6d9ff'
  tertiary-fixed-dim: '#e7b4fe'
  on-tertiary-fixed: '#300347'
  on-tertiary-fixed-variant: '#5f3575'
  background: '#f6fafc'
  on-background: '#171c1e'
  surface-variant: '#dfe3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-xs:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  sidebar-width: 240px
  sidebar-collapsed: 64px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 24px
  stack-compact: 4px
  stack-default: 12px
---

# SSWMS Precision Interface

## Brand & Style

The brand personality is rooted in **Operational Intelligence**. This design system bridges the gap between industrial utility and high-end software-as-a-service. It prioritizes clarity, efficiency, and reliability, ensuring that warehouse managers and operators can process high-density data without cognitive fatigue.

The visual style is **Corporate / Modern** with a lean toward **Functional Minimalism**. It uses a "flat-plus" approach: primarily flat surfaces defined by refined borders, using subtle tonal shifts instead of heavy shadows to denote hierarchy. The aesthetic is crisp and systematic, echoing the organized nature of a well-managed warehouse.

## Colors

The palette is engineered for a data-heavy enterprise environment.

- **Primary Cyan** is used for core actions, focus states, and progress indicators, symbolizing the "flow" of goods.
- **Secondary Blue-Grey** provides a stable, professional foundation for navigation and structural elements.
- **Tertiary Purple** is reserved exclusively for "Smart" features, such as AI-driven inventory forecasting or automated restocking suggestions, creating a distinct visual mental model for machine-assisted decisions.
- **Neutral Greys** are used for secondary text and borders to maintain a low-noise interface.
- **Status Colors** use standard semantic mappings to ensure immediate recognition of warehouse alerts and inventory health.

## Typography

Inter is the workhorse of this design system, chosen for its exceptional legibility in data tables and small-scale UI labels.

- **Data Tables:** Use `body-sm` for standard rows to maximize information density.
- **SKUs and Serial Numbers:** Use a monospaced alternative, JetBrains Mono, for numerical strings to ensure character alignment and prevent reading errors.
- **Hierarchy:** Use `label-xs` for table headers and section overviews to provide clear categorization without competing with the primary data points.

## Layout & Spacing

The layout follows a **Hybrid Grid** model optimized for wide-screen desktop usage, typical in logistics hubs.

- **Sidebar:** A collapsible left-hand navigation allows for quick switching between modules such as Inventory, Shipping, and Analytics.
- **Top Bar:** Contains breadcrumbs for deep-nested navigation, for example Warehouse A > Row 4 > Bin 12, and global search.
- **Density:** The system uses a "Compact" spacing rhythm. Vertical padding in tables and lists is minimized to reduce scrolling when managing long manifests.
- **Desktop (1280px+):** 12-column grid, persistent sidebar.
- **Tablet (768px - 1279px):** 8-column grid, collapsed sidebar with icons only.
- **Mobile (Below 768px):** Single column, bottom-sheet navigation for scanning actions.

## Elevation & Depth

This design system avoids high-elevation shadows to maintain a clean, pluggable feel.

- **Borders over Shadows:** Depth is primarily established using 1px borders in `#E2E8F0`.
- **Z-Index Layering:** Only critical overlays, such as modals and dropdowns, use a soft 12% opacity neutral shadow to lift them from the working surface.
- **Level 0 (Background):** Light grey `#F8FAFB`.
- **Level 1 (Cards/Tables):** Pure white `#FFFFFF`.
- **Level 2 (Active/Hover):** Primary tint 5% or subtle neutral grey.

## Shapes

The shape language is **Soft**. A 4px (`0.25rem`) base radius is applied to most UI components. This provides a modern, approachable feel while maintaining the professional structure required for an enterprise tool. Buttons and input fields use this consistent rounding, while status pills may use `rounded-xl` for a distinct badge appearance.

## Components

- **Buttons:** Primary buttons use a solid fill of the primary cyan. Secondary buttons use a ghost style with the secondary blue-grey border. AI-action buttons use the tertiary purple with a subtle gradient.
- **Status Badges:** Use a pill shape with a low-opacity background of the status color and a high-contrast text label, for example green text on a light green background for "In Stock".
- **Data Tables:** Rows should have a subtle hover state. Columns containing quantities should be right-aligned for easy comparison. Action buttons in tables should be icon-only to save horizontal space.
- **Cards:** Dashboard widgets use a simple 1px border. They should include a header area with a drag handle icon for customizable layouts.
- **Inputs:** Form fields use a standard 1px border that thickens to 2px in the primary color upon focus. Labels are consistently placed above the field in `label-md` style.
- **Collapsible Sidebar:** Use high-contrast icons for primary modules, with nested text labels that disappear when the sidebar is minimized to icon mode.
