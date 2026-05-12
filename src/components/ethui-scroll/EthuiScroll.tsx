import { useEffect, useRef } from "react";
import arrowSvg from "../../assets/icons/arrow.svg";
import explorerUiImg from "../../assets/images/explorer-ui.webp";
import VideoPlayer from "../VideoPlayer";
import { EthuiLogo } from "./EthuiLogo";
import { IronLogo } from "./IronLogo";
import { useEthuiScroll } from "./useEthuiScroll";

const slides = [
	{ label: "Milestone", heading: "Iron → ethui" },
	{ label: "Milestone", heading: "Iron → ethui" },
	{ label: "Design", heading: "Ripping out the\nframework" },
	{ label: "Product", heading: "A local-first block\nexplorer for Anvil" },
] as const;

export default function EthuiScroll() {
	const { activeSlide, showText, showEthui, sentinelRefs, ironToEthuiRef } =
		useEthuiScroll();

	const imgRef = useRef<HTMLDivElement>(null);
	const mobileImgRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const refs = [imgRef.current, mobileImgRef.current].filter(
			(el): el is HTMLDivElement => el !== null,
		);
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						(entry.target as HTMLElement).style.opacity = "1";
						(entry.target as HTMLElement).style.transform = "translateY(0)";
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15 },
		);
		for (const el of refs) {
			observer.observe(el);
		}
		return () => observer.disconnect();
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
						<div className="sticky top-0 h-screen flex items-center px-10 py-8">
							<div className="flex flex-col items-start gap-8 w-full">
								<p
									className={`text-body-md text-dark leading-[1.25] max-w-xl self-start transition-opacity duration-700 ${
										showText ? "opacity-100" : "opacity-0"
									}`}
								>
									The project started as Iron. Then a cease-and-desist landed.
									The rebrand to ethui was quick—the name fits better anyway.
									"eth" plus "ui." It says what it is.
								</p>
								<IronLogo />
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
						<div className="space-y-4 text-body-md text-dark leading-[1.25] max-w-xl">
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
						<div className="space-y-4 text-body-md text-dark leading-[1.25] max-w-xl">
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
						<VideoPlayer
							src="https://ethui-assets.subvisual.com/Explorer%20walkthrough.mp4"
							className="w-full aspect-video rounded-md"
						/>
					</div>

					{/* Slide 3: Block explorer — image */}
					<div
						ref={imgRef}
						className="min-h-screen flex items-center px-10 py-8"
						style={{
							opacity: 0,
							transform: "translateY(24px)",
							transition: "opacity 0.6s ease, transform 0.6s ease",
						}}
					>
						<img
							src={explorerUiImg.src}
							alt="ethui explorer UI"
							className="w-full aspect-video rounded-md object-cover"
						/>
					</div>
				</div>
			</div>

			{/* Mobile layout */}
			<div className="lg:hidden flex flex-col">
				{/* Iron → ethui */}
				<div className="flex flex-col gap-8 py-18">
					<div className="bg-surface-page rounded-2xl px-6 py-10 flex flex-col gap-6 items-start">
						<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
							Milestone
						</span>
						<h2 className="text-h2 tracking-h2 font-body font-normal text-darker flex items-center gap-4 flex-wrap">
							Iron
							<img
								src={arrowSvg.src}
								alt="→"
								className="-rotate-90 h-[0.75em] w-auto align-middle"
							/>
							ethui
						</h2>
					</div>
					<div className="space-y-4 text-body-md text-dark leading-[1.25]">
						<p>
							The project started as Iron. Then a cease-and-desist landed. The
							rebrand to ethui was quick—the name fits better anyway. "eth" plus
							"ui." It says what it is.
						</p>
					</div>
					<div className="flex flex-col items-center gap-6 w-full max-w-64 mx-auto">
						<IronLogo />
						<img src={arrowSvg.src} alt="" className="self-center" />
						<EthuiLogo />
					</div>
				</div>

				{/* Ripping out the framework */}
				<div className="flex flex-col gap-8 py-18">
					<div className="bg-surface-page rounded-2xl px-6 py-10 flex flex-col gap-6 items-start">
						<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
							Design
						</span>
						<h2 className="text-h2 tracking-h2 font-body font-normal text-darker">
							Ripping out the framework
						</h2>
					</div>
					<div className="space-y-4 text-body-md text-dark leading-[1.25]">
						<p>
							By v1.13, Material UI was holding ethui back. The team migrated to
							a shadcn-based component library. Everything got cleaner—code, UI,
							and the developer experience of working on ethui itself.
							macOS-specific tweaks made it feel genuinely native.
						</p>
						<p>This wasn't just cosmetic.</p>
						<p>
							Moving away from Material UI meant the team could build new UI
							components much faster, without being constrained by an existing
							design system, and accelerate the next phase of the product.
						</p>
					</div>
				</div>

				{/* Block explorer */}
				<div className="flex flex-col gap-8 py-18">
					<div className="bg-surface-page rounded-2xl px-6 py-10 flex flex-col gap-6 items-start">
						<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
							Product
						</span>
						<h2 className="text-h2 tracking-h2 font-body font-normal text-darker">
							A local-first block explorer for Anvil
						</h2>
					</div>
					<div className="space-y-4 text-body-md text-dark leading-[1.25]">
						<p>
							The ethui explorer is a local-first Ethereum block explorer
							purpose-built for Anvil nodes. Unlike Etherscan (live chains only)
							or Otterscan (complex setup, read-only), ethui's explorer gives
							you full read/write contract interaction out of the box.
						</p>
						<p>
							No verification step. No indexing backend. No Sourcify instance.
							Connect to any Anvil RPC, and your forge compilation outputs are
							your verification. It also works with any node supporting the
							ots_* namespace, including Erigon.
						</p>
					</div>
					<VideoPlayer
						src="https://ethui-assets.subvisual.com/Explorer%20walkthrough.mp4"
						className="w-full aspect-video rounded-md"
					/>
					<div
						ref={mobileImgRef}
						style={{
							opacity: 0,
							transform: "translateY(24px)",
							transition: "opacity 0.6s ease, transform 0.6s ease",
						}}
					>
						<img
							src={explorerUiImg.src}
							alt="ethui explorer UI"
							className="w-full aspect-video rounded-md object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
