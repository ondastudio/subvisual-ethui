import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import playCircleIcon from "../assets/icons/play_circle.svg";
import {
	CloseIcon,
	MuteIcon,
	PauseIcon,
	PlayIcon,
	VolumeIcon,
} from "./VideoIcons";

type VideoPlayerProps = {
	src?: string;
	className?: string;
	poster?: string;
};

const SAMPLE_VIDEO = "https://media.w3.org/2010/05/sintel/trailer.mp4";

function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const closeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [progress, setProgress] = useState(0);
	const [visible, setVisible] = useState(false);

	function handleClose() {
		setVisible(false);
		closeTimerRef.current = setTimeout(onClose, 300);
	}

	const handleCloseRef = useRef(handleClose);
	handleCloseRef.current = handleClose;

	useEffect(() => {
		requestAnimationFrame(() => setVisible(true));
		document.body.style.overflow = "hidden";

		const video = videoRef.current;
		if (video) video.play().catch(() => {});

		function onKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") handleCloseRef.current();
		}
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.body.style.overflow = "";
			document.removeEventListener("keydown", onKeyDown);
			clearTimeout(closeTimerRef.current);
		};
	}, []);

	function togglePlay() {
		const video = videoRef.current;
		if (!video) return;
		if (isPlaying) {
			video.pause();
		} else {
			video.play().catch(() => {});
		}
	}

	function toggleMute() {
		const video = videoRef.current;
		if (!video) return;
		video.muted = !isMuted;
		setIsMuted(!isMuted);
	}

	function handleTimeUpdate() {
		const video = videoRef.current;
		if (!video?.duration) return;
		setProgress(video.currentTime / video.duration);
	}

	function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
		const video = videoRef.current;
		if (!video?.duration) return;
		const val = parseFloat(e.target.value);
		video.currentTime = val * video.duration;
		setProgress(val);
	}

	return createPortal(
		// biome-ignore lint/a11y/noStaticElementInteractions: modal backdrop; keyboard close is handled via document keydown
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-card-dark/80 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
			onClick={handleClose}
			onKeyDown={(e) => {
				if (e.key === "Escape") handleClose();
			}}
			role="presentation"
		>
			<div className="relative w-full h-full flex items-center justify-center p-8">
				<button
					type="button"
					onClick={handleClose}
					className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
					aria-label="Close"
				>
					<CloseIcon />
				</button>

				{/* biome-ignore lint/a11y/noStaticElementInteractions: stops click bubble to backdrop; not an interactive element */}
				<div
					className="relative max-w-full max-h-full group"
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => e.stopPropagation()}
					role="presentation"
				>
					<video
						ref={videoRef}
						src={src}
						loop
						playsInline
						className="max-w-full max-h-[85vh] w-auto cursor-pointer rounded-lg"
						onClick={togglePlay}
						onPlay={() => setIsPlaying(true)}
						onPause={() => setIsPlaying(false)}
						onTimeUpdate={handleTimeUpdate}
					>
						<track kind="captions" />
					</video>

					<div className="absolute bottom-0 left-0 right-0 px-4 pt-8 pb-4 flex items-center gap-3 bg-gradient-to-t from-black/60 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
						<button
							type="button"
							onClick={togglePlay}
							className="text-white/70 hover:text-white transition-colors shrink-0"
							aria-label={isPlaying ? "Pause" : "Play"}
						>
							{isPlaying ? <PauseIcon /> : <PlayIcon />}
						</button>

						<div className="relative flex-1 h-[3px] group/timeline cursor-pointer">
							<div className="absolute inset-0 rounded-full bg-white/20" />
							<div
								className="absolute left-0 top-0 h-full rounded-full bg-white"
								style={{ width: `${progress * 100}%` }}
							/>
							<div
								className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-3 rounded-full bg-white opacity-0 group-hover/timeline:opacity-100 transition-opacity"
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
		</div>,
		document.body,
	);
}

export default function VideoPlayer({
	src = SAMPLE_VIDEO,
	className = "",
	poster,
}: VideoPlayerProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				className={`group relative overflow-hidden rounded-md cursor-pointer ${className}`}
				onClick={() => setIsOpen(true)}
				aria-label="Play video"
			>
				<video
					src={src}
					poster={poster}
					preload="metadata"
					muted
					playsInline
					className="block w-full h-full object-cover pointer-events-none"
				>
					<track kind="captions" />
				</video>
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="size-12 rounded-full bg-dark flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
						<img src={playCircleIcon.src} alt="" className="size-6" />
					</div>
				</div>
			</button>

			{isOpen && <VideoModal src={src} onClose={() => setIsOpen(false)} />}
		</>
	);
}
