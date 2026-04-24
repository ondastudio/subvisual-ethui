export function FeatureCard({
	title,
	body,
	visible,
}: {
	title: string;
	body: string;
	visible: boolean;
}) {
	return (
		<div
			className={`bg-surface-page rounded-2xl p-10 flex flex-col gap-2 shrink-0 transition-all duration-700 ease-out ${
				visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
			}`}
		>
			<h3 className="text-h3 tracking-h3 font-body font-normal text-dark">
				{title}
			</h3>
			<p className="text-body-md text-dark leading-[1.25] md:max-w-[560px]">
				{body}
			</p>
		</div>
	);
}
