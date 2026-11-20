---
name: Campus Pulse
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#009eb9'
  on-tertiary-container: '#002f38'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style
The design system powers an electric, fast-paced college campus life portal and social nexus. Geared toward mobile-first undergraduate and graduate students, student club organizers, and campus administrators, the experience channels nocturnal festival energy with refined modern tech precision. 

The aesthetic blends **Modern Dark Glassmorphism** with **Cyber Neon Accents**. Deep carbon surfaces allow punchy neon highlights—electric indigo, ultra-violet, and cyber cyan—to prioritize critical action items, dynamic status tags, and live event countdowns. Visuals feel fluid, kinetic, and immersive without sacrificing data clarity across complex schemas (events, multi-tiered registrations, ticket allocations). 

Atmospheric backdrops use subtle, high-diffusion spectral gradients that cast soft light behind frosted, semi-translucent interactive cards. The tone balances effortless student swagger with the operational rigor required for live check-ins and capacity tracking.

## Colors
The palette leverages a calibrated dark-mode hierarchy to maintain high contrast, low eye fatigue in dimly lit campus venues, and vivid chromatic signaling.

- **Primary (`#6366F1` - Electric Indigo):** Primary calls to action, active navigation states, selected segmented controls, and verified badges.
- **Secondary (`#8B5CF6` - Vibrant Violet):** Secondary triggers, promotional event highlights, organizer state indicators, and gradient endpoints.
- **Tertiary (`#06B6D4` - Cyber Cyan):** Live attendance pings, live ticket capacity metrics, endpoint badges (`REST GET/POST`), and dynamic role highlights.
- **Neutral Surface Canvas (`#090D16` - Deep Obsidian):** Root background, providing high tonal separation for floating glass sheets.
- **Functional Semantics:**
  - Success/Live: Emerald Mint (`#10B981`) for confirmed registrations and active QR scanners.
  - Warning/Capacity: Neon Amber (`#F59E0B`) for "Selling Fast" thresholds (<10% remaining).
  - Destructive/Alert: Hot Crimson (`#EF4444`) for sold-out banners, cancellations, and drop-request actions.

## Typography
The typographic system pairs three specialized typefaces to reinforce hierarchy, campus energy, and programmatic data authenticity:

1. **Display & Headings (Space Grotesk):** Provides structured geometric attitude, evoking youth culture and technical flair. Scaled aggressively down for compact mobile viewports without losing character.
2. **Body & Interface (Plus Jakarta Sans):** Highly legible, friendly grotesque with humanized curves, ensuring flawless readability for event details, bios, and descriptions at small scale.
3. **Data, Tags & REST Nodes (JetBrains Mono):** Monospaced technical typography applied to timestamps, capacity ratios (`capacity_left/total`), ticket IDs, REST route headers (`GET /api/me/registrations`), and mock role pickers.

## Layout & Spacing
The layout follows a strict mobile-first viewport architecture utilizing a fluid 4-column system on devices under 600px, expanding to 8 columns on tablets, and fixed-max fluid 12 columns on desktop (max width: 1200px).

- **Margins:** Standard mobile canvas boundary is locked to `1rem` (16px) to maximize touch target width while preventing edge clipping.
- **Rhythm:** An 8-point baseline governs vertical layout cadences, with half-steps (`0.25rem` / 4px) reserved for micro pill badges, icon-label offsets, and dense tabular data lists.
- **Sticky Top Bar:** Pinned mobile header contains identity, role dropdowns, and quick mock switcher, structured with horizontal scroll snapping for sub-categories (`All Events`, `My Passes`, `Host Controls`).

## Elevation & Depth
Depth relies on translucent surface stratification (frosted glass) paired with low-opacity cyber ambient glows rather than dense black shadows.

