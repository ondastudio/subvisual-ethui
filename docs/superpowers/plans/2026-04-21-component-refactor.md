# Component Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split `EthuiScroll.tsx` into a subfolder with sub-components and a custom hook, extract `FundingLogos` from `Footer.tsx`, and delete `StackingFeaturesSection.tsx`.

**Architecture:** Pure file reorganisation — no behaviour or API changes. Both `EthuiScroll` and `Footer` gain `index.ts` re-exports so existing imports in `index.astro` remain unchanged.

**Tech Stack:** Astro, React/TSX, Tailwind CSS v4, Bun, Biome (lint/format)

---

## File Map

### Created
- `src/components/ethui-scroll/IronLogo.tsx`
- `src/components/ethui-scroll/EthuiLogo.tsx`
- `src/components/ethui-scroll/FeatureCard.tsx`
- `src/components/ethui-scroll/useEthuiScroll.ts`
- `src/components/ethui-scroll/EthuiScroll.tsx`
- `src/components/ethui-scroll/index.ts`
- `src/components/footer/FundingLogos.tsx`
- `src/components/footer/Footer.tsx`
- `src/components/footer/index.ts`

### Deleted
- `src/components/EthuiScroll.tsx`
- `src/components/Footer.tsx`
- `src/components/StackingFeaturesSection.tsx`

### Unchanged
- `src/pages/index.astro` — imports stay identical

---

## Task 1: Create `ethui-scroll/` sub-components

**Files:**
- Create: `src/components/ethui-scroll/IronLogo.tsx`
- Create: `src/components/ethui-scroll/EthuiLogo.tsx`
- Create: `src/components/ethui-scroll/FeatureCard.tsx`

- [ ] **Step 1: Create `IronLogo.tsx`**

```tsx
export function IronLogo({
	markSrc,
	wordmarkSrc,
}: {
	markSrc: string;
	wordmarkSrc: string;
}) {
	return (
		<div className="flex items-center gap-8">
			<div className="size-25 bg-[#161616] rounded-full flex items-center justify-center shrink-0">
				<img src={markSrc} alt="" className="size-16" />
			</div>
			<img src={wordmarkSrc} alt="IronWallet" className="h-11 w-auto" />
		</div>
	);
}
```

- [ ] **Step 2: Create `EthuiLogo.tsx`**

```tsx
const IMG_ETHUI_MONOGRAM =
	"https://www.figma.com/api/mcp/asset/68332fe1-4efb-4800-97c3-27a95029234b";

export function EthuiLogo() {
	return (
		<div className="flex items-center gap-6">
			<img src={IMG_ETHUI_MONOGRAM} alt="" className="size-24" />
			<span
				className="font-bold leading-none text-dark"
				style={{
					fontFamily: "'Source Code Pro', monospace",
					fontSize: "4.5rem",
					letterSpacing: "-0.14rem",
				}}
			>
				ethui
			</span>
		</div>
	);
}
```

- [ ] **Step 3: Create `FeatureCard.tsx`**

```tsx
export function FeatureCard({
	title,
	body,
	visible,
}: {
	title: string;
	body: string;
	visible: boolean;
}) {
	return (
		<div
			className={`bg-surface-page rounded-2xl p-10 flex flex-col gap-2 shrink-0 transition-all duration-700 ease-out ${
				visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
			}`}
		>
			<h3 className="text-h3 tracking-h3 font-body font-normal text-dark">
				{title}
			</h3>
			<p className="text-body-md text-dark leading-[1.25]">{body}</p>
		</div>
	);
}
```

- [ ] **Step 4: Verify lint passes**

Run: `npx biome check src/components/ethui-scroll/`
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add src/components/ethui-scroll/
git commit -m "feat: extract EthuiScroll sub-components into subfolder"
```

---

## Task 2: Create `useEthuiScroll` hook

**Files:**
- Create: `src/components/ethui-scroll/useEthuiScroll.ts`

- [ ] **Step 1: Create the hook**

```ts
import { useEffect, useRef, useState } from "react";

