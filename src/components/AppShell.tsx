import {
	AnimatePresence,
	domAnimation,
	LazyMotion,
	m,
	useReducedMotion,
	type Variants,
} from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router";
import { useBootSequence } from "../hooks/useBootSequence";
import { useI18n } from "../i18n/useI18n";
import { ContactPage } from "../pages/ContactPage";
import { HomePage } from "../pages/HomePage";
import { MemoryPage } from "../pages/MemoryPage";
import { ProfilePage } from "../pages/ProfilePage";
import { ProjectDetailPage } from "../pages/ProjectDetailPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { BootSequence } from "./boot/BootSequence";
import { ShellFrame } from "./layout/ShellFrame";

const routeVariants: Variants = {
	enter: { opacity: 0 },
	center: { opacity: 1 },
	exit: (scrollTop: number) => ({
		opacity: 0,
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
			<div className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_16%_12%,rgba(99,230,244,0.12),transparent_30%),radial-gradient(circle_at_84%_28%,rgba(255,93,102,0.1),transparent_26%),linear-gradient(135deg,#07090d_0%,#0c1116_46%,#080b0f_100%)]">
				<AnimatePresence>{booting && <BootSequence />}</AnimatePresence>
				<div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:5px_5px] opacity-20 [mask-image:linear-gradient(to_bottom,#000,transparent_92%)]" />
				<div className="pointer-events-none fixed inset-0 -z-10 origin-bottom bg-[linear-gradient(rgba(99,230,244,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(99,230,244,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.34] [transform:perspective(900px)_rotateX(62deg)_translateY(22vh)]" />
				<ShellFrame onRestartBoot={restartBoot}>
					<AnimatePresence initial={false} custom={routeScrollTopRef.current}>
						<m.div
							key={pathname}
							className="min-w-0"
							variants={routeVariants}
							initial={reduceMotion ? false : "enter"}
							animate={
								reduceMotion
									? { opacity: 1 }
									: {
											opacity: isLocaleTransitioning ? 0.62 : 1,
											filter: isLocaleTransitioning ? "blur(5px)" : "blur(0px)",
										}
							}
							exit={reduceMotion ? undefined : "exit"}
							transition={
								reduceMotion
									? { duration: 0 }
									: { duration: 0.26, ease: "easeOut" }
							}
						>
							<Routes location={location}>
								<Route path="/" element={<HomePage />} />
								<Route path="/profile" element={<ProfilePage />} />
								<Route path="/projects" element={<ProjectsPage />} />
								<Route path="/projects/:slug" element={<ProjectDetailPage />} />
								<Route path="/memory" element={<MemoryPage />} />
								<Route path="/contact" element={<ContactPage />} />
							</Routes>
						</m.div>
					</AnimatePresence>
				</ShellFrame>
			</div>
		</LazyMotion>
	);
}
