---
name: Systemic Clarity
colors:
  surface: "#f8f9ff"
  surface-dim: "#d8dae1"
  surface-bright: "#f8f9ff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f2f3fa"
  surface-container: "#eceef4"
  surface-container-high: "#e6e8ef"
  surface-container-highest: "#e0e2e9"
  on-surface: "#181c21"
  on-surface-variant: "#414751"
  inverse-surface: "#2d3136"
  inverse-on-surface: "#eff0f7"
  outline: "#717782"
  outline-variant: "#c0c7d3"
  surface-tint: "#0061a5"
  primary: "#005ea1"
  on-primary: "#ffffff"
  primary-container: "#2178c3"
  on-primary-container: "#fdfcff"
  inverse-primary: "#9fcaff"
  secondary: "#515f74"
  on-secondary: "#ffffff"
  secondary-container: "#d1e1fa"
  on-secondary-container: "#556479"
  tertiary: "#864f00"
  on-tertiary: "#ffffff"
  tertiary-container: "#a96400"
  on-tertiary-container: "#fffbff"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#d2e4ff"
  primary-fixed-dim: "#9fcaff"
  on-primary-fixed: "#001d37"
  on-primary-fixed-variant: "#00497e"
  secondary-fixed: "#d4e4fc"
  secondary-fixed-dim: "#b8c8e0"
  on-secondary-fixed: "#0d1c2e"
  on-secondary-fixed-variant: "#39485c"
  tertiary-fixed: "#ffdcbd"
  tertiary-fixed-dim: "#ffb86e"
  on-tertiary-fixed: "#2c1600"
  on-tertiary-fixed-variant: "#693c00"
  background: "#f8f9ff"
  on-background: "#181c21"
  surface-variant: "#e0e2e9"
typography:
  display:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: "700"
    lineHeight: "1.2"
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: "600"
    lineHeight: "1.33"
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: "600"
    lineHeight: "1.4"
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "600"
    lineHeight: "1.5"
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.5"
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: "1.5"
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: "500"
    lineHeight: "1.2"
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  2xl: 3rem
  gutter: 1.5rem
  sidebar_width: 280px
---

## Brand & Style

The design system is engineered for high-efficiency Document Management Systems (DMS). It prioritizes **Corporate Modernism**, focusing on reliability, structural integrity, and cognitive ease. The goal is to transform complex information hierarchies into a navigable, calm environment that minimizes user fatigue during extended sessions of data entry and document review.

The aesthetic is characterized by a "Clear-Canvas" approach: expansive white surfaces, crisp geometry, and a deliberate use of color only for functional signaling or brand presence. By leveraging a structured grid and subtle depth, the system ensures that the content—the documents and metadata—remains the primary focus.

**Key Principles:**

- **Predictability:** Consistent placement of functional elements.
- **Utility:** High information density without visual clutter.
- **Precision:** Alignment and spacing that suggest a rigorous, professional tool.

## Colors

The palette is rooted in the functional standards of professional software. It uses a hierarchy of grays to define spatial depth and a singular primary blue for core interactions.

- **Primary (Blue 500):** Used for primary actions, focus states, and active navigation indicators.
- **Backgrounds:** A tiered system using `Gray 50` for the application backdrop to provide contrast against `White` containers (cards, sidebars, and modals).
- **Semantics:** Success (Green), Warning (Orange), and Error (Red) are applied at a `500` weight to ensure WCAG AA compliance against white backgrounds.
- **Typography:** `Gray 800` provides high-contrast legibility for headers, while `Gray 600` reduces visual weight for long-form body text and metadata.

## Typography

The design system utilizes **Inter** for its exceptional legibility and neutral, systematic tone. It is optimized for screen reading with a generous x-height.

- **Headlines:** Use tighter letter spacing and heavier weights to anchor sections of the interface.
- **Body Text:** Standardized at `14px` for the majority of the UI to balance information density with readability.
- **Labels:** Uppercase labels are used sparingly for category headers or table column headers to create a clear visual distinction from data.
- **Mobile Scaling:** For mobile viewports, the `display` size should scale down to `28px` to prevent excessive wrapping.

## Layout & Spacing

The layout follows a **structured grid model** designed for dashboard environments.

- **Sidebar:** A fixed-width left navigation (`280px`) provides a persistent anchor for the application hierarchy.
- **Main Content:** A fluid area that uses a maximum container width of `1440px` for optimal line lengths, centered within the viewport.
- **The 8px Grid:** All margins, paddings, and component dimensions scale in increments of `4px` or `8px`.
- **Breakpoints:**
  - **Mobile (<768px):** Sidebar collapses into a hamburger menu; padding reduces to `1rem`.
  - **Tablet (768px - 1024px):** Sidebar may collapse to an icon-only "rail" view.
  - **Desktop (>1024px):** Standard 12-column grid with `1.5rem` gutters.

## Elevation & Depth

This design system uses **Tonal Layering** combined with **Ambient Shadows** to establish hierarchy.

- **Level 0 (Background):** `Gray 50`. Used for the lowest application layer.
- **Level 1 (Cards/Sidebar):** `White` surface with a subtle shadow (`boxShadow="md"`). This creates a clear physical distinction for interactive containers.
- **Level 2 (Dropdowns/Modals):** `White` surface with a more pronounced, diffused shadow to indicate temporary overlay status.
- **Outlines:** Use `Gray 200` for borders on inputs and table dividers to maintain structure without creating heavy visual noise.

## Shapes

The shape language is approachable yet professional. A consistent `borderRadius="lg"` (0.5rem) is applied to all major UI components to soften the "industrial" feel of a management system.

- **Primary Radius (8px):** Cards, input fields, and buttons.
- **Large Radius (12px - 24px):** Modals and large empty-state containers.
- **Inner Radius:** When nesting elements (e.g., a button inside a card), the inner radius should be slightly smaller (4px) to maintain visual nesting harmony.

## Components

### Buttons

- **Solid (Primary):** `Blue 500` background, white text. For the main action of a page.
- **Ghost (Navigation):** No background or border in default state. Used for sidebar items. On hover, apply `Gray 100`. On active, apply `Blue 50` background with `Blue 600` text.

### Tables

- **Structure:** `variant="simple"` with `Gray 100` borders.
- **Header:** `Gray 50` background, `Gray 800` bold text, uppercase `label-md` typography.
- **Rows:** Alternating "Zebra" striping is optional, but a subtle hover state (`Gray 50`) on rows is required for data tracking.

### Input Fields

- **Default:** `White` background, `Gray 200` border, `8px` corner radius.
- **Focus:** `Blue 500` border with a `2px` focus ring of `Blue 100`.

### Chips / Badges

- **Style:** Subtle filled (e.g., `Green 50` background with `Green 700` text).
- **Shape:** Full rounded (pill-shaped) to distinguish them from clickable buttons.

### Cards

- **Style:** `White` background, `1px` border of `Gray 100`, and `boxShadow="md"`.
- **Padding:** Standard `1.5rem` (`lg`) padding for internal content alignment.
