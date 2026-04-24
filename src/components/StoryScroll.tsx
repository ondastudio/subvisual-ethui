import { useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";

const slides = [
	{
		label: "Origin",
		heading: "Scratching our own itch",
	},
	{
		label: "Insight",
		heading: "Your wallet should know\nyour workflow",
	},
] as const;

export default function StoryScroll() {
	const [activeSlide, setActiveSlide] = useState(0);
	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;

		function onScroll() {
			if (!sentinel) return;
			const rect = sentinel.getBoundingClientRect();
			setActiveSlide(rect.top <= window.innerHeight * 0.5 ? 1 : 0);
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
								className="text-h2 tracking-h2 font-body font-normal text-right text-dark max-w-xl"
								style={{ whiteSpace: "pre-line" }}
							>
								{slide.heading}
							</h2>
						</div>
					))}
				</div>

				{/* Right — normal scroll */}
				<div className="w-[calc(50%-4px)] flex flex-col">
					{/* Origin */}
					<div className="min-h-screen flex items-center px-10 py-8">
						<div className="space-y-4 text-body-md text-dark leading-[1.25] max-w-xl">
							<p>
								Subvisual built ethui because the existing Ethereum developer
								wallets—MetaMask included—weren't designed for local development
								workflows. Local testnets go offline constantly, nonces desync,
								and when we started developing ethui, MetaMask just didn't cope.
							</p>
							<p>
								Miguel dug into the MetaMask codebase. No clear solution. Snaps
								couldn't solve it either. He tried building a browser extension
								from scratch—and learned the hard way why MetaMask is so
								complex.
							</p>
							<p>
								Then Gabriel suggested: why not a desktop app? Tauri existed.
								Rust was already in the toolkit. The constraints that made
								browser extensions painful just didn't apply.
							</p>
						</div>
					</div>

					{/* Sentinel — triggers left panel cross-fade when it crosses viewport midpoint */}
					<div ref={sentinelRef} />

					{/* Insight — text */}
					<div className="min-h-screen flex items-center px-10 py-8">
						<div className="space-y-4 text-body-md text-dark leading-[1.25] max-w-xl">
							<p>
								Unlike MetaMask, Rabby, or Frame, ethui is aware of your entire
								Foundry development environment—not just your transactions. It
								watches your filesystem (within your permissions), detects
								contract deploys via transaction traces, and matches on-chain
								bytecode against your local compilation artifacts automatically.
							</p>
							<p>
								No other Ethereum wallet or developer tool does this. Your
								wallet doesn't know you just compiled a contract. It can't show
								you the ABI for the contract you deployed a second ago. ethui
								can.
							</p>
						</div>
					</div>

					{/* Insight — video */}
					<div className="min-h-screen flex items-center px-10 py-8">
						<VideoPlayer
							src="https://ethui-assets.subvisual.com/Filesystem%20watcher.mp4"
							className="w-full aspect-video rounded-md"
						/>
					</div>
				</div>
			</div>

			{/* Mobile layout */}
			<div className="lg:hidden flex flex-col">
				{/* Origin section */}
				<div className="flex flex-col gap-8 py-18">
					<div className="bg-surface-page rounded-2xl px-6 py-10 flex flex-col gap-6 items-start">
						<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
							Origin
						</span>
						<h2 className="text-h2 tracking-h2 font-body font-normal text-dark">
							Scratching our own itch
						</h2>
					</div>
					<div className="space-y-4 text-body-md text-dark leading-[1.25] md:max-w-[560px]">
						<p>
							Subvisual built ethui because the existing Ethereum developer
							wallets—MetaMask included—weren't designed for local development
							workflows. Local testnets go offline constantly, nonces desync,
							and when we started developing ethui, MetaMask just didn't cope.
						</p>
						<p>
							Miguel dug into the MetaMask codebase. No clear solution. Snaps
							couldn't solve it either. He tried building a browser extension
							from scratch—and learned the hard way why MetaMask is so complex.
						</p>
						<p>
							Then Gabriel suggested: why not a desktop app? Tauri existed. Rust
							was already in the toolkit. The constraints that made browser
							extensions painful just didn't apply.
						</p>
					</div>
				</div>

				{/* Insight section */}
				<div className="flex flex-col gap-8 py-18">
					<div className="bg-surface-page rounded-2xl px-6 py-10 flex flex-col gap-6 items-start">
						<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
							Insight
						</span>
						<h2 className="text-h2 tracking-h2 font-body font-normal text-dark">
							Your wallet should know your workflow
						</h2>
					</div>
					<div className="space-y-4 text-body-md text-dark leading-[1.25] md:max-w-[560px]">
						<p>
							Unlike MetaMask, Rabby, or Frame, ethui is aware of your entire
							Foundry development environment—not just your transactions. It
							watches your filesystem (within your permissions), detects
							contract deploys via transaction traces, and matches on-chain
							bytecode against your local compilation artifacts automatically.
						</p>
						<p>
							No other Ethereum wallet or developer tool does this. Your wallet
							doesn't know you just compiled a contract. It can't show you the
							ABI for the contract you deployed a second ago. ethui can.
						</p>
					</div>
					<VideoPlayer
						src="https://ethui-assets.subvisual.com/Filesystem%20watcher.mp4"
						className="w-full aspect-video rounded-md"
					/>
				</div>
			</div>
		</section>
	);
}
