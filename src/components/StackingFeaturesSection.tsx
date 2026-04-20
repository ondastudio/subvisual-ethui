import { useEffect, useRef, useState } from "react";

const IMG_STACKS_PREVIEW =
	"https://www.figma.com/api/mcp/asset/96923f64-3294-4ac1-a41e-251c35145a60";

const leftPanelSlides = [
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

export default function StackingFeaturesSection() {
	const [activeSlide, setActiveSlide] = useState(0);
	const [productNumVisible, setProductNumVisible] = useState(1);
	const [resultsNumVisible, setResultsNumVisible] = useState(1);

	// sentinels[0] = Product → Business
	// sentinels[1] = Business → Results
	// sentinels[2] = Results → FAQ
	const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
	const productZoneRef = useRef<HTMLDivElement>(null);
	const resultsZoneRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function onScroll() {
			// Left panel cross-fade
			let slide = 0;
			sentinelRefs.current.forEach((el, i) => {
				if (!el) return;
				const rect = el.getBoundingClientRect();
				if (rect.top <= window.innerHeight * 0.5) slide = i + 1;
			});
			setActiveSlide(slide);

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
		<section className="bg-white px-20 py-4">
			<div className="flex gap-2 items-start">
				{/* LEFT — sticky grey panel, cross-fades across all slides */}
				<div className="sticky top-4 w-[calc(50%-4px)] h-[calc(100vh-2rem)] my-4 bg-surface-page rounded-2xl overflow-hidden flex flex-col items-end justify-center relative">
					{leftPanelSlides.map((slide, i) => (
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

				{/* RIGHT — all scrolling content */}
				<div className="w-[calc(50%-4px)] flex flex-col">
					{/* === PRODUCT ZONE: stacking cards === */}
					<div
						ref={productZoneRef}
						className="relative my-4"
						style={{
							height: `calc(100vh + ${(productCards.length - 1) * 80}vh - 2rem)`,
						}}
					>
						<div className="sticky top-4 h-[calc(100vh-2rem)] flex flex-col justify-center gap-4 px-10 overflow-hidden">
							{/* Video preview */}
							<div className="relative w-full rounded-xl overflow-hidden shrink-0">
								<img
									src={IMG_STACKS_PREVIEW}
									alt="ethui Stacks demo"
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

							{/* Stacking cards */}
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

					{/* Sentinel: Product → Business */}
					<div
						ref={(el) => {
							sentinelRefs.current[0] = el;
						}}
					/>

					{/* === BUSINESS SECTION === */}
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

					{/* Sentinel: Business → Results */}
					<div
						ref={(el) => {
							sentinelRefs.current[1] = el;
						}}
					/>

					{/* === RESULTS ZONE: stacking cards === */}
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

					{/* Sentinel: Results → FAQ */}
					<div
						ref={(el) => {
							sentinelRefs.current[2] = el;
						}}
					/>

					{/* === FAQ SECTION === */}
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
