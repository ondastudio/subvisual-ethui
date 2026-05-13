import { useEffect, useRef, useState } from "react";
import posterFilesystemWatcher from "../assets/images/poster-filesystem-watcher.webp";
import posterScratchingOurOwnItch from "../assets/images/poster-scratching-our-own-itch-.webp";
import VideoPlayer from "./VideoPlayer";

type HeadingSlide = {
	type: "heading";
	label: string;
	heading: string;
};

type QuoteSlide = {
	type: "quote";
	label: string;
	quote: string;
	attribution: { name: string; role: string };
};

type Slide = HeadingSlide | QuoteSlide;

const slides: Slide[] = [
	{
		type: "heading",
		label: "Origin",
		heading: "Scratching our own itch",
	},
	{
		type: "quote",
		label: "Origin",
		quote:
			"“Our wallet is what sits between us and a blockchain. As developers, we need it to be helpful, not a hindrance.”",
		attribution: { name: "Miguel Palhas", role: "Creator / Lead Dev" },
	},
	{
		type: "heading",
		label: "Insight",
		heading: "Your wallet should know\nyour workflow",
	},
];

export default function StoryScroll() {
	const [activeSlide, setActiveSlide] = useState(0);
	const sentinel1Ref = useRef<HTMLDivElement>(null);
	const sentinel2Ref = useRef<HTMLDivElement>(null);
	const activeSlideRef = useRef(0);

	useEffect(() => {
		const sentinel1 = sentinel1Ref.current;
		const sentinel2 = sentinel2Ref.current;
		if (!sentinel1 || !sentinel2) return;

		function onScroll() {
			const mid = window.innerHeight * 0.5;
			const s2Top =
				sentinel2Ref.current?.getBoundingClientRect().top ?? Infinity;
			const s1Top =
				sentinel1Ref.current?.getBoundingClientRect().top ?? Infinity;

			const next = s2Top <= mid ? 2 : s1Top <= mid ? 1 : 0;
			if (next !== activeSlideRef.current) {
				activeSlideRef.current = next;
				setActiveSlide(next);
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
							{slide.type === "heading" ? (
								<h2
									className="text-h2 tracking-h2 font-body font-normal text-right text-darker max-w-xl"
									style={{ whiteSpace: "pre-line" }}
								>
									{slide.heading}
								</h2>
							) : (
								<>
									<blockquote className="text-h3 tracking-h3 font-heading font-normal text-right text-darker max-w-xl">
										{slide.quote}
									</blockquote>
									<div className="flex flex-col items-end gap-1">
										<div className="flex items-center gap-2.5">
											<span className="size-1.5 rounded-full bg-dark shrink-0" />
											<span className="font-heading text-body-md text-dark">
												{slide.attribution.name}
											</span>
										</div>
										<span className="pl-4 font-heading text-body-md text-dark">
											{slide.attribution.role}
										</span>
									</div>
								</>
							)}
						</div>
					))}
				</div>

				{/* Right — normal scroll */}
				<div className="w-[calc(50%-4px)] flex flex-col">
					{/* Origin text */}
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

					{/* Sentinel 1 — triggers quote slide on left */}
					<div ref={sentinel1Ref} />

					{/* Origin quote video */}
					<div className="min-h-screen flex items-center px-10 py-8">
						<VideoPlayer
							src="https://ethui-assets.subvisual.com/Scratching%20our%20own%20itch.mp4"
							poster={posterScratchingOurOwnItch.src}
							className="w-full aspect-video rounded-md"
						/>
					</div>

					{/* Sentinel 2 — triggers Insight slide on left */}
					<div ref={sentinel2Ref} />

					{/* Insight text */}
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

					{/* Insight video */}
					<div className="min-h-screen flex items-center px-10 py-8">
						<VideoPlayer
							src="https://ethui-assets.subvisual.com/Filesystem%20watcher.mp4"
							poster={posterFilesystemWatcher.src}
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
						<h2 className="text-h2 tracking-h2 font-body font-normal text-darker">
							Scratching our own itch
						</h2>
					</div>
					<div className="space-y-4 text-body-md text-dark leading-[1.25]">
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

				{/* Quote section */}
				<div className="flex flex-col gap-8 py-18">
					<div className="bg-surface-page rounded-2xl px-6 py-10 flex flex-col gap-6 items-start">
						<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
							Origin
						</span>
						<blockquote className="text-h3 tracking-h3 font-heading font-normal text-darker">
							"Our wallet is what sits between us and a blockchain. As
							developers, we need it to be helpful, not a hindrance."
						</blockquote>
						<div className="flex flex-col gap-1">
							<div className="flex items-center gap-2.5">
								<span className="size-1.5 rounded-full bg-dark shrink-0" />
								<span className="font-heading text-body-md text-dark">
									Miguel Palhas
								</span>
							</div>
							<span className="pl-4 font-heading text-body-md text-dark">
								Creator / Lead Dev
							</span>
						</div>
					</div>
					<VideoPlayer
						src="https://ethui-assets.subvisual.com/Scratching%20our%20own%20itch.mp4"
						poster={posterScratchingOurOwnItch.src}
						className="w-full aspect-video rounded-md"
					/>
				</div>

				{/* Insight section */}
				<div className="flex flex-col gap-8 py-18">
					<div className="bg-surface-page rounded-2xl px-6 py-10 flex flex-col gap-6 items-start">
						<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
							Insight
						</span>
						<h2 className="text-h2 tracking-h2 font-body font-normal text-darker">
							Your wallet should know your workflow
						</h2>
					</div>
					<div className="space-y-4 text-body-md text-dark leading-[1.25]">
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
						poster={posterFilesystemWatcher.src}
						className="w-full aspect-video rounded-md"
					/>
				</div>
			</div>
		</section>
	);
}
