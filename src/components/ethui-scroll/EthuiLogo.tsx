import ethuiMonogram from "../../assets/logos/ethui-monogram.svg";

export function EthuiLogo() {
	return (
		<div className="flex items-center gap-4 lg:gap-6 w-full max-w-64 lg:max-w-[25rem]">
			<img
				src={ethuiMonogram.src}
				alt=""
				className="size-[4.5rem] lg:size-24 shrink-0"
			/>
			<span
				className="font-bold leading-none text-dark text-[3.5rem] lg:text-[4.5rem]"
				style={{
					fontFamily: "'Source Code Pro', monospace",
					letterSpacing: "-0.14rem",
				}}
			>
				ethui
			</span>
		</div>
	);
}
