import type React from "react";

type FAQItem = {
	number: string;
	question: string;
	answer: React.ReactNode | null;
};

const defaultFaqs: FAQItem[] = [
	{
		number: "01",
		question: "What is ethui?",
		answer:
			"ethui is an open-source, desktop-native Ethereum developer toolkit built with Tauri (Rust + React). It provides a Foundry-aware wallet, a local block explorer, contract ABI detection, account impersonation, and one-click cloud testnets via Stacks. It is built and maintained by Subvisual.",
	},
	{
		number: "02",
		question: "How is ethui different from MetaMask?",
		answer:
			"MetaMask is a browser-extension wallet designed for end users interacting with live chains. ethui is a desktop application designed for developers working with local Foundry/Anvil environments. ethui monitors your filesystem, detects contract deploys automatically, matches bytecode to ABIs without manual verification, and supports developer-specific features like account impersonation and fast mode.",
	},
	{
		number: "03",
		question: "Does ethui work with Foundry and Anvil?",
		answer:
			"Yes. ethui is built specifically for Foundry workflows. It syncs with Anvil nodes in real time, watches your forge output directory for compiled contracts, and uses bytecode matching to automatically resolve ABIs for deployed contracts. All Anvil cheatcodes—including impersonation and balance setting—work natively.",
	},
	{
		number: "04",
		question: "What is ethui Stacks?",
		answer:
			"ethui Stacks is a self-hosted tool for creating persistent, cloud-based Anvil testnets. Each stack includes an Anvil node with a unique chain ID, an authenticated RPC URL, a connected block explorer, and a faucet. Stacks support mainnet forking and can be shared with a team via URL.",
	},
	{
		number: "05",
		question: "Is ethui open source?",
		answer: null,
	},
];

type FAQsProps = {
	items?: FAQItem[];
	theme?: "blue" | "purple";
	label?: string;
};

export type { FAQItem };

export default function FAQs({
	items = defaultFaqs,
	theme = "blue",
	label = "FAQ'S",
}: FAQsProps) {
	const labelColor = theme === "purple" ? "text-purple-default" : "text-dark";
	const borderColor =
		theme === "purple" ? "border-purple-default/30" : "border-border-secondary";

	return (
		<section className="max-w-[1920px] mx-auto w-full px-5 lg:px-4 flex flex-col gap-10 items-center">
			<p className={`uppercase font-body text-body-xsm ${labelColor}`}>
				{label}
			</p>
			<div className="flex flex-col gap-10 w-full">
				{items.map((faq) => (
					<div
						key={faq.number}
						className={`border-t ${borderColor} grid grid-cols-[2rem_1fr] lg:grid-cols-12`}
					>
						<div className="pt-4 pb-10 lg:col-span-4">
							<span className="font-body text-body-xsm uppercase text-dark">
								{faq.number}
							</span>
						</div>

						<div
							className={`border-l ${borderColor} h-auto lg:h-[200px] flex flex-col justify-between gap-4 lg:gap-0 pt-4 lg:pt-10 pb-6 lg:pb-0 px-5 lg:px-10 lg:col-span-8`}
						>
							<p className="font-heading text-h3 tracking-h3 text-dark">
								{faq.question}
							</p>
							{faq.answer ? (
								<p className="font-body text-body-md leading-body-md text-dark whitespace-pre-line max-w-[560px] lg:max-w-[638px]">
									{faq.answer}
								</p>
							) : (
								<a
									href="https://github.com/subvisual/ethui"
									className={`font-body text-body-md leading-body-md ${theme === "purple" ? "link-purple" : "link"}`}
								>
									View on GitHub
								</a>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
