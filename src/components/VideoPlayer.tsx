import { useRef, useState } from "react";
import playCircleIcon from "../assets/icons/play_circle.svg";
import pauseCircleIcon from "../assets/icons/stop_circle.svg";

type VideoPlayerProps = {
	src?: string;
	className?: string;
};

const SAMPLE_VIDEO = "https://media.w3.org/2010/05/sintel/trailer.mp4";

export default function VideoPlayer({
	src = SAMPLE_VIDEO,
	className = "",
}: VideoPlayerProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	function handleButtonClick() {
		const video = videoRef.current;
		if (!video) return;
		if (isPlaying) {
			video.pause();
		} else {
			video.play().catch(() => setIsPlaying(false));
		}
	}

	return (
		<button
			type="button"
			className={`group relative overflow-hidden rounded-md cursor-pointer ${className}`}
			onClick={handleButtonClick}
			aria-label={isPlaying ? "Pause" : "Play"}
		>
			<video
				ref={videoRef}
				src={`${src}#t=0.001`}
				preload="metadata"
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
				onEnded={() => setIsPlaying(false)}
				className="block w-full h-full object-cover pointer-events-none"
			>
				<track kind="captions" />
			</video>
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div
					aria-hidden="true"
					className={[
						"size-12 rounded-full bg-[#403f4c] flex items-center justify-center transition-opacity duration-200",
						isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100",
					].join(" ")}
				>
					<img
						src={isPlaying ? pauseCircleIcon.src : playCircleIcon.src}
						alt=""
						className="size-6"
					/>
				</div>
			</div>
		</button>
	);
}
