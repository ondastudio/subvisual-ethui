import { useEffect, useRef, useState } from "react";
import img1 from "../assets/images/eth-lisbon-1.webp";
import img2 from "../assets/images/eth-lisbon-2.webp";
import img3 from "../assets/images/eth-lisbon-3.webp";
import img4 from "../assets/images/eth-lisbon-4.webp";
import img5 from "../assets/images/eth-lisbon-5.webp";
import img6 from "../assets/images/eth-lisbon-6.webp";
import img7 from "../assets/images/eth-lisbon-7.webp";

const IMAGES = [
	img1.src,
	img2.src,
	img3.src,
	img4.src,
	img5.src,
	img6.src,
	img7.src,
];
const NUM_IMAGES = IMAGES.length;
const PAD = 24;

export default function EthLisbonScroll() {
	const containerRef = useRef<HTMLDivElement>(null);
	const contentBoxRef = useRef<HTMLDivElement>(null);
	const [step, setStep] = useState(0);
	const [boxSize, setBoxSize] = useState({ w: 0, h: 0 });

	const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

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
			setStep(Math.min(NUM_IMAGES - 1, Math.floor(progress * NUM_IMAGES)));
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
						(entry.target as HTMLElement).style.opacity = "1";
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.2 },
		);
		imgRefs.current.forEach((ref) => {
			if (ref) observer.observe(ref);
		});
		return () => observer.disconnect();
	}, []);

	const { w, h } = boxSize;
	const IMG_W = w > 0 ? Math.max(340, Math.round(w * 0.2)) : 340;
	const IMG_H = Math.round(IMG_W * 0.75);
	const maxX = Math.max(0, w - IMG_W - PAD);
	const maxY = Math.max(0, h - IMG_H - PAD);
	const transforms = Array.from({ length: NUM_IMAGES }, (_, i) => {
		const t = i / (NUM_IMAGES - 1);
		const x = PAD + t * (maxX - PAD);
		const y = PAD + t * (maxY - PAD);
		return `translate(${x}px, ${y}px)`;
	});

	return (
		<>
			{/* Desktop: text scrolls normally, only images stick */}
			<div className="hidden lg:flex bg-white rounded-2xl px-8 pt-8 pb-16 flex-col gap-10 items-start">
				<div className="bg-dark/10 rounded-2xl px-6 py-4">
					<span className="text-body-md text-dark leading-none tracking-tight">
						Milestone
					</span>
				</div>
				<div className="flex items-center justify-center w-full">
					<div className="flex flex-col gap-10 items-center text-center max-w-[628px]">
						<h2 className="text-h2 tracking-h2 font-body font-normal text-darker w-full">
							ETH Lisbon
						</h2>
						<div className="text-body-md text-dark space-y-4 leading-5">
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

			{/* Desktop: sticky image scroll section — height stops above the bottom navbar */}
			<section
				ref={containerRef}
				className="hidden lg:block relative px-4 py-4"
				style={{ height: "400vh" }}
			>
				<div
					ref={contentBoxRef}
					className="sticky top-4 h-[calc(100vh-9rem)] bg-surface-page rounded-2xl overflow-hidden relative"
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
			</section>

			{/* Mobile: stacked images with fade-in on scroll */}
			<section className="lg:hidden">
				<div className="bg-white rounded-2xl px-4 pt-4 pb-6 flex flex-col gap-10 items-start">
					<div className="bg-dark/10 rounded-2xl px-6 py-4">
						<span className="text-body-md text-dark leading-none tracking-tight">
							Milestone
						</span>
					</div>
					<div className="flex items-center justify-center w-full">
						<div className="flex flex-col gap-4 items-center text-center max-w-[628px]">
							<h2 className="text-h2 tracking-h2 font-body font-normal text-darker w-full">
								ETH Lisbon
							</h2>
							<div className="text-body-md text-dark space-y-3 leading-5">
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

				<div className="flex flex-col gap-4 mt-6 px-4">
					{IMAGES.map((src, i) => (
						<div
							key={i}
							ref={(el) => {
								imgRefs.current[i] = el;
							}}
							className="rounded-2xl overflow-hidden"
							style={{
								opacity: 0,
								transition: `opacity 0.7s ease ${i * 150}ms`,
							}}
						>
							<img src={src} alt="" className="w-full" />
						</div>
					))}
				</div>
			</section>
		</>
	);
}
