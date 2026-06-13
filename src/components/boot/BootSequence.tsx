import { m, useReducedMotion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { FiTerminal } from "react-icons/fi";
import { useI18n } from "../../i18n/useI18n";
import {
	bootAccessCardDelaySeconds,
	createBootLineDelays,
	formatBootDelay,
} from "./BootSequence.utils";

const scrollKeys = new Set([
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"ArrowUp",
	"End",
	"Home",
	"PageDown",
	"PageUp",
	" ",
]);

export function BootSequence() {
	const { messages } = useI18n();
	const reduceMotion = useReducedMotion();
	const bootLineDelays = useMemo(
		() => createBootLineDelays(messages.boot.lines.length),
		[messages.boot.lines.length],
	);

	useEffect(() => {
		const originalBodyOverflow = document.body.style.overflow;
		const originalBodyOverscrollBehavior =
			document.body.style.overscrollBehavior;
		const originalHtmlOverflow = document.documentElement.style.overflow;
		const originalHtmlOverscrollBehavior =
			document.documentElement.style.overscrollBehavior;

		const preventKeyboardScroll = (event: KeyboardEvent) => {
			if (scrollKeys.has(event.key)) {
				event.preventDefault();
			}
		};

		document.body.style.overflow = "hidden";
		document.body.style.overscrollBehavior = "none";
		document.documentElement.style.overflow = "hidden";
		document.documentElement.style.overscrollBehavior = "none";

		window.addEventListener("keydown", preventKeyboardScroll, {
			capture: true,
		});

		return () => {
			document.body.style.overflow = originalBodyOverflow;
			document.body.style.overscrollBehavior = originalBodyOverscrollBehavior;
			document.documentElement.style.overflow = originalHtmlOverflow;
			document.documentElement.style.overscrollBehavior =
				originalHtmlOverscrollBehavior;

			window.removeEventListener("keydown", preventKeyboardScroll, true);
		};
	}, []);

	return (
		<m.div
			className="fixed inset-0 z-50 grid touch-none select-none overflow-hidden overscroll-none bg-black text-[var(--text)]"
			initial={{ opacity: 1 }}
			exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)" }}
			transition={
				reduceMotion
					? { duration: 0 }
					: { duration: 0.82, ease: [0.22, 1, 0.36, 1] }
			}
			onWheel={(event) => event.preventDefault()}
			onTouchMove={(event) => event.preventDefault()}
		>
			<div className="relative mx-auto grid min-h-dvh w-full max-w-[980px] content-center px-3 py-4 sm:w-[min(980px,calc(100%_-_28px))] sm:px-0 sm:py-8">
				<div className="grid max-h-[62dvh] min-w-0 gap-1 overflow-hidden font-mono text-[0.68rem] tracking-normal sm:max-h-[58vh] sm:text-[0.78rem]">
					<p className="mb-2 min-w-0 break-words text-[var(--faint)]">
						<FiTerminal className="mr-2 inline shrink-0 text-[var(--cyan)]" />
						{messages.boot.subtitle}
					</p>
					<div className="grid gap-1">
						{messages.boot.lines.map((line, index) => (
							<m.p
								key={line}
								className="grid min-w-0 grid-cols-[58px_48px_minmax(0,1fr)] gap-2 text-[var(--muted)] sm:grid-cols-[72px_70px_minmax(0,1fr)] sm:gap-3"
								initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 9 }}
								animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
								transition={
									reduceMotion
										? { duration: 0 }
										: { delay: bootLineDelays[index] ?? 0, duration: 0.14 }
								}
							>
								<span className="text-[var(--faint)]">
									{formatBootDelay(bootLineDelays[index] ?? 0)}
								</span>
								<span className="text-[var(--green)]">[ OK ]</span>
								<span className="min-w-0 break-words [overflow-wrap:anywhere]">
									{line}
									<span className="text-[var(--faint)]">
										{" "}
										#{String(index + 1).padStart(2, "0")}
									</span>
								</span>
							</m.p>
						))}
					</div>
				</div>
				<m.div
					className="mt-5 min-w-0 [container-type:inline-size] border border-[rgba(99,230,244,0.38)] bg-[rgba(99,230,244,0.06)] p-4 font-mono shadow-[0_0_70px_rgba(99,230,244,0.12)] sm:mt-8 sm:p-5"
					initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
					animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
					transition={
						reduceMotion
							? { duration: 0 }
							: {
									delay: bootAccessCardDelaySeconds,
									duration: 0.34,
									ease: [0.22, 1, 0.36, 1],
								}
					}
				>
					<p className="mb-2 text-[0.72rem] tracking-normal text-[var(--cyan)] uppercase">
						{messages.boot.accessGranted}
					</p>
					<h1 className="min-w-0 whitespace-nowrap text-[clamp(1.12rem,9.2cqw,5.7rem)] leading-none font-bold tracking-normal">
						{messages.boot.title}
					</h1>
				</m.div>
			</div>
		</m.div>
	);
}
