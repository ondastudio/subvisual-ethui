import { useEffect, useRef, useState } from "react";

const productCardsLength = 3;
const resultsCardsLength = 2;

export function useEthuiScroll() {
	const [activeSlide, setActiveSlide] = useState(0);
	const [showText, setShowText] = useState(true);
	const [showEthui, setShowEthui] = useState(false);
	const [productNumVisible, setProductNumVisible] = useState(0);
	const [resultsNumVisible, setResultsNumVisible] = useState(1);

	const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
	const ironToEthuiRef = useRef<HTMLDivElement>(null);
	const productZoneRef = useRef<HTMLDivElement>(null);
	const resultsZoneRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function onScroll() {
			let active = 0;
			sentinelRefs.current.forEach((el, i) => {
				if (!el) return;
				const rect = el.getBoundingClientRect();
				if (rect.top <= window.innerHeight * 0.5) active = i + 1;
			});
			setActiveSlide(active);

			if (ironToEthuiRef.current) {
				const rect = ironToEthuiRef.current.getBoundingClientRect();
				const progress = Math.max(
					0,
					Math.min(1, -rect.top / (rect.height - window.innerHeight)),
				);
				setShowText(progress < 0.4);
				setShowEthui(progress > 0.65);
			}

			if (productZoneRef.current) {
				const rect = productZoneRef.current.getBoundingClientRect();
				const scrolledPast = Math.max(0, 16 - rect.top);
				const extraPerCard = window.innerHeight * 0.4;
				setProductNumVisible(
					Math.min(
						productCardsLength,
						Math.floor(scrolledPast / extraPerCard) + 1,
					),
				);
			}

			if (resultsZoneRef.current) {
				const rect = resultsZoneRef.current.getBoundingClientRect();
				const scrolledPast = Math.max(0, 16 - rect.top);
				const extraPerCard = window.innerHeight * 0.4;
				setResultsNumVisible(
					Math.min(
						resultsCardsLength,
						Math.floor(scrolledPast / extraPerCard) + 1,
					),
				);
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
		productNumVisible,
		resultsNumVisible,
		sentinelRefs,
		ironToEthuiRef,
		productZoneRef,
		resultsZoneRef,
	};
}
