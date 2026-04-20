type LinkProps = {
	children: React.ReactNode;
	href: string;
	variant?: "primary" | "purple" | "secondary" | "inverted" | "disabled";
	className?: string;
	target?: string;
	rel?: string;
};

const variantClasses: Record<string, string> = {
	primary: "link",
	purple: "link-purple",
	secondary: "link-secondary",
	inverted: "link-inverted",
	disabled: "link-disabled",
};

export default function Link({
	children,
	href,
	variant = "primary",
	className = "",
	target,
	rel,
}: LinkProps) {
	const classes = [
		variantClasses[variant],
		"font-body text-body-md leading-body-md",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<a href={href} className={classes} target={target} rel={rel}>
			{children}
		</a>
	);
}
