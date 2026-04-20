function ArrowIcon() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

type ButtonProps = {
	children: React.ReactNode;
	href?: string;
	variant?:
		| "filled"
		| "outline"
		| "secondary"
		| "dashed"
		| "outline-purple"
		| "filled-purple"
		| "filled-indigo"
		| "dashed-indigo"
		| "outline-pink"
		| "filled-pink";
	className?: string;
	onClick?: (e?: React.MouseEvent) => void;
	disabled?: boolean;
};

const outlineCircleColor: Record<string, string> = {
	outline: "bg-blue-default",
	"outline-purple": "bg-purple-default",
	"outline-pink": "bg-pink-600",
};

export default function Button({
	children,
	href,
	variant = "outline",
	className = "",
	onClick,
	disabled = false,
}: ButtonProps) {
	const base =
		"inline-flex items-center justify-center h-12 px-6 rounded-pill font-body text-body-md leading-body-md whitespace-nowrap transition-colors";

	const activeVariants: Record<string, string> = {
		filled: "bg-blue-default text-white hover:bg-blue-hover cursor-pointer",
		outline:
			"border border-blue-default text-blue-default bg-transparent group-hover:bg-blue-default group-hover:text-white cursor-pointer",
		secondary:
			"bg-white text-blue-default hover:bg-blue-default hover:text-white cursor-pointer",
		dashed:
			"border border-dashed border-blue-default text-blue-default bg-transparent hover:bg-blue-default hover:text-white cursor-pointer",
		"outline-purple":
			"border border-purple-default text-purple-default bg-transparent group-hover:bg-purple-default group-hover:text-white cursor-pointer",
		"filled-purple":
			"bg-purple-default text-white hover:bg-purple-hover cursor-pointer",
		"filled-indigo":
			"bg-indigo-default text-white hover:bg-indigo-hover cursor-pointer",
		"dashed-indigo":
			"border border-dashed border-indigo-default text-indigo-default bg-transparent hover:bg-indigo-default hover:text-white cursor-pointer",
		"outline-pink":
			"border border-pink-600 text-pink-600 bg-transparent group-hover:bg-pink-600 group-hover:text-white cursor-pointer",
		"filled-pink": "bg-pink-500 text-white hover:bg-pink-600 cursor-pointer",
	};

	const disabledVariants: Record<string, string> = {
		filled: "bg-muted text-white cursor-not-allowed",
		outline: "border border-muted text-muted bg-transparent cursor-not-allowed",
		secondary: "bg-muted text-white cursor-not-allowed",
		dashed:
			"border border-dashed border-muted text-muted bg-transparent cursor-not-allowed",
		"outline-purple":
			"border border-muted text-muted bg-transparent cursor-not-allowed",
		"filled-purple": "bg-muted text-white cursor-not-allowed",
		"filled-indigo": "bg-muted text-white cursor-not-allowed",
		"dashed-indigo":
			"border border-dashed border-muted text-muted bg-transparent cursor-not-allowed",
		"outline-pink":
			"border border-muted text-muted bg-transparent cursor-not-allowed",
		"filled-pink": "bg-muted text-white cursor-not-allowed",
	};

	const isOutline = variant in outlineCircleColor;

	if (isOutline && !disabled) {
		const buttonClasses = `${base} ${activeVariants[variant]}`.trim();
		const circleColor = outlineCircleColor[variant];
		const Tag = href ? "a" : "button";

		return (
			<div className={`group inline-flex items-center ${className}`.trim()}>
				<Tag href={href} className={buttonClasses} onClick={onClick}>
					{children}
				</Tag>
				<div
					className={`size-12 rounded-full ${circleColor} flex items-center justify-center text-white shrink-0 opacity-0 ml-[-3rem] group-hover:opacity-100 group-hover:ml-0.5 transition-all duration-200 ease-out pointer-events-none`}
				>
					<ArrowIcon />
				</div>
			</div>
		);
	}

	const variantClasses = disabled
		? disabledVariants[variant]
		: activeVariants[variant];
	const classes = `${base} ${variantClasses} ${className}`.trim();

	if (href && !disabled) {
		return (
			<a href={href} className={classes} onClick={onClick}>
				{children}
			</a>
		);
	}

	return (
		<button
			type="button"
			className={classes}
			onClick={disabled ? undefined : onClick}
			disabled={disabled}
			aria-disabled={disabled || undefined}
		>
			{children}
		</button>
	);
}
