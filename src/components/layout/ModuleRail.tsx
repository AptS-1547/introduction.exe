import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { useI18n } from "../../i18n/useI18n";
import { navItems } from "../../routes/nav";
import { glassOverlay } from "../../styles/classes";
import {
	appendPidSample,
	getInitialPidState,
	getPidBarHeight,
	increasePid,
	initialPid,
	pidActivityThrottleMs,
	pidHistoryStorageKey,
	pidSignalBars,
	pidStorageKey,
	startPidIdleDecay,
} from "./ModuleRail.utils";

export function ModuleRail() {
	const { messages } = useI18n();
	const location = useLocation();
	const routeKey = `${location.key}:${location.pathname}`;
	const [{ pid, pidHistory }, setPidState] = useState(getInitialPidState);
	const lastActivityAtRef = useRef<number | null>(null);
	if (lastActivityAtRef.current === null) {
		lastActivityAtRef.current = Date.now();
	}
	const lastPidIncreaseAtRef = useRef(0);
	const previousRouteKeyRef = useRef(routeKey);

	if (previousRouteKeyRef.current !== routeKey) {
		previousRouteKeyRef.current = routeKey;
		lastActivityAtRef.current = Date.now();
		lastPidIncreaseAtRef.current = Date.now();
		setPidState((current) => {
			const nextPid = increasePid(current.pid);

			return {
				pid: nextPid,
				pidHistory: appendPidSample(current.pidHistory, nextPid),
			};
		});
	}

	useEffect(() => {
		window.sessionStorage.setItem(pidStorageKey, String(pid));
	}, [pid]);

	useEffect(() => {
		window.sessionStorage.setItem(
			pidHistoryStorageKey,
			JSON.stringify(pidHistory),
		);
	}, [pidHistory]);

	useEffect(() => {
		const increasePidFromActivity = () => {
			const now = Date.now();

			lastActivityAtRef.current = now;

			if (now - lastPidIncreaseAtRef.current < pidActivityThrottleMs) {
				return;
			}

			lastPidIncreaseAtRef.current = now;
			setPidState((current) => {
				const nextPid = increasePid(current.pid);

				return {
					pid: nextPid,
					pidHistory: appendPidSample(current.pidHistory, nextPid),
				};
			});
		};

		const markActivity = () => {
			increasePidFromActivity();
		};

		window.addEventListener("pointerdown", markActivity, { capture: true });
		window.addEventListener("keydown", markActivity, { capture: true });
		window.addEventListener("scroll", markActivity, { passive: true });

		return () => {
			window.removeEventListener("pointerdown", markActivity, true);
			window.removeEventListener("keydown", markActivity, true);
			window.removeEventListener("scroll", markActivity);
		};
	}, []);

	useEffect(() => {
		return startPidIdleDecay(() => lastActivityAtRef.current ?? 0, setPidState);
	}, []);

	return (
		<aside
			className={`fixed top-4 left-[max(1rem,calc((100vw-1440px)/2+1rem))] z-20 hidden h-[calc(100svh-32px)] w-[248px] p-4 min-[1080px]:grid min-[1080px]:grid-rows-[auto_minmax(0,1fr)_auto] ${glassOverlay}`}
		>
			<NavLink className="mb-8 flex items-center gap-3" to="/">
				<span className="grid size-11 shrink-0 place-items-center overflow-hidden bg-[rgba(99,230,244,0.06)] shadow-[0_0_28px_rgba(99,230,244,0.16)]">
					<img
						src="/images/general/logo.webp"
						alt=""
						width="96"
						height="96"
						className="h-full w-full object-cover"
						aria-hidden="true"
					/>
				</span>
				<span>
					<strong className="block font-mono text-[0.95rem] leading-[1.1] tracking-normal">
						{messages.brand.name}
					</strong>
					<small className="mt-[3px] block font-mono text-[0.68rem] tracking-normal text-[var(--muted)] uppercase">
						{messages.brand.subtitle}
					</small>
				</span>
			</NavLink>
			<nav
				className="grid content-start gap-2 overflow-y-auto pr-1"
				aria-label="Primary navigation"
			>
				{navItems.map((item) => {
					const Icon = item.icon;

					return (
						<NavLink
							key={item.to}
							className={({ isActive }) =>
								[
									"group grid min-h-[72px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 border p-3 transition duration-200",
									isActive
										? "border-[rgba(99,230,244,0.44)] bg-[linear-gradient(145deg,rgba(99,230,244,0.16),rgba(255,255,255,0.035))] text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
										: "border-white/0 text-[var(--muted)] hover:border-white/12 hover:bg-[rgba(255,255,255,0.045)] hover:text-[var(--text)]",
								].join(" ")
							}
							to={item.to}
						>
							<span className="grid gap-1 font-mono text-[0.68rem] tracking-normal text-[var(--faint)]">
								{item.index}
								<Icon className="text-[var(--cyan)]" />
							</span>
							<span className="min-w-0">
								<strong className="block font-mono text-[0.78rem] tracking-normal">
									{messages.nav[item.messageKey]}
								</strong>
								<small className="mt-1 block truncate text-[0.76rem] text-[var(--faint)]">
									{messages.navDescriptions[item.messageKey]}
								</small>
							</span>
						</NavLink>
					);
				})}
			</nav>
			<div className="grid gap-3 border-t border-[rgba(156,184,190,0.14)] pt-4 font-mono text-[0.66rem] tracking-normal text-[var(--faint)] uppercase">
				<div className="grid gap-2 border border-[rgba(99,230,244,0.16)] bg-[rgba(99,230,244,0.035)] p-3">
					<div className="flex items-center justify-between gap-3">
						<span>PID</span>
						<strong className="text-[0.88rem] tracking-normal text-[var(--green)]">
							{String(pid).padStart(4, "0")}
						</strong>
					</div>
					<div
						aria-hidden="true"
						className="grid h-4 grid-cols-12 items-end gap-1 overflow-hidden"
					>
						{pidSignalBars.map((bar, index) => {
							const sampledPid = pidHistory[index] ?? initialPid;

							return (
								<span
									key={bar}
									className="block bg-[var(--cyan)] opacity-35 shadow-[0_0_10px_rgba(99,230,244,0.24)]"
									style={{
										height: `${getPidBarHeight(pidHistory, sampledPid)}%`,
									}}
								/>
							);
						})}
					</div>
				</div>
				<span>{messages.status.runtime}</span>
				<span>{messages.status.build}</span>
			</div>
		</aside>
	);
}
