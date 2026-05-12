import { useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";

const cards = [
	{
		title: "Anvil-aware\nsyncing",
		body: "Real-time state updates that survive chain restarts, reverts, and downtime. When anvil comes back, ethui catches up instantly.",
	},
	{
		title: "Foundry ABI\nexplorer",
		body: "Filesystem monitoring indexes forge outputs. Matched against on-chain bytecode via diff scoring. A local Etherscan that just works, the moment you deploy.",
	},
	{
		title: "Fast mode",
		body: "On anvil with a test wallet, ethui skips confirmations entirely. Transactions are auto-impersonated via cheatcodes—your private key is never decrypted. Faster and safer.",
	},
];

export default function HowItWorks() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const boxRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
	const [progress, setProgress] = useState(0);
	const [startH, setStartH] = useState(0);
	const [showCards, setShowCards] = useState(true);
	const [showVideo, setShowVideo] = useState(false);

	useEffect(() => {
		if (boxRef.current) {
			setStartH(boxRef.current.offsetHeight);
		}
	}, []);

	useEffect(() => {
		function onScroll() {
			const el = scrollRef.current;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			// progress 0 = section bottom enters viewport, 1 = section fully scrolled past
			const p = Math.max(
				0,
				Math.min(1, (window.innerHeight - rect.top) / el.offsetHeight),
			);
			setProgress(p);
		}
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const el = entry.target as HTMLElement;
						el.style.opacity = "1";
						el.style.transform = "translateY(0)";
						observer.unobserve(el);
					}
				});
			},
			{ threshold: 0.15 },
		);
		cardsRef.current.forEach((card) => {
			if (card) observer.observe(card);
		});
		return () => observer.disconnect();
	}, []);

	const p01 = (t: number, s: number, e: number) =>
		Math.max(0, Math.min(1, (t - s) / (e - s)));
	const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

	const expandP = ease(p01(progress, 0.0, 0.65));
	const isAtTop = progress >= 0.5;

	useEffect(() => {
		if (isAtTop) {
			setShowCards(false);
			const t = setTimeout(() => setShowVideo(true), 500);
			return () => clearTimeout(t);
		} else {
			setShowVideo(false);
			const t = setTimeout(() => setShowCards(true), 500);
			return () => clearTimeout(t);
		}
	}, [isAtTop]);

	const targetH =
		typeof window !== "undefined" ? window.innerHeight - 9 * 16 : 600;
	const boxH =
		startH > 0 ? Math.round(startH + (targetH - startH) * expandP) : undefined;

	return (
		<section className="bg-white py-4">
			{/* Header */}
			<div className="flex flex-col items-center gap-10 pb-10 lg:pb-16 pt-3">
				<div className="self-start">
					<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
						Technical
					</span>
				</div>

				<div className="flex flex-col gap-6 lg:gap-10 items-center text-center max-w-2xl w-full">
					<h2 className="text-h2 tracking-h2 font-body font-normal text-darker w-full">
						How it actually works
					</h2>
					<div className="text-body-md text-dark leading-[1.25] space-y-4">
						<p>
							ethui is built on a Rust backend paired with a React frontend,
							using Tauri for desktop app support. The business logic is powered
							by Foundry, Alloy, Reth, and a collection of other Rust packages,
							while Rust handles chain syncing, filesystem watching, transaction
							tracing, and bytecode matching. This makes ethui significantly
							faster than browser-extension-based alternatives for local
							Ethereum development.
						</p>
						<p>
							For contract identification, ethui uses optimistic filesystem
							matching: it compares compiled artifacts from the developer's
							local filesystem with deployed bytecode byte-by-byte. A difference
							of under 10% means it's a match. Immutable variables cause
							byte-level diffs, but contract logic keeps the score low. No
							formal contract verification needed — just a reliable convenience
							heuristic for the developer's own code.
						</p>
					</div>
				</div>
			</div>

			{/* Mobile: cards stacked + video */}
			<div className="lg:hidden flex flex-col gap-4 px-4 pb-4">
				<div className="flex flex-col gap-4">
					{cards.map((card, i) => (
						<div
							key={i}
							className="bg-card-dark rounded-2xl p-6 flex flex-col gap-6 min-h-48"
						>
							<h3
								className="text-h4 tracking-h4 font-body font-normal text-white leading-[1.2]"
								style={{ whiteSpace: "pre-line" }}
							>
								{card.title}
							</h3>
							<p className="text-body-md text-white leading-[1.2]">
								{card.body}
							</p>
						</div>
					))}
				</div>
				<VideoPlayer
					src="https://ethui-assets.subvisual.com/Ethui%20-%20Desktop%20UI%20.mp4"
					className="w-full aspect-video rounded-xl"
				/>
			</div>

			{/* Desktop: scroll-driven expand section */}
			<div
				ref={scrollRef}
				className="hidden lg:block relative px-4 py-4"
				style={{ height: "200vh" }}
			>
				<div className="sticky top-4 h-[calc(100vh-9rem)] flex items-start">
					<div
						ref={boxRef}
						className="bg-surface-page rounded-2xl w-full relative overflow-hidden"
						style={boxH != null ? { height: boxH } : undefined}
					>
						{/* Cards — in normal flow so the box gets natural height */}
						<div
							className="flex items-center justify-center py-10 px-6 lg:py-36 lg:px-10"
							style={{
								opacity: showCards ? 1 : 0,
								pointerEvents: showCards ? "auto" : "none",
								transition: "opacity 0.5s ease",
							}}
						>
							<div className="flex flex-col lg:flex-row gap-6 w-full max-w-5xl">
								{cards.map((card, i) => (
									<div
										key={i}
										ref={(el) => {
											cardsRef.current[i] = el;
										}}
										className="flex-1 bg-card-dark rounded-2xl p-6 flex flex-col justify-between min-h-72"
										style={{
											opacity: 0,
											transform: "translateY(24px)",
											transition: `opacity 0.5s ease ${i * 120}ms, transform 0.5s ease ${i * 120}ms`,
										}}
									>
										<h3
											className="text-h4 tracking-h4 font-body font-normal text-white leading-[1.2]"
											style={{ whiteSpace: "pre-line" }}
										>
											{card.title}
										</h3>
										<p className="text-body-md text-white leading-[1.2]">
											{card.body}
										</p>
									</div>
								))}
							</div>
						</div>

						{/* Video — absolutely centered, fades in */}
						<div
							className="absolute inset-0 flex items-center justify-center p-6 lg:p-10"
							style={{
								opacity: showVideo ? 1 : 0,
								pointerEvents: showVideo ? "auto" : "none",
								transition: "opacity 0.5s ease",
							}}
						>
							<VideoPlayer
								src="https://ethui-assets.subvisual.com/Ethui%20-%20Desktop%20UI%20.mp4"
								className="w-full max-w-3xl aspect-video rounded-xl"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
