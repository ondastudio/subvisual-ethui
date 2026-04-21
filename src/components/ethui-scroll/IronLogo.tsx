export function IronLogo({
	markSrc,
	wordmarkSrc,
}: {
	markSrc: string;
	wordmarkSrc: string;
}) {
	return (
		<div className="flex items-center gap-8">
			<div className="size-25 bg-[#161616] rounded-full flex items-center justify-center shrink-0">
				<img src={markSrc} alt="" className="size-16" />
			</div>
			<img src={wordmarkSrc} alt="IronWallet" className="h-11 w-auto" />
		</div>
	);
}
