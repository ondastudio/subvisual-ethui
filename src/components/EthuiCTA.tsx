import Button from "./Button";

export default function EthuiCTA() {
	return (
		<section className="max-w-7xl mx-auto w-full px-5 lg:px-4 py-24 lg:py-30 flex flex-col items-center text-center gap-10">
			<h2 className="font-heading text-h1 leading-h1 tracking-h1 text-dark">
				What is ethui?
			</h2>
			<Button
				href="https://calendar.app.google/pHJwjv1vuhyxwCU67"
				variant="outline"
			>
				Book Intro
			</Button>
		</section>
	);
}