const productCardsLength = 3;
const resultsCardsLength = 2;

export function useEthuiScroll() {
	const [activeSlide, setActiveSlide] = useState(0);
	const [showText, setShowText] = useState(true);
	const [showEthui, setShowEthui] = useState(false);
	const [productNumVisible, setProductNumVisible] = useState(0);
	const [resultsNumVisible, setResultsNumVisible] = useState(1);

	const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
	const ironToEthuiRef = useRef<HTMLDivElement>(null);
	const productZoneRef = useRef<HTMLDivElement>(null);
	const resultsZoneRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function onScroll() {
			let active = 0;
			sentinelRefs.current.forEach((el, i) => {
				if (!el) return;
				const rect = el.getBoundingClientRect();
				if (rect.top <= window.innerHeight * 0.5) active = i + 1;
			});
			setActiveSlide(active);

			if (ironToEthuiRef.current) {
				const rect = ironToEthuiRef.current.getBoundingClientRect();
				const progress = Math.max(
					0,
					Math.min(1, -rect.top / (rect.height - window.innerHeight)),
				);
				setShowText(progress < 0.4);
				setShowEthui(progress > 0.65);
			}

			if (productZoneRef.current) {
				const rect = productZoneRef.current.getBoundingClientRect();
				const scrolledPast = Math.max(0, 16 - rect.top);
				const extraPerCard = window.innerHeight * 0.4;
				setProductNumVisible(
					Math.min(
						productCardsLength,
						Math.floor(scrolledPast / extraPerCard) + 1,
					),
				);
			}

			if (resultsZoneRef.current) {
				const rect = resultsZoneRef.current.getBoundingClientRect();
				const scrolledPast = Math.max(0, 16 - rect.top);
				const extraPerCard = window.innerHeight * 0.4;
				setResultsNumVisible(
					Math.min(
						resultsCardsLength,
						Math.floor(scrolledPast / extraPerCard) + 1,
					),
				);
			}
		}

		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return {
		activeSlide,
		showText,
		showEthui,
		productNumVisible,
		resultsNumVisible,
		sentinelRefs,
		ironToEthuiRef,
		productZoneRef,
		resultsZoneRef,
	};
}
```

- [ ] **Step 2: Verify lint passes**

Run: `npx biome check src/components/ethui-scroll/useEthuiScroll.ts`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ethui-scroll/useEthuiScroll.ts
git commit -m "feat: extract EthuiScroll scroll logic into useEthuiScroll hook"
```

---

## Task 3: Create `ethui-scroll/EthuiScroll.tsx` and `index.ts`

**Files:**
- Create: `src/components/ethui-scroll/EthuiScroll.tsx`
- Create: `src/components/ethui-scroll/index.ts`

- [ ] **Step 1: Create `EthuiScroll.tsx`**

