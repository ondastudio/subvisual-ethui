import ironLogo from "../../assets/logos/iron-logo.svg";

export function IronLogo() {
	return (
		<img
			src={ironLogo.src}
			alt="IronWallet"
			className="w-full max-w-[25rem] h-auto"
		/>
	);
}
