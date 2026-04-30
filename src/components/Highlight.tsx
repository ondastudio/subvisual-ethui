import { useEffect, useRef } from "react";
import VideoPlayer from "./VideoPlayer";

type HighlightProps = {
	quote: string;
	authorName: string;
	authorRole: string;
	videoSrc: string;
};

export default function Highlight({
	quote,
	authorName,
	authorRole,
	videoSrc,
}: HighlightProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const parallaxRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function update() {
			if (!sectionRef.current || !parallaxRef.current) return;
			const rect = sectionRef.current.getBoundingClientRect();
			const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
			parallaxRef.current.style.transform = `translateY(${centerOffset * 0.15}px)`;
		}

		update();
		window.addEventListener("scroll", update, { passive: true });
		return () => window.removeEventListener("scroll", update);
	}, []);

	const attribution = (
		<div className="flex flex-col">
			<div className="flex items-center gap-2">
				<span className="size-1.5 rounded-full bg-dark shrink-0" />
				<span className="font-body text-body-md text-dark whitespace-nowrap">
					{authorName}
				</span>
			</div>
			<span className="font-body text-body-md text-dark pl-4">
				{authorRole}
			</span>
		</div>
	);

	return (
		<section
			ref={sectionRef}
			className="bg-white py-18 flex flex-col gap-8 lg:min-h-screen lg:py-0 lg:relative lg:flex-row lg:items-center"
		>
			{/* Mobile: quote + attribution in a surface card */}
			<div className="bg-surface-page rounded-2xl px-6 py-10 flex flex-col gap-6 w-full lg:hidden">
				<blockquote className="font-heading text-h2 tracking-h2 text-darker">
					{quote}
				</blockquote>
				{attribution}
			</div>

			{/* Mobile: video */}
			<div className="relative overflow-hidden rounded-2xl w-full aspect-video lg:hidden">
				<VideoPlayer src={videoSrc} className="w-full h-full" />
			</div>

			{/* Desktop: quote — left, ~40% wide, sits on top of video */}
			<blockquote className="hidden lg:block font-heading text-h2 tracking-h2 text-darker lg:w-[40%] lg:shrink-0 lg:relative lg:z-10">
				{quote}
			</blockquote>

			{/* Desktop: video + attribution, absolutely overlapping from 30% to right edge */}
			<div
				ref={parallaxRef}
				className="hidden lg:flex lg:absolute lg:left-[30%] lg:right-0 lg:top-1/2 lg:-translate-y-1/2 flex-row gap-4 items-start"
			>
				<div className="relative overflow-hidden rounded-2xl aspect-video flex-1 opacity-40">
					<VideoPlayer src={videoSrc} className="w-full h-full" />
				</div>
				<div className="shrink-0">{attribution}</div>
			</div>
		</section>
	);
}
