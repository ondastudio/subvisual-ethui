import { useEffect, useRef } from "react";
import ethuiMonogramSrc from "../assets/ethui-monogram.svg";

export default function Hero() {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		const wrapper = wrapperRef.current;
		const content = contentRef.current;
		const desc = descRef.current;
		if (!wrapper || !content || !desc) return;

		// Distance to scroll: 80vh (first div) + card top/bottom inset (2 * 1rem)
		const scrollDistance = window.innerHeight * 0.8 + 32;

		function onScroll() {
			const progress = Math.max(
				0,
				Math.min(-wrapper.getBoundingClientRect().top, scrollDistance),
			);

			content.style.transform = `translateY(-${progress}px)`;

			// Fade description in after 20% scroll progress
			const fadeStart = scrollDistance * 0.2;
			const fadeProgress = Math.max(
				0,
				Math.min((progress - fadeStart) / (scrollDistance - fadeStart), 1),
			);
			desc.style.opacity = String(fadeProgress);
			desc.style.transform = `translateY(${(1 - fadeProgress) * 20}px)`;
		}

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		// Wrapper height = sticky section (100vh) + extra scroll distance
		<div ref={wrapperRef} style={{ height: `calc(100vh + 80vh + 2rem)` }}>
			<section className="sticky top-0 h-screen p-4 bg-blue-25 overflow-hidden">
				<div className="bg-[#0a0a0a] rounded-2xl h-full overflow-hidden">
					<div ref={contentRef} className="will-change-transform">
						{/* First screen: ~80vh */}
						<div className="h-[80vh] flex flex-col items-center justify-center gap-7 px-4">
							<div className="flex items-center gap-7">
								<img
									src={ethuiMonogramSrc.src}
									alt="ethui monogram"
									className="size-[114px]"
								/>
								<p
									className="font-bold text-white leading-[0.9] tracking-[-0.03em]"
									style={{
										fontFamily: "'Source Code Pro', monospace",
										fontSize: "89.923px",
									}}
								>
									<span>eth</span>
									<span style={{ letterSpacing: "-0.8px" }}>u</span>
									<span>i</span>
								</p>
							</div>

							<p className="text-white text-center font-body text-h5 leading-[1.167] tracking-[-0.24px] max-w-[632px]">
								We built the Ethereum developer tool we wished existed. Then the
								community showed up.
							</p>
						</div>

						{/* Second screen: 100vh, fades in via scroll */}
						<div className="h-screen flex items-center justify-center px-4">
							<p
								ref={descRef}
								className="text-white text-center font-body text-h5 leading-[1.167] tracking-[-0.24px] max-w-[632px]"
								style={{ opacity: 0, transform: "translateY(20px)" }}
							>
								ethui is an open-source Ethereum developer toolkit that fills
								the gap between your code editor and the blockchain. It's a
								desktop-native wallet built in Rust with Tauri, designed for
								developers who use Foundry or Hardhat daily. We built it because
								nothing else existed.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
