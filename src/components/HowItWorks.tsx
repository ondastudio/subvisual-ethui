import { useEffect, useRef } from "react";

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
	const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

	return (
		<section className="bg-white py-4">
			{/* Header */}
			<div className="flex flex-col items-center gap-10 pb-10 lg:pb-36 pt-3">
				<div className="self-start">
					<span className="bg-dark/10 rounded-2xl px-6 py-4 text-body-md text-dark leading-none">
						Technical
					</span>
				</div>

				<div className="flex flex-col gap-6 lg:gap-10 items-center text-center max-w-2xl w-full">
					<h2 className="text-h2 tracking-h2 font-body font-normal text-dark w-full">
						How it actually works
					</h2>
					<div className="text-body-md text-dark leading-[1.25] space-y-4 md:max-w-[560px]">
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

			{/* Cards */}
			<div className="bg-surface-page rounded-2xl flex items-center justify-center py-10 px-6 lg:py-36 lg:px-10">
				<div className="flex flex-col lg:flex-row gap-6 w-full max-w-5xl">
					{cards.map((card, i) => (
						<div
							key={i}
							ref={(el) => {
								cardsRef.current[i] = el;
							}}
							className="flex-1 bg-dark rounded-2xl p-6 flex flex-col justify-between min-h-72"
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
							<p className="text-body-md text-white/80 leading-[1.2] md:max-w-[560px]">
								{card.body}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
