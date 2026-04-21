import compete2030_1 from "../../assets/logos/compete2030-1.png";
import compete2030_2 from "../../assets/logos/compete2030-2.png";
import compete2030_3 from "../../assets/logos/compete2030-3.png";
import dribbbleSelectBadge from "../../assets/logos/dribbble-select-badge.svg";
import norte2020_1 from "../../assets/logos/norte2020-1.png";
import norte2020_2 from "../../assets/logos/norte2020-2.png";
import norte2020_3 from "../../assets/logos/norte2020-3.png";
import norte2020_4 from "../../assets/logos/norte2020-4.png";

const COMPETE_2030_URL =
	"https://drive.google.com/file/d/1Mh6DgXLfEEvk7d6vz3OvBGlJCHbvJlKF/view?usp=sharing";
const NORTE_2020_URL =
	"https://drive.google.com/file/d/1O017VWq7ztHDjBNKx4H3PR9bK4Pxi2gP/view";

export function FundingLogos() {
	return (
		<div className="flex flex-col gap-6">
			<a href={COMPETE_2030_URL} target="_blank" rel="noopener noreferrer">
				<div className="flex flex-wrap items-center gap-6">
					<img src={compete2030_1.src} alt="Compete 2030" className="h-8" />
					<img src={compete2030_2.src} alt="Portugal 2030" className="h-6" />
					<img
						src={compete2030_3.src}
						alt="Cofinanciado pela União Europeia"
						className="h-6"
					/>
				</div>
			</a>
			<a href={NORTE_2020_URL} target="_blank" rel="noopener noreferrer">
				<div className="flex flex-wrap items-center gap-6">
					<img src={norte2020_1.src} alt="Norte 2020" className="h-5" />
					<img src={norte2020_2.src} alt="Portugal 2020" className="h-5" />
					<img
						src={norte2020_3.src}
						alt="União Europeia - Fundos Estruturais"
						className="h-6"
					/>
					<img
						src={norte2020_4.src}
						alt="União Europeia - Fundo Europeu de Desenvolvimento Regional"
						className="h-6"
					/>
				</div>
			</a>
			<a
				href="https://dribbble.com/subvisual"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					src={dribbbleSelectBadge.src}
					alt="Dribbble Select"
					className="h-8"
				/>
			</a>
		</div>
	);
}
