import arrowForwardIcon from "../../assets/icons/arrow-forward.svg";
import Link from "../Link";
import { FundingLogos } from "./FundingLogos";

const socialLinks = [
	{ label: "Linkedin", href: "https://linkedin.com/company/wearesubvisual" },
	{ label: "X (Twitter)", href: "https://x.com/subvisual" },
	{ label: "GitHub", href: "https://github.com/subvisual" },
	{ label: "Dribbble", href: "https://dribbble.com/subvisual" },
	{ label: "YouTube", href: "https://www.youtube.com/@wearesubvisual" },
];

type FooterProps = {
	theme?: "blue" | "purple" | "indigo";
};

const themeColors: Record<string, string> = {
	blue: "bg-blue-default",
	purple: "bg-purple-default",
	indigo: "bg-indigo-default",
};

const themeHoverColors: Record<string, string> = {
	blue: "hover:bg-blue-hover",
	purple: "hover:bg-purple-hover",
	indigo: "hover:bg-indigo-hover",
};

const MAILCHIMP_URL =
	"https://subvisual.us5.list-manage.com/subscribe/post?u=79f7816bac08905f81c1a8689&id=f8b8f31221";
const MAILCHIMP_HONEYPOT = "b_79f7816bac08905f81c1a8689_f8b8f31221";

export default function Footer({ theme = "blue" }: FooterProps) {
	const bgColor = themeColors[theme];
	const submitBg = `${themeColors[theme]} ${themeHoverColors[theme]}`;
	return (
		<footer className="max-w-[1920px] mx-auto w-full px-5 lg:px-4">
			<div
				id="footer-blue-box"
				className={`mt-0.5 ${bgColor} rounded-2xl px-6 lg:px-8 pt-10 lg:pt-15 pb-10 lg:pb-15 overflow-hidden`}
			>
				<div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-stretch lg:justify-between gap-10 lg:gap-8">
					{/* Left: tagline */}
					<div className="lg:w-110.25 shrink-0 flex flex-col">
						<p className="font-body text-h3 leading-h3 tracking-h3 text-white">
							We build products and the companies behind them.
						</p>
						<div className="hidden lg:block mt-auto">
							<p className="font-body text-body-md leading-body-md text-white">
								© Subvisual 2026
							</p>
							<p className="font-body text-body-md text-white mt-2">
								Shaped by{" "}
								<a
									href="https://www.ondastudio.co/"
									target="_blank"
									rel="noopener noreferrer"
									className="underline"
								>
									Onda
								</a>
							</p>
						</div>
					</div>

					{/* Right: links + email + funding logos */}
					<div className="flex flex-col gap-10 lg:gap-8 flex-1">
						<div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-8">
							<div className="flex gap-12">
								<div className="flex flex-col gap-6">
									<span className="font-body font-medium text-body-md text-white">
										Social
									</span>
									{socialLinks.map((link) => (
										<Link
											key={link.label}
											href={link.href}
											variant="inverted"
											target="_blank"
											rel="noopener noreferrer"
										>
											{link.label}
										</Link>
									))}
								</div>
								<div className="flex flex-col gap-6">
									<span className="font-body font-medium text-body-md text-white">
										Company
									</span>
									<Link
										href="https://jobs.subvisual.com/"
										variant="inverted"
										target="_blank"
										rel="noopener noreferrer"
									>
										Careers
									</Link>
								</div>
								<div className="flex flex-col gap-6">
									<span className="font-body font-medium text-body-md text-white">
										Legal
									</span>
									<Link
										href="https://subvisual.com/privacy"
										variant="inverted"
										target="_blank"
										rel="noopener noreferrer"
									>
										Privacy Policy
									</Link>
									<Link
										href="https://subvisual.com/terms"
										variant="inverted"
										target="_blank"
										rel="noopener noreferrer"
									>
										Terms
									</Link>
								</div>
							</div>

							<div className="order-first md:order-last flex flex-col gap-6 lg:w-77.75">
								<p className="font-body text-body-md text-white">
									Get occasional notes from the team and the Sandbox Playbook.
								</p>
								<form
									action={MAILCHIMP_URL}
									method="post"
									target="_blank"
									noValidate
									className="bg-white rounded-pill pl-6 pr-0.5 py-0.5 flex items-center"
									rel="noopener"
								>
									<input
										type="email"
										name="EMAIL"
										placeholder="Enter your email"
										aria-label="Email address"
										required
										className="flex-1 font-body text-body-md text-dark outline-none bg-transparent"
									/>
									<div
										style={{ position: "absolute", left: "-5000px" }}
										aria-hidden="true"
									>
										<input
											type="text"
											name={MAILCHIMP_HONEYPOT}
											tabIndex={-1}
											defaultValue=""
										/>
									</div>
									<button
										type="submit"
										aria-label="Subscribe"
										className={`size-12 rounded-full ${submitBg} flex items-center justify-center shrink-0 cursor-pointer transition-colors duration-200`}
									>
										<img
											src={arrowForwardIcon.src}
											alt="Submit"
											className="size-6 invert brightness-0"
										/>
									</button>
								</form>

								{/* Funding logos (desktop) */}
								<div className="hidden md:block">
									<FundingLogos />
								</div>
							</div>
						</div>

						{/* Funding logos (mobile) */}
						<div className="md:hidden">
							<FundingLogos />
						</div>
					</div>

					<div className="lg:hidden">
						<p className="font-body text-body-md leading-body-md text-white">
							© Subvisual 2026
						</p>
						<p className="font-body text-body-md text-white mt-2">
							Shaped by{" "}
							<a
								href="https://www.ondastudio.co/"
								target="_blank"
								rel="noopener noreferrer"
								className="underline"
							>
								Onda
							</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
