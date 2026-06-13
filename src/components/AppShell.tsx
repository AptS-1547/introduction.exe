import {
	AnimatePresence,
	domAnimation,
	LazyMotion,
	m,
	useReducedMotion,
	type Variants,
} from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import { useBootSequence } from "../hooks/useBootSequence";
import { useI18n } from "../i18n/useI18n";
import { ContactPage } from "../pages/ContactPage";
import { HomePage } from "../pages/HomePage";
import { MemoryPage } from "../pages/MemoryPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProfilePage } from "../pages/ProfilePage";
import { ProjectDetailPage } from "../pages/ProjectDetailPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { Seo } from "../seo/Seo";
import { BootSequence } from "./boot/BootSequence";
import { ShellFrame } from "./layout/ShellFrame";

const runtimeStartedAtStorageKey = "introduction.runtimeStartedAt";

function getSessionRuntimeStartedAt() {
	const storedValue = window.sessionStorage.getItem(runtimeStartedAtStorageKey);
	const storedTimestamp = storedValue ? Number(storedValue) : Number.NaN;

	if (Number.isFinite(storedTimestamp) && storedTimestamp > 0) {
		return storedTimestamp;
	}

	const startedAt = Date.now();
	window.sessionStorage.setItem(runtimeStartedAtStorageKey, String(startedAt));
	return startedAt;
}

const routeVariants: Variants = {
	enter: { opacity: 0, y: 10, filter: "blur(5px)" },
	center: { opacity: 1, y: 0, filter: "blur(0px)" },
	exit: (scrollTop: number) => ({
		opacity: 0,
		y: -8,
		filter: "blur(6px)",
		position: "absolute",
		top: -scrollTop,
		left: 0,
		right: 0,
		width: "100%",
	}),
};

export function AppShell() {
	const location = useLocation();
	const pathname = location.pathname;
	const { booting, restartBoot } = useBootSequence();
	const { isLocaleTransitioning } = useI18n();
	const reduceMotion = useReducedMotion();
	const previousPathRef = useRef(pathname);
	const routeScrollTopRef = useRef(0);
	const [runtimeStartedAt, setRuntimeStartedAt] = useState(
		getSessionRuntimeStartedAt,
	);

	const restartRuntime = useCallback(() => {
		const startedAt = Date.now();
		window.sessionStorage.setItem(
			runtimeStartedAtStorageKey,
			String(startedAt),
		);
		setRuntimeStartedAt(startedAt);
		restartBoot();
	}, [restartBoot]);

	if (previousPathRef.current !== pathname) {
		routeScrollTopRef.current = window.scrollY;
		previousPathRef.current = pathname;
	}

	useLayoutEffect(() => {
		if (!pathname) {
			return;
		}
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<LazyMotion features={domAnimation}>
			<Seo />
			<div className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_16%_12%,rgba(99,230,244,0.12),transparent_30%),radial-gradient(circle_at_84%_28%,rgba(255,93,102,0.1),transparent_26%),linear-gradient(135deg,#07090d_0%,#0c1116_46%,#080b0f_100%)]">
				<AnimatePresence>{booting && <BootSequence />}</AnimatePresence>
				<div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:5px_5px] opacity-20 [mask-image:linear-gradient(to_bottom,#000,transparent_92%)]" />
				<div className="pointer-events-none fixed inset-0 -z-10 origin-bottom bg-[linear-gradient(rgba(99,230,244,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(99,230,244,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.34] [transform:perspective(900px)_rotateX(62deg)_translateY(22vh)]" />
				<ShellFrame
					onRestartBoot={restartRuntime}
					runtimeStartedAt={runtimeStartedAt}
				>
					<AnimatePresence initial={false} custom={routeScrollTopRef.current}>
						<m.div
							key={pathname}
							className="min-w-0 will-change-[opacity,transform,filter]"
							variants={routeVariants}
							initial={reduceMotion ? false : "enter"}
							animate={
								reduceMotion
									? { opacity: 1 }
									: {
											opacity: isLocaleTransitioning ? 0.62 : 1,
											y: 0,
											filter: isLocaleTransitioning ? "blur(5px)" : "blur(0px)",
										}
							}
							exit={reduceMotion ? undefined : "exit"}
							transition={
								reduceMotion
									? { duration: 0 }
									: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
							}
						>
							<Routes location={location}>
								<Route path="/" element={<HomePage />} />
								<Route path="/profile" element={<ProfilePage />} />
								<Route path="/projects" element={<ProjectsPage />} />
								<Route path="/projects/:slug" element={<ProjectDetailPage />} />
								<Route path="/memory" element={<MemoryPage />} />
								<Route path="/contact" element={<ContactPage />} />
								<Route path="*" element={<NotFoundPage />} />
							</Routes>
						</m.div>
					</AnimatePresence>
				</ShellFrame>
			</div>
		</LazyMotion>
	);
}
