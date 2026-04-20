export interface NavbarOptions {
	readyGate?: () => boolean;
}

export interface NavbarController {
	applyNavbarState: (heroVisible: boolean) => void;
	checkDock: () => void;
	get docked(): boolean;
	get switching(): boolean;
	destroy: () => void;
}

export function initNavbar(options: NavbarOptions = {}): NavbarController {
	const primary = document.getElementById("navbar-primary") as HTMLElement;
	const secondary = document.getElementById("navbar-secondary") as HTMLElement;
	const wrapper = document.getElementById("navbar-wrapper") as HTMLElement;
	const dock = document.getElementById("footer-navbar-dock") as HTMLElement;
	const secondaryNav = secondary.querySelector("nav") as HTMLElement;

	let docked = false;
	let dockPageY = 0;
	let cachedNavWidth = 0;
	let showingPrimary = true;
	let switching = false;

	function showPrimary() {
		primary.style.opacity = "1";
		primary.style.pointerEvents = "";
		secondary.classList.add("opacity-0");
		secondary.classList.remove("opacity-100");
		secondary.classList.add("pointer-events-none");
	}

	function showSecondary() {
		primary.style.opacity = "0";
		primary.style.pointerEvents = "none";
		secondary.classList.remove("opacity-0");
		secondary.classList.add("opacity-100");
		secondary.classList.remove("pointer-events-none");
	}

	function applyNavbarState(heroVisible: boolean) {
		const wantPrimary = heroVisible;
		if (wantPrimary === showingPrimary) return;
		if (switching) return;
		showingPrimary = wantPrimary;

		if (wantPrimary) {
			const navWidth = secondaryNav.getBoundingClientRect().width;
			const targetWidth =
				wrapper.parentElement?.getBoundingClientRect().width ?? 1280;
			showPrimary();
			wrapper.style.maxWidth = "none";
			wrapper.style.width = `${navWidth}px`;
			wrapper.style.transition = "none";
			void wrapper.offsetWidth;
			wrapper.style.transition = "width 0.25s ease-out";
			wrapper.style.width = `${Math.min(targetWidth, 1280)}px`;
			switching = true;
			wrapper.addEventListener("transitionend", function handler() {
				wrapper.removeEventListener("transitionend", handler);
				wrapper.style.width = "";
				wrapper.style.maxWidth = "";
				wrapper.style.transition = "";
				switching = false;
			});
		} else {
			const wrapperWidth = wrapper.getBoundingClientRect().width;
			const navWidth = secondaryNav.getBoundingClientRect().width;
			showSecondary();
			secondary.style.width = "100%";
			secondary.style.left = "0";
			secondary.style.translate = "0 0";
			secondaryNav.style.width = "100%";
			secondaryNav.style.justifyContent = "space-between";
			wrapper.style.maxWidth = "none";
			wrapper.style.width = `${wrapperWidth}px`;
			wrapper.style.transition = "none";
			void wrapper.offsetWidth;
			wrapper.style.transition = "width 0.25s ease-in";
			wrapper.style.width = `${navWidth}px`;
			switching = true;
			wrapper.addEventListener("transitionend", function handler() {
				wrapper.removeEventListener("transitionend", handler);
				wrapper.style.width = "";
				wrapper.style.maxWidth = "";
				wrapper.style.transition = "";
				secondary.style.width = "";
				secondary.style.left = "";
				secondary.style.translate = "";
				secondaryNav.style.width = "";
				secondaryNav.style.justifyContent = "";
				switching = false;
			});
		}
	}

	function getDockWidth() {
		const blueBox = document.getElementById("footer-blue-box");
		if (blueBox) return blueBox.getBoundingClientRect().width;
		return dock.getBoundingClientRect().width;
	}

	function undock() {
		docked = false;
		toggleDockedLabels(false);
		const dockWidth = getDockWidth();

		wrapper.style.position = "";
		wrapper.style.bottom = "";
		wrapper.style.top = "";
		wrapper.style.left = "";
		wrapper.style.translate = "";
		wrapper.style.maxWidth = "none";
		wrapper.style.width = `${dockWidth}px`;
		wrapper.style.transition = "none";
		void wrapper.offsetWidth;
		wrapper.style.transition = "width 0.25s ease-in";
		wrapper.style.width = `${cachedNavWidth}px`;

		wrapper.addEventListener("transitionend", function handler() {
			wrapper.removeEventListener("transitionend", handler);
			wrapper.style.width = "";
			wrapper.style.maxWidth = "";
			wrapper.style.transition = "";
			secondary.style.width = "";
			secondary.style.left = "";
			secondary.style.translate = "";
			secondaryNav.style.width = "";
			secondaryNav.style.justifyContent = "";
			showingPrimary = false;
			showSecondary();
		});
	}

	function toggleDockedLabels(show: boolean) {
		secondary.querySelectorAll(".nav-full-label").forEach((el) => {
			(el as HTMLElement).style.display = show ? "inline" : "";
		});
		secondary.querySelectorAll(".nav-short-label").forEach((el) => {
			(el as HTMLElement).style.display = show ? "none" : "";
		});
	}

	function dockNavbar() {
		const dockRect = dock.getBoundingClientRect();
		const wrapperRect = wrapper.getBoundingClientRect();

		dockPageY = dockRect.top + window.scrollY;
		const wrapperHeight = wrapperRect.height;
		const dockWidth = getDockWidth();
		const navWidth = secondaryNav.getBoundingClientRect().width;
		cachedNavWidth = navWidth;

		docked = true;
		toggleDockedLabels(true);
		wrapper.style.position = "absolute";
		wrapper.style.bottom = "auto";
		wrapper.style.left = "50%";
		wrapper.style.translate = "-50% 0";
		wrapper.style.top = `${dockPageY - wrapperHeight}px`;
		wrapper.style.width = `${navWidth}px`;
		wrapper.style.maxWidth = "none";
		wrapper.style.transition = "none";

		secondary.style.width = "100%";
		secondary.style.left = "0";
		secondary.style.translate = "0 0";
		secondaryNav.style.width = "100%";
		secondaryNav.style.justifyContent = "space-between";

		void wrapper.offsetWidth;
		wrapper.style.transition = "width 0.25s ease-out";
		wrapper.style.width = `${dockWidth}px`;
	}

	function checkDock() {
		if (options.readyGate && !options.readyGate()) return;

		if (!docked) {
			const dockRect = dock.getBoundingClientRect();
			const wrapperRect = wrapper.getBoundingClientRect();
			if (dockRect.top <= wrapperRect.bottom) {
				dockNavbar();
			}
		} else {
			const dockViewportY = dockPageY - window.scrollY;
			if (dockViewportY > window.innerHeight) {
				undock();
			}
		}
	}

	function handleResize() {
		if (!docked) return;
		dockPageY = dock.getBoundingClientRect().top + window.scrollY;
		const wrapperHeight = wrapper.getBoundingClientRect().height;
		wrapper.style.top = `${dockPageY - wrapperHeight}px`;
		wrapper.style.transition = "none";
		wrapper.style.width = `${getDockWidth()}px`;
	}

	let scrollRafId: number;
	function throttledCheckDock() {
		cancelAnimationFrame(scrollRafId);
		scrollRafId = requestAnimationFrame(checkDock);
	}

	window.addEventListener("scroll", throttledCheckDock, { passive: true });
	window.addEventListener("resize", handleResize, { passive: true });

	requestAnimationFrame(() => {
		if (options.readyGate && !options.readyGate()) return;

		const dockRect = dock.getBoundingClientRect();
		const wrapperRect = wrapper.getBoundingClientRect();

		if (dockRect.top <= wrapperRect.bottom) {
			showingPrimary = false;
			showSecondary();

			const dockWidth = getDockWidth();
			dockPageY = dockRect.top + window.scrollY;
			cachedNavWidth = secondaryNav.getBoundingClientRect().width;

			docked = true;
			toggleDockedLabels(true);
			wrapper.style.position = "absolute";
			wrapper.style.bottom = "auto";
			wrapper.style.left = "50%";
			wrapper.style.translate = "-50% 0";
			wrapper.style.top = `${dockPageY - wrapperRect.height}px`;
			wrapper.style.maxWidth = "none";
			wrapper.style.width = `${dockWidth}px`;

			secondary.style.width = "100%";
			secondary.style.left = "0";
			secondary.style.translate = "0 0";
			secondaryNav.style.width = "100%";
			secondaryNav.style.justifyContent = "space-between";
		}
	});

	return {
		applyNavbarState,
		checkDock,
		get docked() {
			return docked;
		},
		get switching() {
			return switching;
		},
		destroy() {
			cancelAnimationFrame(scrollRafId);
			window.removeEventListener("scroll", throttledCheckDock);
			window.removeEventListener("resize", handleResize);
		},
	};
}
