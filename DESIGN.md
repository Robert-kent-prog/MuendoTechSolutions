# Muendo Software Labs Design System

## 1. Typography
- **UI and Body**: System humanist sans (`ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`) for instant zero-CLS rendering on Kenyan mobile networks without web-font blocking.
- **Technical & Numeric Data**: Monospace (`font-mono`) with `tabular-nums` for invoice numbers, KES totals, quantities, and technical metadata so columns align cleanly during live edits and PDF printing.
- **Hierarchy**: Distinct weight and scale jumps (`text-xs uppercase tracking-[0.2em]` eyebrows, `text-4xl/5xl/6xl font-bold` page titles, `text-sm` body prose).

## 2. Palette Tokens (Defined in `src/styles.css`)
- **Dark Surface (Default)**: `--background: oklch(0.15 0.025 260)`, `--card: oklch(0.19 0.028 260)`, `--secondary: oklch(0.23 0.03 260)`.
- **Light Surface (`.light`)**: `--background: oklch(0.99 0.005 250)`, `--card: oklch(1 0 0)`, `--secondary: oklch(0.96 0.01 250)`.
- **Brand Primary**: Technical Cobalt `--primary: oklch(0.58 0.22 255)` (dark) / `oklch(0.5 0.2 260)` (light).
- **Accent**: Cyan `--accent: oklch(0.7 0.18 220)` (dark) / `oklch(0.52 0.2 220)` (light).
- **Print Document Surface**: Pure white (`#ffffff`) with deep slate ink (`#0f172a`) and muted gray secondary labels (`#475569`) regardless of dark/light app theme, so the live preview matches the printed A4 PDF or 80mm receipt verbatim.

## 3. Layout Structure
- **Tools Directory (`/tools`)**: Search bar + category filter pills above a responsive 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) separating live tools from planned Phase 2/3 tools, followed by a service conversion banner.
- **Invoice Generator (`/tools/invoice-generator`)**: Sticky action toolbar (paper format switcher A4 vs 80mm, Print/Save PDF, Add item, New document) above a 5/7 asymmetric split workbench: scrollable structured form on the left, real-time WYSIWYG paper sheet preview on the right (stacked cleanly on mobile with a quick toggle/jump).

## 4. Motion Policy
- **What moves**: Subtle `150ms-200ms` color/border hover transitions, chevron rotation on accordions, and focus rings.
- **What stays still**: Paper preview sheet, form controls, numeric totals (no bouncy or staggered entrances).
- **Accessibility**: `@media (prefers-reduced-motion: reduce)` disables animations and transitions globally.

## 5. Signature Element
- **True WYSIWYG Dual-Format Paper Sheet Preview**: The live preview switches directly between a proportional A4 business invoice (with Muendo Software Labs defaults, Kenyan 16% VAT breakdown, M-Pesa payment block, and automatic KES amount-in-words) and an authentic 80mm thermal POS receipt, and prints directly via `@media print` with zero chrome.
