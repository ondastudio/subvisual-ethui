import { useState } from "react";
import stablesSymbolSrc from "../assets/stables-symbol.svg";
import stablesWordmarkSrc from "../assets/stables-wordmark.svg";
import wordmarkSrc from "../assets/subvisual-logo.svg";
import symbolSrc from "../assets/subvisual-symbol.svg";
import Button from "./Button";

const NAV_LINKS: { label: string; fullLabel?: string; href: string }[] = [
	{ label: "Product", href: "/product" },
	{ label: "Venture", href: "/venture" },
	{ label: "Stables", href: "/stables" },
	{ label: "Content", href: "https://content.subvisual.com" },
	{ label: "Academy", href: "https://jobs.subvisual.com/academy" },
];

type NavbarProps = {
	type?: "primary" | "secondary";
	activeLink?: string;
	ctaVariant?: "filled" | "filled-purple" | "filled-indigo";
	logo?: "subvisual" | "stables";
	onCtaClick?: () => void;
};

export default function Navbar({
	type = "primary",
	activeLink,
	ctaVariant = "filled",
	logo = "subvisual",
	onCtaClick,
}: NavbarProps) {
	const [menuOpen, setMenuOpen] = useState(false);
	const isPrimary = type === "primary";
	const isStables = logo === "stables";
	const currentWordmark = isStables ? stablesWordmarkSrc : wordmarkSrc;
	const currentSymbol = isStables ? stablesSymbolSrc : symbolSrc;

	const accentColor =
		ctaVariant === "filled-purple"
			? "var(--color-purple-default)"
			: ctaVariant === "filled-indigo"
				? "var(--color-indigo-default)"
				: "var(--color-blue-default)";

	return (
		<div className="relative">
			{menuOpen && (
				<div className="lg:hidden absolute bottom-full left-0 right-0 mb-2 bg-white rounded-2xl pt-2 pb-0">
					<div className="flex flex-col px-8">
						{NAV_LINKS.map(({ label, href }) => (
							<a
								key={label}
								href={href}
								className={`py-6 border-b border-border-secondary font-body text-body-md leading-body-md ${
									activeLink === label
										? "font-medium text-blue-default"
										: "text-dark"
								}`}
							>
								{label}
							</a>
						))}
					</div>
				</div>
			)}

			<nav
				className={`bg-white backdrop-blur-[2px] rounded-navbar pl-4 lg:pl-8 pr-2 py-2 flex items-center ${
					isPrimary
						? "mx-auto w-full max-w-7xl justify-between"
						: "gap-6 lg:gap-7.5"
				}`}
			>
				<a href="/" className="lg:hidden">
					<img
						src={currentSymbol.src}
						alt="Subvisual"
						className="h-7 w-auto max-w-none"
					/>
				</a>
				<a href="/" className="hidden lg:block">
					<img
						src={isPrimary ? currentWordmark.src : currentSymbol.src}
						alt="Subvisual"
						className={`w-auto ${isPrimary ? "h-6" : "h-7 max-w-none"}`}
					/>
				</a>

				<button
					type="button"
					className="lg:hidden size-12 rounded-full flex items-center justify-center"
					style={{
						backgroundColor: menuOpen ? accentColor : "transparent",
					}}
					aria-label={menuOpen ? "Close menu" : "Open menu"}
					onClick={() => setMenuOpen(!menuOpen)}
				>
					{menuOpen ? (
						<svg
							aria-hidden="true"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M18 6L6 18M6 6l12 12"
								stroke="white"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					) : (
						<svg
							aria-hidden="true"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<mask
								id="burger-mask"
								style={{ maskType: "alpha" }}
								maskUnits="userSpaceOnUse"
								x="0"
								y="0"
								width="24"
								height="24"
							>
								<rect width="24" height="24" fill="#D9D9D9" />
							</mask>
							<g mask="url(#burger-mask)">
								<path d="M5 6H20M5 12.5H20M5 19H20" stroke={accentColor} />
							</g>
						</svg>
					)}
				</button>

				<div className="flex items-center gap-3 lg:gap-11">
					{NAV_LINKS.map(({ label, fullLabel, href }) => {
						const displayLabel = fullLabel
							? isPrimary
								? fullLabel
								: label
							: label;

						return (
							<a
								key={label}
								href={href}
								className={`hidden lg:inline-flex flex-col items-center font-body text-body-md leading-body-md link-secondary ${
									activeLink === label ? "font-medium" : "font-normal"
								}`}
							>
								{fullLabel && !isPrimary ? (
									<>
										<span className="nav-full-label hidden">{fullLabel}</span>
										<span className="nav-short-label">{label}</span>
									</>
								) : (
									displayLabel
								)}
								<span
									className="h-0 overflow-hidden font-medium invisible"
									aria-hidden="true"
								>
									{displayLabel}
								</span>
							</a>
						);
					})}
					<Button
						href="https://calendar.app.google/pHJwjv1vuhyxwCU67"
						variant={ctaVariant}
						onClick={onCtaClick}
					>
						Book Intro
					</Button>
				</div>
			</nav>
		</div>
	);
}
