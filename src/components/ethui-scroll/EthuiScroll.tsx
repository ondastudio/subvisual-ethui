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
					<div
						ref={(el) => {
							sentinelRefs.current[0] = el;
						}}
					/>

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
					<div
						ref={(el) => {
							sentinelRefs.current[3] = el;
						}}
					/>

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
					<div
						ref={(el) => {
							sentinelRefs.current[4] = el;
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

					{/* Sentinel 5 → 6 (Results) */}
					<div
						ref={(el) => {
							sentinelRefs.current[5] = el;
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
		</section>
	);
}