```tsx
import arrowSvg from "../../assets/icons/arrow.svg";
import VideoPlayer from "../VideoPlayer";
import { EthuiLogo } from "./EthuiLogo";
import { FeatureCard } from "./FeatureCard";
import { IronLogo } from "./IronLogo";
import { useEthuiScroll } from "./useEthuiScroll";

const IMG_IRON_MARK_0 =
	"https://www.figma.com/api/mcp/asset/3cf053bc-d2a8-4797-8253-184258288d12";
const IMG_IRON_WORDMARK_0 =
	"https://www.figma.com/api/mcp/asset/b03481dc-bc6d-4d17-a508-b4c6380080b3";

const slides = [
	{ label: "Milestone", heading: "Iron → ethui" },
	{ label: "Milestone", heading: "Iron → ethui" },
	{ label: "Design", heading: "Ripping out the\nframework" },
	{ label: "Product", heading: "A local-first block\nexplorer for Anvil" },
	{ label: "Product", heading: "One-click Ethereum\ntestnets with Stacks" },
	{ label: "Business", heading: "What this says\nabout Subvisual" },
	{ label: "Results", heading: "What this says\nabout Subvisual" },
] as const;

const productCards = [
	{
		title: "Cloud persistence",
		body: "Your testnet survives machine restarts. Your team can connect from anywhere. Same cheatcodes, zero infrastructure.",
	},
	{
		title: "Built-in explorer",
		body: "Every stack gets a connected explorer. No separate setup, no Sourcify. Contract interaction works immediately.",
	},
	{
		title: "Subgraph support (WIP)",
		body: "Not just a testnet—the entire tech stack. Subgraph hosting is in progress, with the tricky bit being anvil reverts.",
	},
];

const resultsCards = [
	{
		title: "What we built",
		body: "A desktop-native Ethereum toolkit. A wallet that understands Foundry. An explorer that works locally. One-click testnet infrastructure. All open-source.",
	},
	{
		title: "What's next",
		body: "A fully featured explorer on a Reth execution extension. shadcn-style web3 UI primitives. Automated frontend testing against on-chain state—something still nearly impossible in web3.",
	},
];

export default function EthuiScroll() {
	const {
		activeSlide,
		showText,
		showEthui,
		productNumVisible,
		resultsNumVisible,
		sentinelRefs,
		ironToEthuiRef,
		productZoneRef,
		resultsZoneRef,
	} = useEthuiScroll();

	return (
		<section className="py-4 bg-white">
			<div className="flex gap-2 items-start">
				{/* Left — sticky, cross-fades between all slides */}
				<div className="sticky top-4 w-[calc(50%-4px)] h-[calc(100vh-2rem)] my-4 bg-surface-page rounded-2xl overflow-hidden flex flex-col items-end justify-center relative">
					{slides.map((slide, i) => (
						<div
							key={i}
							className={`absolute right-0 flex flex-col gap-6 items-end px-10 w-full transition-opacity duration-500 ease-in-out ${
								activeSlide === i ? "opacity-100" : "opacity-0"
							}`}
							aria-hidden={activeSlide !== i}
						>
							<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
								{slide.label}
							</span>
							<h2
								className="text-h2 tracking-h2 font-body font-normal text-right text-dark max-w-xl"
								style={{ whiteSpace: "pre-line" }}
							>
								{slide.heading.includes("→")
									? slide.heading
											.split("→")
											.flatMap((part, i, arr) =>
												i < arr.length - 1
													? [
															part,
															<img
																key={i}
																src={arrowSvg.src}
																alt="→"
																className="inline-block -rotate-90 h-[0.75em] w-auto align-middle mx-3"
															/>,
														]
													: [part],
											)
									: slide.heading}
							</h2>
						</div>
					))}
				</div>

				{/* Right — normal scroll */}
				<div className="w-[calc(50%-4px)] flex flex-col">
					{/* Iron → ethui: one Iron logo, text fades out, arrow + ethui fade in */}
					<div
						ref={ironToEthuiRef}
						className="relative"
						style={{ height: "300vh" }}
					>
						<div className="sticky top-0 h-screen flex items-center justify-center px-10 py-8">
							<div className="flex flex-col items-center gap-8">
								<p
									className={`text-body-md text-dark leading-[1.25] transition-opacity duration-700 ${
										showText ? "opacity-100" : "opacity-0"
									}`}
								>
									The project started as Iron. Then a cease-and-desist landed.
									The rebrand to ethui was quick—the name fits better anyway.
									"eth" plus "ui." It says what it is.
								</p>
								<IronLogo
									markSrc={IMG_IRON_MARK_0}
									wordmarkSrc={IMG_IRON_WORDMARK_0}
								/>
								<div
									className={`flex flex-col items-center gap-8 overflow-hidden transition-all duration-700 ${
										showEthui
											? "opacity-100 max-h-[400px]"
											: "opacity-0 max-h-0"
									}`}
								>
									<img src={arrowSvg.src} alt="" />
									<EthuiLogo />
								</div>
							</div>
						</div>
					</div>

					{/* Sentinel 0 → 1 */}
					<div ref={(el) => { sentinelRefs.current[0] = el; }} />

					{/* Sentinel 1 → 2 */}
					<div ref={(el) => { sentinelRefs.current[1] = el; }} />

					{/* Slide 2: Ripping out the framework */}
					<div className="min-h-screen flex items-center px-10 py-8">
						<div className="space-y-4 text-body-md text-dark leading-[1.25]">
							<p>
								By v1.13, Material UI was holding ethui back. The team migrated
								to a shadcn-based component library. Everything got
								cleaner—code, UI, and the developer experience of working on
								ethui itself. macOS-specific tweaks made it feel genuinely
								native.
							</p>
							<p>This wasn't just cosmetic.</p>
							<p>
								Moving away from Material UI meant the team could build new UI
								components much faster, without being constrained by an existing
								design system, and accelerate the next phase of the product.
							</p>
						</div>
					</div>

					{/* Sentinel 2 → 3 */}
					<div ref={(el) => { sentinelRefs.current[2] = el; }} />

					{/* Slide 3: Block explorer — text */}
					<div className="min-h-screen flex items-center px-10 py-8">
						<div className="space-y-4 text-body-md text-dark leading-[1.25]">
							<p>
								The ethui explorer is a local-first Ethereum block explorer
								purpose-built for Anvil nodes. Unlike Etherscan (live chains
								only) or Otterscan (complex setup, read-only), ethui's explorer
								gives you full read/write contract interaction out of the box.
							</p>
							<p>
								No verification step. No indexing backend. No Sourcify instance.
								Connect to any Anvil RPC, and your forge compilation outputs are
								your verification. It also works with any node supporting the
								ots_* namespace, including Erigon.
							</p>
						</div>
					</div>

					{/* Slide 3: Block explorer — video */}
					<div className="min-h-screen flex items-center px-10 py-8">
						<VideoPlayer className="w-full aspect-video rounded-md" />
					</div>

					{/* Sentinel 3 → 4 (Block Explorer → Stacks) */}
					<div ref={(el) => { sentinelRefs.current[3] = el; }} />

					{/* Slide 4: Stacks — text only */}
					<div className="min-h-screen flex flex-col justify-center gap-8 px-10 py-8">
						<div className="space-y-4 text-body-md text-dark leading-[1.25]">
							<p>
								ethui Stacks is a self-hosted tool for creating persistent,
								cloud-based Anvil testnets in one click. Every project at
								Subvisual needed the same thing: an Anvil node, a block
								explorer, a faucet. Stacks packages that into a single setup.
							</p>
							<p>
								Create a stack, get a persistent remote Anvil instance with a
								unique chain ID, authenticated RPC URL, and connected explorer.
								Fork Ethereum mainnet if you want. Share it with your team via a
								URL. All Anvil cheatcodes work—impersonation, balance setting,
								snapshots.
							</p>
						</div>
					</div>

					{/* Stacks — video */}
					<div className="min-h-screen flex items-center px-10 py-8">
						<VideoPlayer className="w-full aspect-video rounded-md" />
					</div>

					{/* Product stacking cards */}
					<div
						ref={productZoneRef}
						className="relative my-4"
						style={{
							height: `calc(100vh + ${productCards.length * 40}vh - 2rem)`,
						}}
					>
						<div className="sticky top-4 h-[calc(100vh-2rem)] flex flex-col justify-center gap-4 px-10 overflow-hidden">
							{productCards.map((card, i) => (
								<FeatureCard
									key={card.title}
									title={card.title}
									body={card.body}
									visible={productNumVisible > i}
								/>
							))}
						</div>
					</div>

					{/* Sentinel 4 → 5 (Business) */}
					<div ref={(el) => { sentinelRefs.current[4] = el; }} />

					{/* Slide 7: Business — text */}
					<div className="min-h-screen flex items-center px-10 py-8">
						<div className="space-y-4 text-body-md text-dark leading-[1.25]">
							<p>
								ethui isn't a client project. Nobody asked us to build it. It
								exists because our lead developer hit a wall and decided to fix
								it properly. That's the kind of team we are.
							</p>
							<p>
								When the tools aren't good enough, we build better ones. ethui
								powers our own workflow on every web3 project—from Quill and
								Orki to Brazos. Good developer tools should be shared.
							</p>
						</div>
					</div>

					{/* Slide 7 (continued): Business — quote */}
					<div className="min-h-screen flex flex-col justify-center px-10 py-8 gap-6">
						<blockquote className="text-h3 tracking-h3 font-heading font-normal text-dark">
							"This is the best thing I've ever built."
						</blockquote>
						<div className="flex flex-col gap-0.5">
							<span className="flex items-center gap-2 text-body-md font-heading text-dark">
								<span className="size-1.5 rounded-full bg-dark inline-block" />
								Miguel Palhas
							</span>
							<span className="text-body-md font-heading text-muted pl-4">
								Creator / Lead Dev
							</span>
						</div>
					</div>

					{/* Sentinel 5 → 6 (Results) */}
					<div ref={(el) => { sentinelRefs.current[5] = el; }} />

					{/* Results stacking cards */}
					<div
						ref={resultsZoneRef}
						className="relative my-4"
						style={{
							height: `calc(100vh + ${resultsCards.length * 40}vh - 2rem)`,
						}}
					>
						<div className="sticky top-4 h-[calc(100vh-2rem)] flex flex-col justify-center gap-4 px-10 overflow-hidden">
							{resultsCards.map((card, i) => (
								<FeatureCard
									key={card.title}
									title={card.title}
									body={card.body}
									visible={resultsNumVisible > i}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
```

