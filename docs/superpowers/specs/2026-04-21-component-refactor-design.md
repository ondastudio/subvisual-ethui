# Component Refactor Design

**Date:** 2026-04-21
**Scope:** Code organisation — no behaviour changes

## Problem

Three issues identified in the codebase:

1. `EthuiScroll.tsx` is 442 lines. It embeds three private sub-components (`IronLogo`, `EthuiLogo`, `FeatureCard`) and a scroll `useEffect` handling 4 separate concerns, all in one file.
2. `Footer.tsx` is 328 lines. The funding logos block (Compete 2030, Norte 2020, Dribbble badge) is copy-pasted twice — once for desktop, once for mobile.
3. `StackingFeaturesSection.tsx` is never imported anywhere. Dead code.

## Approach

Subfolder extraction with a custom hook for scroll logic (Option A).

## File Structure

### `src/components/ethui-scroll/`

| File | Responsibility |
|------|---------------|
| `IronLogo.tsx` | Iron logo mark + wordmark display component |
| `EthuiLogo.tsx` | ethui monogram + wordmark display component |
| `FeatureCard.tsx` | Animated card used in product and results stacking zones |
| `useEthuiScroll.ts` | Custom hook — single `useEffect` with 4 scroll concerns; returns `activeSlide`, `showText`, `showEthui`, `productNumVisible`, `resultsNumVisible` |
| `EthuiScroll.tsx` | Main component — layout/JSX only, consumes hook and sub-components |
| `index.ts` | Re-exports `EthuiScroll` as default — existing import in `index.astro` unchanged |

### `src/components/footer/`

| File | Responsibility |
|------|---------------|
| `FundingLogos.tsx` | Compete 2030 / Norte 2020 / Dribbble badge block |
| `Footer.tsx` | Main footer — imports `FundingLogos` in both desktop and mobile slots |
| `index.ts` | Re-exports `Footer` as default — existing import in `index.astro` unchanged |

### Deletion

- `src/components/StackingFeaturesSection.tsx` — removed (dead code, never imported)

## Constraints

- No behaviour changes
- No API changes to either component
- Imports in `index.astro` remain identical (both subfolders have `index.ts` re-exports)
- All Tailwind classes, scroll logic, and data stay exactly as-is — this is purely a file organisation change