- **Level 0 (Canvas Base):** Solid `#090D16` with ambient background gradient blobs (`rgba(99, 102, 241, 0.12)` top-left, `rgba(6, 182, 212, 0.08)` bottom-right).
- **Level 1 (Subsurface / Muted Containers):** `rgba(255, 255, 255, 0.03)` with `border: 1px solid rgba(255, 255, 255, 0.06)`. Used for nested lists, tab bars, and inactive inputs.
- **Level 2 (Interactive Glass Cards):** `rgba(18, 24, 38, 0.70)` combined with `backdrop-filter: blur(16px)` and a subtle light-sheen border `1px solid rgba(255, 255, 255, 0.12)`. Casts a gentle tinted ambient shadow: `0 8px 32px 0 rgba(0, 0, 0, 0.45)`.
- **Level 3 (Modals, Overlays, Role Popovers):** `rgba(15, 23, 42, 0.88)` with `backdrop-filter: blur(24px)` and electric rim light `1px solid rgba(99, 102, 241, 0.35)`. Ambient aura: `0 12px 40px rgba(99, 102, 241, 0.20)`.
- **Level 4 (Active/Focus Rings):** Outward electric cyan or indigo glow: `0 0 0 2px #090D16, 0 0 16px 2px rgba(6, 182, 212, 0.6)`.

## Shapes
The shape hierarchy emphasizes soft curvature combined with strict pill elements for high-density statuses:

- **Base Cards & Modules:** `rounded` (0.5rem / 8px) to `rounded-lg` (1rem / 16px) for cards, dialog sheets, and input fields.
- **Pill Primitives:** Fully rounded (`9999px`) dedicated exclusively to dynamic chips, role switches, capacity counters, date ribbons, and quick-action trigger buttons.
- **Inner Nested Elements:** Always 4px tighter than their parent wrapper to preserve visual concentricity.

## Components

### Header Role & Mock User Switcher
- **Dual Segment/Dropdown Pill:** Positioned in top-right or center header. Displayed as a frosted capsule (`rgba(255, 255, 255, 0.08)`) split into two triggers:
  1. *Role Pill:* Displays an icon + monospaced role tag (`STUDENT`, `ORGANIZER`, `ADMIN`). On tap, opens a blur-backed sheet to hot-swap permission contexts.
  2. *User Switcher Dropdown:* Compact avatar with chevron + monospaced mock user key (`usr_9021`), triggering an instant switch between database records (`alex.student`, `sarah.lead`, `dean.admin`).
- Shows subtle REST endpoint chips alongside active queries: `GET /api/me/registrations` when in Student mode; `/api/events/{id}/registrations` when Organizer is active.

### Buttons
- **Primary Glow:** Gradient fill from primary to secondary (`#6366F1` to `#8B5CF6`), text pure white, with a soft neon bottom glow. Height 48px on mobile for generous touch affordance.
- **Secondary Glass:** Frosted background `rgba(255, 255, 255, 0.06)`, white text, thin perimeter border `rgba(255, 255, 255, 0.15)`.
- **Icon Actions:** 40x40px frosted circles with centered micro-icons (bookmarks, QR trigger, filters).

### Badges & Pill Chips
- **Status Pills:** Monospaced label-sm text encased in dynamic tint badges:
  - *Confirmed / Active:* Background `rgba(16, 185, 129, 0.15)`, text `#10B981`, border `rgba(16, 185, 129, 0.3)`.
  - *Waitlist / Low Cap:* Background `rgba(245, 158, 11, 0.15)`, text `#F59E0B`, border `rgba(245, 158, 11, 0.3)`.
  - *Admin Mode:* Background `rgba(6, 182, 212, 0.15)`, text `#06B6D4`, border `rgba(6, 182, 212, 0.3)`.
- **Endpoint Badge:** Dark capsule with monospace label displaying HTTP method and endpoint root in `label-sm`.

### Event & Registration Cards
- Frosted glass body with a 16:9 media slot crowned by a glass date-ribbon badge.
- Metadata layout adheres to the underlying entity mapping: `title`, `datetime`, `venue_location`, `registered_count / max_capacity` visual progress rail.
- Quick-action footer contains single-tap "RSVP" or "Scan Ticket" based on active role context.

### Form Inputs & Checkboxes
- **Input Fields:** Dark translucent wells (`rgba(0, 0, 0, 0.40)`) with inset borders (`rgba(255, 255, 255, 0.1)`). Focus state transitions border to neon cyan with micro-glow.
- **Checkboxes & Radios:** 20px rounded squares (checkbox) or pills (radio), filled with indigo accent on checked state with a snappy micro-scale transition.