- [ ] **Step 2: Create `index.ts`**

```ts
export { default } from "./EthuiScroll";
```

- [ ] **Step 3: Verify lint passes**

Run: `npx biome check src/components/ethui-scroll/`
Expected: no errors

- [ ] **Step 4: Delete the old file**

```bash
git rm src/components/EthuiScroll.tsx
```

- [ ] **Step 5: Update import in `src/pages/index.astro`**

Change:
```ts
import EthuiScroll from "../components/EthuiScroll";
```
To:
```ts
import EthuiScroll from "../components/ethui-scroll";
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ethui-scroll/ src/pages/index.astro
git commit -m "feat: move EthuiScroll into subfolder with index re-export"
```

---

## Task 4: Extract `FundingLogos` and reorganise `Footer`

**Files:**
- Create: `src/components/footer/FundingLogos.tsx`
- Create: `src/components/footer/Footer.tsx`
- Create: `src/components/footer/index.ts`
- Delete: `src/components/Footer.tsx`

- [ ] **Step 1: Create `FundingLogos.tsx`**

```tsx
import compete2030_1 from "../../assets/logos/compete2030-1.png";
import compete2030_2 from "../../assets/logos/compete2030-2.png";
import compete2030_3 from "../../assets/logos/compete2030-3.png";
import dribbbleSelectBadge from "../../assets/logos/dribbble-select-badge.svg";
import norte2020_1 from "../../assets/logos/norte2020-1.png";
import norte2020_2 from "../../assets/logos/norte2020-2.png";
import norte2020_3 from "../../assets/logos/norte2020-3.png";
import norte2020_4 from "../../assets/logos/norte2020-4.png";

const COMPETE_2030_URL =
	"https://drive.google.com/file/d/1Mh6DgXLfEEvk7d6vz3OvBGlJCHbvJlKF/view?usp=sharing";
const NORTE_2020_URL =
	"https://drive.google.com/file/d/1O017VWq7ztHDjBNKx4H3PR9bK4Pxi2gP/view";

export function FundingLogos() {
	return (
		<div className="flex flex-col gap-6">
			<a href={COMPETE_2030_URL} target="_blank" rel="noopener noreferrer">
				<div className="flex flex-wrap items-center gap-6">
					<img src={compete2030_1.src} alt="Compete 2030" className="h-8" />
					<img src={compete2030_2.src} alt="Portugal 2030" className="h-6" />
					<img
						src={compete2030_3.src}
						alt="Cofinanciado pela União Europeia"
						className="h-6"
					/>
				</div>
			</a>
			<a href={NORTE_2020_URL} target="_blank" rel="noopener noreferrer">
				<div className="flex flex-wrap items-center gap-6">
					<img src={norte2020_1.src} alt="Norte 2020" className="h-5" />
					<img src={norte2020_2.src} alt="Portugal 2020" className="h-5" />
					<img
						src={norte2020_3.src}
						alt="União Europeia - Fundos Estruturais"
						className="h-6"
					/>
					<img
						src={norte2020_4.src}
						alt="União Europeia - Fundo Europeu de Desenvolvimento Regional"
						className="h-6"
					/>
				</div>
			</a>
			<a
				href="https://dribbble.com/subvisual"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src={dribbbleSelectBadge.src} alt="Dribbble Select" className="h-8" />
			</a>
		</div>
	);
}
```

