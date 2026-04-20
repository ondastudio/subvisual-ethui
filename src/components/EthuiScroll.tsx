import { useEffect, useRef, useState } from "react";

// Slide 0: Iron only (before rebrand)
const IMG_IRON_MARK_0 =
	"https://www.figma.com/api/mcp/asset/3cf053bc-d2a8-4797-8253-184258288d12";
const IMG_IRON_WORDMARK_0 =
	"https://www.figma.com/api/mcp/asset/b03481dc-bc6d-4d17-a508-b4c6380080b3";

// Slide 1: Both logos (after rebrand)
const IMG_IRON_MARK_1 =
	"https://www.figma.com/api/mcp/asset/f5d0a438-0d14-470e-b068-a0417976f2bb";
const IMG_IRON_WORDMARK_1 =
	"https://www.figma.com/api/mcp/asset/75d4ba7c-1c17-4bc0-bf28-5743e826f9d2";
const IMG_ETHUI_MONOGRAM =
	"https://www.figma.com/api/mcp/asset/68332fe1-4efb-4800-97c3-27a95029234b";

// Slides 3 & 4: Block explorer
const IMG_EXPLORER_WITH_TEXT =
	"https://www.figma.com/api/mcp/asset/1e3d36d5-06e2-4eda-a5c0-1ca357c5b0fb";
const IMG_EXPLORER_FULL =
	"https://www.figma.com/api/mcp/asset/26d3da1e-4ae6-4184-9101-68ce85ccec57";

// Slides 5 & 6: Stacks
const IMG_STACKS_WITH_TEXT =
	"https://www.figma.com/api/mcp/asset/1c0a7f4d-64a1-42c2-80a6-f215af033c1f";
const IMG_STACKS_FULL =
	"https://www.figma.com/api/mcp/asset/6c3c6354-8cc1-40e3-8bc2-281920009e5d";

// Stacks feature cards preview
const IMG_STACKS_PREVIEW =
	"https://www.figma.com/api/mcp/asset/96923f64-3294-4ac1-a41e-251c35145a60";

