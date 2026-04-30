import { useEffect, useRef, useState } from "react";
import VideoPlayer from "../VideoPlayer";
import { FeatureCard } from "./FeatureCard";

function ScrollRevealFeatureCard({
	title,
	body,
}: {
	title: string;
	body: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					obs.disconnect();
				}
			},
			{ threshold: 0.2 },
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, []);

	return (
		<div ref={ref}>
			<FeatureCard title={title} body={body} visible={visible} />
		</div>
	);
}

const slides = [
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

export default function EthuiScrollContinued() {
	const [activeSlide, setActiveSlide] = useState(0);
	const [productNumVisible, setProductNumVisible] = useState(0);
	const [resultsNumVisible, setResultsNumVisible] = useState(1);

	const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
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

			if (productZoneRef.current) {
				const rect = productZoneRef.current.getBoundingClientRect();
				const scrolledPast = Math.max(0, 16 - rect.top);
				const extraPerCard = window.innerHeight * 0.4;
				setProductNumVisible(
					Math.min(
						productCards.length,
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
		<section className="bg-white">
			{/* Desktop layout */}
			<div className="hidden lg:flex py-4 gap-2 items-start">
				{/* Left — sticky, cross-fades between slides */}
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
								className="text-h2 tracking-h2 font-body font-normal text-right text-darker max-w-xl"
								style={{ whiteSpace: "pre-line" }}
							>
								{slide.heading}
							</h2>
						</div>
					))}
				</div>

				{/* Right — normal scroll */}
				<div className="w-[calc(50%-4px)] flex flex-col">
					{/* Slide 0: Stacks — text */}
					<div className="min-h-screen flex flex-col justify-center gap-8 px-10 py-8">
						<div className="space-y-4 text-body-md text-dark leading-[1.25] max-w-xl">
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
						<VideoPlayer
							src="https://ethui-assets.subvisual.com/Stacks%20walkthrough.mp4"
							className="w-full aspect-video rounded-md"
						/>
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

					{/* Sentinel 0 → 1 (Stacks → Business) */}
					<div
						ref={(el) => {
							sentinelRefs.current[0] = el;
						}}
					/>

					{/* Slide 1: Business — text */}
					<div className="min-h-screen flex items-center px-10 py-8">
						<div className="space-y-4 text-body-md text-dark leading-[1.25] max-w-xl">
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

					{/* Slide 1 (continued): Business — quote */}
					<div className="min-h-screen flex flex-col justify-center px-10 py-8 gap-6">
						<blockquote className="text-h3 tracking-h3 font-heading font-normal text-darker">
							"This is the best thing I've ever built."
						</blockquote>
						<div className="flex flex-col gap-0.5">
							<span className="flex items-center gap-2 text-body-md font-heading text-dark">
								<span className="size-1.5 rounded-full bg-dark inline-block" />
								Miguel Palhas
							</span>
							<span className="text-body-md font-heading text-dark pl-4">
								Creator / Lead Dev
							</span>
						</div>
					</div>

					{/* Sentinel 1 → 2 (Business → Results) */}
					<div
						ref={(el) => {
							sentinelRefs.current[1] = el;
						}}
					/>

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

			{/* Mobile layout */}
			<div className="lg:hidden flex flex-col">
				{/* Stacks */}
				<div className="flex flex-col gap-8 py-18">
					<div className="bg-surface-page rounded-2xl px-6 py-10 flex flex-col gap-6 items-start">
						<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
							Product
						</span>
						<h2 className="text-h2 tracking-h2 font-body font-normal text-darker">
							One-click Ethereum testnets with Stacks
						</h2>
					</div>
					<div className="space-y-4 text-body-md text-dark leading-[1.25]">
						<p>
							ethui Stacks is a self-hosted tool for creating persistent,
							cloud-based Anvil testnets in one click. Every project at
							Subvisual needed the same thing: an Anvil node, a block explorer,
							a faucet. Stacks packages that into a single setup.
						</p>
						<p>
							Create a stack, get a persistent remote Anvil instance with a
							unique chain ID, authenticated RPC URL, and connected explorer.
							Fork Ethereum mainnet if you want. Share it with your team via a
							URL. All Anvil cheatcodes work—impersonation, balance setting,
							snapshots.
						</p>
					</div>
					<VideoPlayer
						src="https://ethui-assets.subvisual.com/Stacks%20walkthrough.mp4"
						className="w-full aspect-video rounded-md"
					/>
					<div className="flex flex-col gap-6">
						{productCards.map((card) => (
							<ScrollRevealFeatureCard
								key={card.title}
								title={card.title}
								body={card.body}
							/>
						))}
					</div>
				</div>

				{/* Business */}
				<div className="flex flex-col gap-8 py-18">
					<div className="bg-surface-page rounded-2xl px-6 py-10 flex flex-col gap-6 items-start">
						<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
							Business
						</span>
						<h2 className="text-h2 tracking-h2 font-body font-normal text-darker">
							What this says about Subvisual
						</h2>
					</div>
					<div className="space-y-4 text-body-md text-dark leading-[1.25]">
						<p>
							ethui isn't a client project. Nobody asked us to build it. It
							exists because our lead developer hit a wall and decided to fix it
							properly. That's the kind of team we are.
						</p>
						<p>
							When the tools aren't good enough, we build better ones. ethui
							powers our own workflow on every web3 project—from Quill and Orki
							to Brazos. Good developer tools should be shared.
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<blockquote className="text-h3 tracking-h3 font-heading font-normal text-darker">
							"This is the best thing I've ever built."
						</blockquote>
						<div className="flex flex-col gap-0.5">
							<span className="flex items-center gap-2 text-body-md font-heading text-dark">
								<span className="size-1.5 rounded-full bg-dark inline-block" />
								Miguel Palhas
							</span>
							<span className="text-body-md font-heading text-dark pl-4">
								Creator / Lead Dev
							</span>
						</div>
					</div>
				</div>

				{/* Results */}
				<div className="flex flex-col gap-8 py-18">
					<div className="bg-surface-page rounded-2xl px-6 py-10 flex flex-col gap-6 items-start">
						<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
							Results
						</span>
						<h2 className="text-h2 tracking-h2 font-body font-normal text-darker">
							What this says about Subvisual
						</h2>
					</div>
					<div className="flex flex-col gap-6">
						{resultsCards.map((card) => (
							<ScrollRevealFeatureCard
								key={card.title}
								title={card.title}
								body={card.body}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
