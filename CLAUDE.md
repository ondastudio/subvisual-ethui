# Subvisual EthUI

## Tech Stack

- Astro (static site generator, outputs plain HTML)
- React/TSX for components
- Tailwind CSS v4 (CSS-first config in `src/styles/global.css`)
- Bun (package manager and runtime)
- TypeScript (strict mode)

## File Conventions

- Pages: `src/pages/*.astro` — each file becomes a route
- Layouts: `src/layouts/*.astro` — page wrappers
- Components: `src/components/*.tsx` — React components
- Styles: `src/styles/global.css` — Tailwind config and global styles
- Static assets: `public/` — served as-is
- Images/fonts: `src/assets/` — processed by Astro

## Styling

- Use Tailwind classes exclusively — no hex values, no px values
- Design tokens are defined in `src/styles/global.css` under `@theme`
- Use token names (e.g. `text-primary`, `font-heading`) over raw values

## Components

- Before creating a new component, check `src/components/` for existing ones
- Follow existing naming patterns
- Use relative imports

## Working with Figma

When given a Figma URL:
1. Use the Figma MCP `get_design_context` to get the design
2. Check existing components in `src/components/` for reusable matches
3. Adapt the output to use project Tailwind tokens and existing components
4. Place new components in `src/components/` as `.tsx` files
5. Compose components into pages in `src/pages/` as `.astro` files