const slides = [
	{ label: "Milestone", heading: "Iron → ethui" },
	{ label: "Milestone", heading: "Iron → ethui" },
	{ label: "Design", heading: "Ripping out the\nframework" },
	{ label: "Product", heading: "A local-first block\nexplorer for Anvil" },
	{ label: "Design", heading: "A local-first block\nexplorer for Anvil" },
	{ label: "Product", heading: "One-click Ethereum\ntestnets with Stacks" },
	{ label: "Product", heading: "One-click Ethereum\ntestnets with Stacks" },
	{ label: "Business", heading: "What this says\nabout Subvisual" },
	{ label: "Results", heading: "What this says\nabout Subvisual" },
	{ label: "FAQ", heading: "Frequently asked\nquestions" },
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

const faqItems = [
	{
		q: "What is ethui?",
		a: "ethui is an open-source, desktop-native Ethereum developer toolkit built with Tauri (Rust + React). It provides a Foundry-aware wallet, a local block explorer, contract ABI detection, account impersonation, and one-click cloud testnets via Stacks. It is built and maintained by Subvisual.",
	},
	{
		q: "How is ethui different from MetaMask?",
		a: "MetaMask is a browser-extension wallet designed for end users interacting with live chains. ethui is a desktop application designed for developers working with local Foundry/Anvil environments. ethui monitors your filesystem, detects contract deploys automatically, matches bytecode to ABIs without manual verification, and supports developer-specific features like account impersonation and fast mode.",
	},
	{
		q: "Does ethui work with Foundry and Anvil?",
		a: "Yes. ethui is built specifically for Foundry workflows. It syncs with Anvil nodes in real time, watches your forge output directory for compiled contracts, and uses bytecode matching to automatically resolve ABIs for deployed contracts. All Anvil cheatcodes—including impersonation and balance setting—work natively.",
	},
	{
		q: "What is ethui Stacks?",
		a: "ethui Stacks is a self-hosted tool for creating persistent, cloud-based Anvil testnets. Each stack includes an Anvil node with a unique chain ID, an authenticated RPC URL, a connected block explorer, and a faucet. Stacks support mainnet forking and can be shared with a team via URL.",
	},
	{
		q: "Is ethui open source?",
		a: "Yes. ethui is fully open-source and available on GitHub at github.com/ethui/ethui. Contributions are welcome. The project originated at Subvisual and is maintained by Miguel Palhas (@naps62).",
		link: true,
	},
];

function IronLogo({
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

function EthuiLogo() {
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

function VideoPreview({ src, alt }: { src: string; alt: string }) {
	return (
		<div className="relative w-full rounded-md overflow-hidden">
			<img src={src} alt={alt} className="w-full object-cover rounded-md" />
			<button
				type="button"
				className="absolute inset-0 flex items-center justify-center"
				aria-label="Play video"
			>
				<div className="bg-dark rounded-full size-12 flex items-center justify-center">
					<svg
						className="size-6 text-white ml-0.5"
						viewBox="0 0 24 24"
						fill="currentColor"
						aria-hidden="true"
					>
						<path d="M8 5v14l11-7z" />
					</svg>
				</div>
			</button>
		</div>
	);
}

function FeatureCard({
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

export default function EthuiScroll() {
	const [activeSlide, setActiveSlide] = useState(0);
	const [productNumVisible, setProductNumVisible] = useState(1);
	const [resultsNumVisible, setResultsNumVisible] = useState(1);

	// sentinels 0-5: original EthuiScroll slide transitions
	// sentinel 6: after product stacking cards → Business (slide 7)
	// sentinel 7: after business quote → Results (slide 8)
	// sentinel 8: after results stacking cards → FAQ (slide 9)
	const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
	const productZoneRef = useRef<HTMLDivElement>(null);
	const resultsZoneRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function onScroll() {
			// Left panel cross-fade
			let active = 0;
			sentinelRefs.current.forEach((el, i) => {
				if (!el) return;
				const rect = el.getBoundingClientRect();
				if (rect.top <= window.innerHeight * 0.5) active = i + 1;
			});
			setActiveSlide(active);

			// Product stacking cards
			if (productZoneRef.current) {
				const rect = productZoneRef.current.getBoundingClientRect();
				const scrolledPast = Math.max(0, 16 - rect.top);
				const extraPerCard = window.innerHeight * 0.8;
				setProductNumVisible(
					Math.min(
						productCards.length,
						Math.floor(scrolledPast / extraPerCard) + 1,
					),
				);
			}

			// Results stacking cards
			if (resultsZoneRef.current) {
				const rect = resultsZoneRef.current.getBoundingClientRect();
				const scrolledPast = Math.max(0, 16 - rect.top);
				const extraPerCard = window.innerHeight * 0.8;
				setResultsNumVisible(
					Math.min(
						resultsCards.length,
						Math.floor(scrolledPast / extraPerCard) + 1,
					),
				);
			}
		}

		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<section className="px-20 py-4 bg-white">
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
								className="text-h2 tracking-h2 font-body font-normal text-right text-dark"
								style={{ whiteSpace: "pre-line" }}
							>
								{slide.heading}
							</h2>
						</div>
					))}
				</div>

				{/* Right — normal scroll */}
				<div className="w-[calc(50%-4px)] flex flex-col">
					{/* Slide 0: Iron → ethui — body text + Iron logo + pending arrow */}
					<div className="min-h-screen flex flex-col justify-center gap-8 px-10 py-8">
						<p className="text-body-md text-dark leading-[1.25]">
							The project started as Iron. Then a cease-and-desist landed. The
							rebrand to ethui was quick—the name fits better anyway. "eth" plus
							"ui." It says what it is.
						</p>
						<div className="flex flex-col items-center gap-6">
							<IronLogo
								markSrc={IMG_IRON_MARK_0}
								wordmarkSrc={IMG_IRON_WORDMARK_0}
							/>
							<span className="text-[6rem] leading-none text-dark tracking-[-0.12rem] font-body font-normal">
								↓
							</span>
						</div>
					</div>

					{/* Sentinel 0 → 1 */}
					<div
						ref={(el) => {
							sentinelRefs.current[0] = el;
						}}
					/>

					{/* Slide 1: Iron → ethui — both logos */}
					<div className="min-h-screen flex flex-col justify-center items-center gap-6 px-10 py-8">
						<IronLogo
							markSrc={IMG_IRON_MARK_1}
							wordmarkSrc={IMG_IRON_WORDMARK_1}
						/>
						<span className="text-[6rem] leading-none text-dark tracking-[-0.12rem] font-body font-normal">
							↓
						</span>
						<EthuiLogo />
					</div>

					{/* Sentinel 1 → 2 */}
					<div
						ref={(el) => {
							sentinelRefs.current[1] = el;
						}}
					/>

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
					<div
						ref={(el) => {
							sentinelRefs.current[2] = el;
						}}
					/>

					{/* Slide 3: Block explorer — text + preview */}
					<div className="min-h-screen flex flex-col justify-center gap-8 px-10 py-8">
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
						<VideoPreview
							src={IMG_EXPLORER_WITH_TEXT}
							alt="ethui block explorer demo"
						/>
					</div>

					{/* Sentinel 3 → 4 */}
					<div
						ref={(el) => {
							sentinelRefs.current[3] = el;
						}}
					/>

					{/* Slide 4: Block explorer — video full */}
					<div className="min-h-screen flex items-center px-10 py-8">
						<VideoPreview
							src={IMG_EXPLORER_FULL}
							alt="ethui block explorer demo"
						/>
					</div>

					{/* Sentinel 4 → 5 */}
					<div
						ref={(el) => {
							sentinelRefs.current[4] = el;
						}}
					/>

					{/* Slide 5: Stacks — text + preview */}
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
						<VideoPreview src={IMG_STACKS_WITH_TEXT} alt="ethui Stacks demo" />
					</div>

					{/* Sentinel 5 → 6 */}
					<div
						ref={(el) => {
							sentinelRefs.current[5] = el;
						}}
					/>

					{/* Slide 6: Stacks — video full */}
					<div className="min-h-screen flex items-center px-10 py-8">
						<VideoPreview src={IMG_STACKS_FULL} alt="ethui Stacks demo" />
					</div>

					{/* === PRODUCT STACKING CARDS ZONE (still slide 6 on left) === */}
					<div
						ref={productZoneRef}
						className="relative my-4"
						style={{
							height: `calc(100vh + ${(productCards.length - 1) * 80}vh - 2rem)`,
						}}
					>
						<div className="sticky top-4 h-[calc(100vh-2rem)] flex flex-col justify-center gap-4 px-10 overflow-hidden">
							<div className="relative w-full rounded-xl overflow-hidden shrink-0">
								<img
									src={IMG_STACKS_PREVIEW}
									alt="ethui Stacks features"
									className="w-full object-cover rounded-xl"
								/>
								<button
									type="button"
									className="absolute inset-0 flex items-center justify-center"
									aria-label="Play video"
								>
									<div className="bg-dark rounded-full size-12 flex items-center justify-center">
										<svg
											className="size-6 text-white ml-0.5"
											viewBox="0 0 24 24"
											fill="currentColor"
											aria-hidden="true"
										>
											<path d="M8 5v14l11-7z" />
										</svg>
									</div>
								</button>
							</div>
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

					{/* Sentinel 6 → 7 (Business) */}
					<div
						ref={(el) => {
							sentinelRefs.current[6] = el;
						}}
					/>

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

					{/* Sentinel 7 → 8 (Results) */}
					<div
						ref={(el) => {
							sentinelRefs.current[7] = el;
						}}
					/>

					{/* === RESULTS STACKING CARDS ZONE === */}
					<div
						ref={resultsZoneRef}
						className="relative my-4"
						style={{
							height: `calc(100vh + ${(resultsCards.length - 1) * 80}vh - 2rem)`,
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

					{/* Sentinel 8 → 9 (FAQ) */}
					<div
						ref={(el) => {
							sentinelRefs.current[8] = el;
						}}
					/>

					{/* Slide 9: FAQ */}
					<div className="px-10 py-8">
						<p className="text-body-xsm tracking-[0.08em] uppercase text-muted mb-6">
							FAQ's
						</p>
						<div className="flex flex-col">
							{faqItems.map((item, i) => (
								<div
									key={i}
									className="border-t border-border-secondary py-8 flex gap-6"
								>
									<span className="text-body-xsm uppercase text-muted w-6 shrink-0 pt-1">
										{String(i + 1).padStart(2, "0")}
									</span>
									<div className="flex flex-col gap-3 flex-1">
										<h3 className="text-h3 tracking-h3 font-heading font-normal text-dark">
											{item.q}
										</h3>
										<p
											className={`text-body-md text-dark leading-[1.25] ${
												item.link ? "underline" : ""
											}`}
										>
											{item.a}
										</p>
									</div>
								</div>
							))}
							<div className="border-t border-border-secondary" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