- [ ] **Step 2: Create `footer/Footer.tsx`**

```tsx
import arrowForwardIcon from "../../assets/icons/arrow-forward.svg";
import Link from "../Link";
import { FundingLogos } from "./FundingLogos";

const socialLinks = [
	{ label: "Linkedin", href: "https://linkedin.com/company/wearesubvisual" },
	{ label: "X (Twitter)", href: "https://x.com/subvisual" },
	{ label: "GitHub", href: "https://github.com/subvisual" },
	{ label: "Dribbble", href: "https://dribbble.com/subvisual" },
	{ label: "YouTube", href: "https://www.youtube.com/@wearesubvisual" },
];

type FooterProps = {
	theme?: "blue" | "purple" | "indigo";
};

const themeColors: Record<string, string> = {
	blue: "bg-blue-default",
	purple: "bg-purple-default",
	indigo: "bg-indigo-default",
};

const themeHoverColors: Record<string, string> = {
	blue: "hover:bg-blue-hover",
	purple: "hover:bg-purple-hover",
	indigo: "hover:bg-indigo-hover",
};

const MAILCHIMP_URL =
	"https://subvisual.us5.list-manage.com/subscribe/post?u=79f7816bac08905f81c1a8689&id=f8b8f31221";
const MAILCHIMP_HONEYPOT = "b_79f7816bac08905f81c1a8689_f8b8f31221";

export default function Footer({ theme = "blue" }: FooterProps) {
	const bgColor = themeColors[theme];
	const submitBg = `${themeColors[theme]} ${themeHoverColors[theme]}`;
	return (
		<footer className="max-w-[1920px] mx-auto w-full px-5 lg:px-4">
			<div
				id="footer-blue-box"
				className={`mt-0.5 ${bgColor} rounded-2xl px-6 lg:px-8 pt-10 lg:pt-15 pb-10 lg:pb-15 overflow-hidden`}
			>
				<div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-stretch lg:justify-between gap-10 lg:gap-8">
					{/* Left: tagline */}
					<div className="lg:w-110.25 shrink-0 flex flex-col">
						<p className="font-body text-h3 leading-h3 tracking-h3 text-white">
							We build products and the companies behind them.
						</p>
						<div className="hidden lg:block mt-auto">
							<p className="font-body text-body-md leading-body-md text-white">
								© Subvisual 2026
							</p>
							<p className="font-body text-body-md text-white mt-2">
								Shaped by{" "}
								<a
									href="https://www.ondastudio.co/"
									target="_blank"
									rel="noopener noreferrer"
									className="underline"
								>
									Onda
								</a>
							</p>
						</div>
					</div>

					{/* Right: links + email + funding logos */}
					<div className="flex flex-col gap-10 lg:gap-8 flex-1">
						<div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-8">
							<div className="flex gap-12">
								<div className="flex flex-col gap-6">
									<span className="font-body font-medium text-body-md text-white">
										Social
									</span>
									{socialLinks.map((link) => (
										<Link
											key={link.label}
											href={link.href}
											variant="inverted"
											target="_blank"
											rel="noopener noreferrer"
										>
											{link.label}
										</Link>
									))}
								</div>
								<div className="flex flex-col gap-6">
									<span className="font-body font-medium text-body-md text-white">
										Company
									</span>
									<Link
										href="https://jobs.subvisual.com/"
										variant="inverted"
										target="_blank"
										rel="noopener noreferrer"
									>
										Careers
									</Link>
								</div>
								<div className="flex flex-col gap-6">
									<span className="font-body font-medium text-body-md text-white">
										Legal
									</span>
									<Link
										href="https://subvisual.com/privacy"
										variant="inverted"
										target="_blank"
										rel="noopener noreferrer"
									>
										Privacy Policy
									</Link>
									<Link
										href="https://subvisual.com/terms"
										variant="inverted"
										target="_blank"
										rel="noopener noreferrer"
									>
										Terms
									</Link>
								</div>
							</div>

							<div className="order-first md:order-last flex flex-col gap-6 lg:w-77.75">
								<p className="font-body text-body-md text-white">
									Get occasional notes from the team and the Sandbox Playbook.
								</p>
								<form
									action={MAILCHIMP_URL}
									method="post"
									target="_blank"
									noValidate
									className="bg-white rounded-pill pl-6 pr-0.5 py-0.5 flex items-center"
									rel="noopener"
								>
									<input
										type="email"
										name="EMAIL"
										placeholder="Enter your email"
										aria-label="Email address"
										required
										className="flex-1 font-body text-body-md text-dark outline-none bg-transparent"
									/>
									<div
										style={{ position: "absolute", left: "-5000px" }}
										aria-hidden="true"
									>
										<input
											type="text"
											name={MAILCHIMP_HONEYPOT}
											tabIndex={-1}
											defaultValue=""
										/>
									</div>
									<button
										type="submit"
										aria-label="Subscribe"
										className={`size-12 rounded-full ${submitBg} flex items-center justify-center shrink-0 cursor-pointer transition-colors duration-200`}
									>
										<img
											src={arrowForwardIcon.src}
											alt="Submit"
											className="size-6 invert brightness-0"
										/>
									</button>
								</form>

								{/* Funding logos (desktop) */}
								<div className="hidden md:block">
									<FundingLogos />
								</div>
							</div>
						</div>

						{/* Funding logos (mobile) */}
						<div className="md:hidden">
							<FundingLogos />
						</div>
					</div>

					<div className="lg:hidden">
						<p className="font-body text-body-md leading-body-md text-white">
							© Subvisual 2026
						</p>
						<p className="font-body text-body-md text-white mt-2">
							Shaped by{" "}
							<a
								href="https://www.ondastudio.co/"
								target="_blank"
								rel="noopener noreferrer"
								className="underline"
							>
								Onda
							</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
```

- [ ] **Step 3: Create `footer/index.ts`**

```ts
export { default } from "./Footer";
```

- [ ] **Step 4: Verify lint passes**

Run: `npx biome check src/components/footer/`
Expected: no errors

- [ ] **Step 5: Update import in `src/pages/index.astro`**

Change:
```ts
import Footer from "../components/Footer";
```
To:
```ts
import Footer from "../components/footer";
```

- [ ] **Step 6: Delete old files and commit**

```bash
git rm src/components/Footer.tsx
git add src/components/footer/ src/pages/index.astro
git commit -m "feat: extract FundingLogos and move Footer into subfolder"
```

---

## Task 5: Delete `StackingFeaturesSection.tsx`

**Files:**
- Delete: `src/components/StackingFeaturesSection.tsx`

- [ ] **Step 1: Delete the file**

```bash
git rm src/components/StackingFeaturesSection.tsx
```

- [ ] **Step 2: Verify build passes**

Run: `npx astro build`
Expected: build completes with no errors

- [ ] **Step 3: Verify lint passes**

Run: `npx biome check .`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove unused StackingFeaturesSection"
```
