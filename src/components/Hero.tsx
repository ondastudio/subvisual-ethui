import { useEffect, useRef, useState } from "react";
import ethuiMonogramSrc from "../assets/logos/ethui-monogram.svg";
import { MuteIcon, PauseIcon, PlayIcon, VolumeIcon } from "./VideoIcons";

const PLACEHOLDER_VIDEO =
	"https://ethui-assets.subvisual.com/Desktop%20Walkthrough.mp4";

type HeroProps = {
	videoSrc?: string;
};

export default function Hero({ videoSrc = PLACEHOLDER_VIDEO }: HeroProps) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const logoRef = useRef<HTMLDivElement>(null);
	const videoWrapRef = useRef<HTMLDivElement>(null);
	const videoElRef = useRef<HTMLVideoElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const controlsRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLParagraphElement>(null);

	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(true);
	const [progress, setProgress] = useState(0);
	const scrollPlayStateRef = useRef<"playing" | "paused" | null>(null);

	useEffect(() => {
		const scrollDistance = window.innerHeight * 3;

		function onScroll() {
			const wrapper = wrapperRef.current;
			const logo = logoRef.current;
			const videoWrap = videoWrapRef.current;
			const videoEl = videoElRef.current;
			const overlay = overlayRef.current;
			const controls = controlsRef.current;
			const text = textRef.current;
			if (
				!wrapper ||
				!logo ||
				!videoWrap ||
				!videoEl ||
				!overlay ||
				!controls ||
				!text
			)
				return;

			const raw = -wrapper.getBoundingClientRect().top;
			const p = Math.max(0, Math.min(raw / scrollDistance, 1));

			logo.style.opacity = String(1 - Math.max(0, Math.min(p / 0.2, 1)));

			const videoIn = Math.max(0, Math.min((p - 0.15) / 0.25, 1));
			videoWrap.style.opacity = String(videoIn);

			const textIn = Math.max(0, Math.min((p - 0.7) / 0.2, 1));
			overlay.style.opacity = String(textIn * 0.8);
			// Hide controls when text appears; otherwise let CSS hover take over
			controls.style.opacity = textIn > 0 ? "0" : "";

			text.style.opacity = String(textIn);
			text.style.transform = `translateY(${(1 - textIn) * 20}px)`;

			const shouldPlay = videoIn > 0 && textIn === 0;
			if (shouldPlay && scrollPlayStateRef.current !== "playing") {
				videoEl.play().catch(() => {});
				scrollPlayStateRef.current = "playing";
			} else if (!shouldPlay && scrollPlayStateRef.current !== "paused") {
				videoEl.pause();
				scrollPlayStateRef.current = "paused";
			}
		}

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	function togglePlay() {
		const video = videoElRef.current;
		if (!video) return;
		if (isPlaying) {
			video.pause();
		} else {
			video.play().catch(() => {});
		}
	}

	function toggleMute() {
		const video = videoElRef.current;
		if (!video) return;
		video.muted = !isMuted;
		setIsMuted(!isMuted);
	}

	function handleTimeUpdate() {
		const video = videoElRef.current;
		if (!video?.duration) return;
		setProgress(video.currentTime / video.duration);
	}

	function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
		const video = videoElRef.current;
		if (!video?.duration) return;
		const val = parseFloat(e.target.value);
		video.currentTime = val * video.duration;
		setProgress(val);
	}

	return (
		<div ref={wrapperRef} style={{ height: "calc(100vh + 300vh)" }}>
			<section className="sticky top-0 h-screen p-4 overflow-hidden">
				<div className="bg-card-dark rounded-2xl h-full overflow-hidden relative flex items-center justify-center">
					{/* Logo */}
					<div
						ref={logoRef}
						className="absolute inset-0 flex flex-col items-center justify-center gap-7 px-4 will-change-[opacity]"
					>
						<div className="flex items-center gap-7">
							<img
								src={ethuiMonogramSrc.src}
								alt="ethui monogram"
								className="size-[78px] lg:size-[114px]"
							/>
							<p
								className="font-bold text-white leading-[0.9] tracking-[-0.03em] text-[62px] lg:text-[90px]"
								style={{ fontFamily: "'Source Code Pro', monospace" }}
							>
								<span>eth</span>
								<span style={{ letterSpacing: "-0.8px" }}>u</span>
								<span>i</span>
							</p>
						</div>
						<p className="text-white text-center font-body text-h5 leading-[1.167] tracking-[-0.24px] max-w-[350px] lg:max-w-[632px]">
							We built the Ethereum developer tool we wished existed. Then the
							community showed up.
						</p>
					</div>

					{/* Video + Controls */}
					<div
						ref={videoWrapRef}
						className="absolute inset-0 flex items-center justify-center will-change-[opacity]"
						style={{ opacity: 0 }}
					>
						<div className="relative h-[80%] max-w-[90%] group">
							<video
								ref={videoElRef}
								src={videoSrc}
								loop
								muted
								playsInline
								className="h-full w-auto will-change-[opacity] cursor-pointer rounded-lg"
								onClick={togglePlay}
								onPlay={() => setIsPlaying(true)}
								onPause={() => setIsPlaying(false)}
								onTimeUpdate={handleTimeUpdate}
							>
								<track kind="captions" />
							</video>

							<div
								ref={controlsRef}
								className="absolute bottom-0 left-0 right-0 px-4 pt-8 pb-4 flex items-center gap-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
							>
								<button
									type="button"
									onClick={togglePlay}
									className="text-white/70 hover:text-white transition-colors shrink-0"
									aria-label={isPlaying ? "Pause" : "Play"}
								>
									{isPlaying ? (
										<PauseIcon className="size-5" />
									) : (
										<PlayIcon className="size-5" />
									)}
								</button>

								<div className="relative flex-1 h-[3px] group cursor-pointer">
									<div className="absolute inset-0 rounded-full bg-white/20" />
									<div
										className="absolute left-0 top-0 h-full rounded-full bg-white transition-none"
										style={{ width: `${progress * 100}%` }}
									/>
									<div
										className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"
										style={{ left: `${progress * 100}%` }}
									/>
									<input
										type="range"
										min={0}
										max={1}
										step={0.001}
										value={progress}
										onChange={handleSeek}
										className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
										aria-label="Seek"
									/>
								</div>

								<button
									type="button"
									onClick={toggleMute}
									className="text-white/70 hover:text-white transition-colors shrink-0"
									aria-label={isMuted ? "Unmute" : "Mute"}
								>
									{isMuted ? <MuteIcon /> : <VolumeIcon />}
								</button>
							</div>
						</div>
					</div>

					<div
						ref={overlayRef}
						className="absolute inset-0 bg-card-dark pointer-events-none will-change-[opacity]"
						style={{ opacity: 0 }}
					/>

					<p
						ref={textRef}
						className="absolute px-4 text-white text-center font-body text-h5 leading-[1.167] tracking-[-0.24px] max-w-[350px] lg:max-w-[632px] will-change-[opacity,transform]"
						style={{ opacity: 0, transform: "translateY(20px)" }}
					>
						ethui is an open-source Ethereum developer toolkit that fills the
						gap between your code editor and the blockchain. It's a
						desktop-native wallet built in Rust with Tauri, designed for
						developers who use Foundry or Hardhat daily. We built it because
						nothing else existed.
					</p>
				</div>
			</section>
		</div>
	);
}
