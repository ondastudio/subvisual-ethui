const IMG_ETHUI_MONOGRAM =
	"https://www.figma.com/api/mcp/asset/68332fe1-4efb-4800-97c3-27a95029234b";

export function EthuiLogo() {
	return (
		<div className="flex items-center gap-6">
			<img src={IMG_ETHUI_MONOGRAM} alt="" className="size-24" />
			<span
				className="font-bold leading-none text-dark"
				style={{
					fontFamily: "'Source Code Pro', monospace",
					fontSize: "4.5rem",
					letterSpacing: "-0.14rem",
				}}
			>
				ethui
			</span>
		</div>
	);
}
