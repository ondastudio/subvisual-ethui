import { useEffect, useRef, useState } from "react";

export function useEthuiScroll() {
	const [activeSlide, setActiveSlide] = useState(0);
	const [showText, setShowText] = useState(true);
	const [showEthui, setShowEthui] = useState(false);

	const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
	const ironToEthuiRef = useRef<HTMLDivElement>(null);
	const activeSlideRef = useRef(0);
	const showTextRef = useRef(true);
	const showEthuiRef = useRef(false);

	useEffect(() => {
		function onScroll() {
			let active = 0;
			sentinelRefs.current.forEach((el, i) => {
				if (!el) return;
				const rect = el.getBoundingClientRect();
				if (rect.top <= window.innerHeight * 0.5) active = i + 1;
			});
			if (active !== activeSlideRef.current) {
				activeSlideRef.current = active;
				setActiveSlide(active);
			}

			if (ironToEthuiRef.current) {
				const rect = ironToEthuiRef.current.getBoundingClientRect();
				const progress = Math.max(
					0,
					Math.min(1, -rect.top / (rect.height - window.innerHeight)),
				);
				const nextShowText = progress < 0.4;
				const nextShowEthui = progress > 0.65;
				if (nextShowText !== showTextRef.current) {
					showTextRef.current = nextShowText;
					setShowText(nextShowText);
				}
				if (nextShowEthui !== showEthuiRef.current) {
					showEthuiRef.current = nextShowEthui;
					setShowEthui(nextShowEthui);
				}
			}
		}

		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return {
		activeSlide,
		showText,
		showEthui,
		sentinelRefs,
		ironToEthuiRef,
	};
}
