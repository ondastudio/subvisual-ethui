import { useEffect, useRef, useState } from "react";

const IMG_1 =
	"https://www.figma.com/api/mcp/asset/1644852e-6bb4-473f-b44d-4d51f45bbb2c";
const IMG_2 =
	"https://www.figma.com/api/mcp/asset/0e90e559-e420-42e2-b438-92649f086d20";
const IMG_3 =
	"https://www.figma.com/api/mcp/asset/2bd9e0e2-af76-4789-8cc8-5b0db365896a";

const IMAGES = [IMG_1, IMG_2, IMG_3];
const IMG_W = 500;
const IMG_H = 375;
const PAD = 40;

export default function EthLisbonScroll() {
	const containerRef = useRef<HTMLDivElement>(null);
	const contentBoxRef = useRef<HTMLDivElement>(null);
	const [step, setStep] = useState(0);
	const [boxSize, setBoxSize] = useState({ w: 0, h: 0 });

	useEffect(() => {
		const obs = new ResizeObserver(([entry]) => {
			setBoxSize({
				w: entry.contentRect.width,
				h: entry.contentRect.height,
			});
		});
		const el = contentBoxRef.current;
		if (el) {
			obs.observe(el);
			setBoxSize({ w: el.offsetWidth, h: el.offsetHeight });
		}
		return () => obs.disconnect();
	}, []);

	useEffect(() => {
		function onScroll() {
			const el = containerRef.current;
			if (!el) return;
			const total = el.offsetHeight - window.innerHeight;
			if (total <= 0) return;
			const progress = Math.max(
				0,
				Math.min(1, -el.getBoundingClientRect().top / total),
			);
			setStep(progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2);
		}
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const { w, h } = boxSize;
	const transforms = [
		`translate(${PAD}px, ${PAD}px)`,
		`translate(${Math.max(0, (w - IMG_W) / 2)}px, ${Math.max(0, (h - IMG_H) / 2)}px)`,
		`translate(${Math.max(0, w - IMG_W - PAD)}px, ${Math.max(0, h - IMG_H - PAD)}px)`,
	];

	return (
		<section
			ref={containerRef}
			className="relative px-4 py-4"
			style={{ height: "300vh" }}
		>
			<div className="sticky top-4 h-[calc(100vh-2rem)] bg-white rounded-2xl overflow-hidden flex flex-col">
				{/* Text area */}
				<div className="flex flex-col gap-0.5 items-start pt-30 pb-15 px-4">
					<div className="bg-dark/10 rounded-2xl px-6 py-4">
						<span className="text-body-md text-dark leading-none tracking-tight">
							Milestone
						</span>
					</div>
					<div className="flex items-center justify-center w-full">
						<div className="flex flex-col gap-10 items-center text-center max-w-[628px]">
							<h2 className="text-h2 tracking-h2 font-body font-normal text-dark w-full">
								ETH Lisbon
							</h2>
							<div className="text-body-md text-muted space-y-4 leading-5">
								<p>
									ETH Lisbon was the first time ethui met the wider community.
									Workshop, speaker slot, bounties for contributions. Real
									developers, real feedback.
								</p>
								<p>
									The best thing to come out of it: a PoC for transaction
									simulations with live updates. Before you submit a tx, see
									exactly what it will do—decoded logs, state changes, gas.
									Tenderly's capability, running locally inside your wallet.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Content box — image moves through 3 positions as user scrolls */}
				<div
					ref={contentBoxRef}
					className="flex-1 bg-surface-page rounded-2xl overflow-hidden relative mx-4 mb-4"
				>
					<div
						className="absolute rounded-2xl overflow-hidden bg-dark"
						style={{
							width: IMG_W,
							height: IMG_H,
							transform: w > 0 ? transforms[step] : transforms[0],
							transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
						}}
					>
						{IMAGES.map((src, i) => (
							<img
								key={i}
								src={src}
								alt=""
								className="absolute inset-0 size-full object-cover transition-opacity duration-500"
								style={{ opacity: step === i ? 1 : 0 }}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
