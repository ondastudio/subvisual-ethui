import { useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";

export default function HighlightScroll() {
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
					{/* Slide 1: heading */}
					<div
						className={`absolute right-0 flex flex-col gap-6 items-end px-10 w-full transition-opacity duration-500 ease-in-out ${
							activeSlide === 0 ? "opacity-100" : "opacity-0"
						}`}
						aria-hidden={activeSlide !== 0}
					>
						<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
							Highlight
						</span>
						<h2 className="text-h2 tracking-h2 font-body font-normal text-right text-darker max-w-xl">
							Account impersonation for local development
						</h2>
					</div>

					{/* Slide 2: pull quote */}
					<div
						className={`absolute right-0 flex flex-col gap-6 items-end px-10 w-full transition-opacity duration-500 ease-in-out ${
							activeSlide === 1 ? "opacity-100" : "opacity-0"
						}`}
						aria-hidden={activeSlide !== 1}
					>
						<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
							Highlight
						</span>
						<blockquote className="text-h3 tracking-h3 font-heading font-normal text-right text-darker max-w-xl">
							"It's eye-opening to learn that a surprising number of people in
							the space are not even aware that impersonation is a possibility."
						</blockquote>
						<div className="flex flex-col items-end gap-0.5">
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

				{/* Right — normal scroll */}
				<div className="w-[calc(50%-4px)] flex flex-col">
					{/* Slide 1 content: body text */}
					<div className="min-h-screen flex items-center px-10 py-8">
						<div className="space-y-4 text-body-md text-dark leading-[1.25] max-w-xl">
							<p>
								ethui's impersonation feature lets you assume any Ethereum
								address locally and see exactly what that account would see in
								your dApp. For frontend developers debugging user-reported
								issues, this eliminates the need for external tools like
								Impersonator.xyz.
							</p>
							<p>
								What surprised us: most developers didn't even know
								impersonation was possible. Rabby wallet now offers Watch Mode,
								which allows you to browse any public portfolio using their
								interface, but this is not ubiquitous and doesn't serve the same
								purpose.
							</p>
						</div>
					</div>

					{/* Sentinel — triggers quote slide when it crosses viewport midpoint */}
					<div ref={sentinelRef} />

					{/* Slide 2 content: video */}
					<div className="min-h-screen flex items-center px-10 py-8">
						<VideoPlayer
							src="https://ethui-assets.subvisual.com/Impersonator%20Flow.mp4"
							className="w-full aspect-video rounded-md"
						/>
					</div>
				</div>
			</div>

			{/* Mobile layout */}
			<div className="lg:hidden flex flex-col">
				{/* Highlight text section */}
				<div className="flex flex-col gap-8 py-18">
					<div className="bg-surface-page rounded-2xl px-6 py-10 flex flex-col gap-6 items-start">
						<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
							Highlight
						</span>
						<h2 className="text-h2 tracking-h2 font-body font-normal text-darker">
							Account impersonation for local development
						</h2>
					</div>
					<div className="space-y-4 text-body-md text-dark leading-[1.25]">
						<p>
							ethui's impersonation feature lets you assume any Ethereum address
							locally and see exactly what that account would see in your dApp.
							For frontend developers debugging user-reported issues, this
							eliminates the need for external tools like Impersonator.xyz.
						</p>
						<p>
							What surprised us: most developers didn't even know impersonation
							was possible. Rabby wallet now offers Watch Mode, which allows you
							to browse any public portfolio using their interface, but this is
							not ubiquitous and doesn't serve the same purpose.
						</p>
					</div>
				</div>

				{/* Highlight quote + video section */}
				<div className="flex flex-col gap-8 py-18">
					<div className="bg-surface-page rounded-2xl px-6 py-10 flex flex-col gap-6 items-start">
						<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
							Highlight
						</span>
						<blockquote className="text-h3 tracking-h3 font-heading font-normal text-darker">
							"It's eye-opening to learn that a surprising number of people in
							the space are not even aware that impersonation is a possibility."
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
					<VideoPlayer
						src="https://ethui-assets.subvisual.com/Impersonator%20Flow.mp4"
						className="w-full aspect-video rounded-md"
					/>
				</div>
			</div>
		</section>
	);
}
