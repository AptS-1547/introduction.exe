import { m, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Locale, MessageCatalog } from "../../i18n/messages";
import { monoCaps, panelClass } from "../../styles/classes";
import {
	advanceTraceWindow,
	getSessionTraceState,
	type RuntimeTrace,
	traceIntervalVarianceMs,
	traceMinIntervalMs,
	traceSessionStorageKey,
} from "./TraceLog.utils";

type TraceLogProps = {
	locale: Locale;
	messages: MessageCatalog;
};

export function TraceLog({ locale, messages }: TraceLogProps) {
	const reduceMotion = useReducedMotion();
	const sessionStateRef = useRef<ReturnType<
		typeof getSessionTraceState
	> | null>(null);
	if (sessionStateRef.current === null) {
		sessionStateRef.current = getSessionTraceState(messages, locale);
	}
	if (sessionStateRef.current.locale !== locale) {
		sessionStateRef.current = getSessionTraceState(messages, locale);
	}
	const sessionState = sessionStateRef.current;
	const nextTraceIndexRef = useRef(sessionState.nextTraceIndex);
	const traceIdRef = useRef(sessionState.nextTraceId);
	const [isPaused, setIsPaused] = useState(false);
	const [visibleTraces, setVisibleTraces] = useState<RuntimeTrace[]>(
		sessionState.visibleTraces,
	);

	useEffect(() => {
		window.sessionStorage.setItem(
			traceSessionStorageKey,
			JSON.stringify({
				locale,
				nextTraceId: traceIdRef.current,
				nextTraceIndex: nextTraceIndexRef.current,
				visibleTraces,
			}),
		);
	}, [locale, visibleTraces]);

	useEffect(() => {
		if (reduceMotion || isPaused || messages.home.traces.length === 0) {
			return;
		}

		let timer: number | undefined;

		const queueNextTrace = () => {
			const interval =
				traceMinIntervalMs + Math.random() * traceIntervalVarianceMs;

			timer = window.setTimeout(() => {
				setVisibleTraces((current) => {
					const nextId = traceIdRef.current;

					traceIdRef.current += 1;
					nextTraceIndexRef.current += 1;

					return advanceTraceWindow(current, messages.home.traces, nextId);
				});

				queueNextTrace();
			}, interval);
		};

		queueNextTrace();

		return () => {
			if (timer !== undefined) {
				window.clearTimeout(timer);
			}
		};
	}, [isPaused, messages.home.traces, reduceMotion]);

	return (
		<section className={`${panelClass} p-5`}>
			<div className="flex items-center justify-between gap-3">
				<p className={monoCaps}>{messages.home.traceTitle}</p>
				<div className="flex items-center gap-2">
					<button
						className="font-mono text-[0.62rem] tracking-normal text-[var(--faint)] uppercase transition hover:text-[var(--cyan)] focus-visible:text-[var(--cyan)] focus-visible:outline-none"
						type="button"
						onClick={() => setIsPaused((current) => !current)}
					>
						{isPaused ? "paused" : "live"}
					</button>
					<span
						aria-hidden="true"
						className="h-1.5 w-16 overflow-hidden border border-[rgba(99,230,244,0.24)] bg-[rgba(99,230,244,0.05)]"
					>
						<span
							className={`block h-full w-1/2 bg-[linear-gradient(90deg,transparent,var(--cyan),transparent)] ${
								isPaused
									? "translate-x-[48%] opacity-45"
									: "animate-[signalSweep_2.8s_ease-in-out_infinite]"
							}`}
						/>
					</span>
				</div>
			</div>
			<div className="mt-4 grid max-h-[178px] gap-2 overflow-hidden font-mono text-[0.76rem] tracking-normal [mask-image:linear-gradient(to_bottom,transparent,#000_16%,#000_100%)]">
				{visibleTraces.map((trace) => (
					<m.p
						key={trace.id}
						className="grid grid-cols-[64px_54px_minmax(0,1fr)] gap-3"
						initial={reduceMotion ? false : { opacity: 0, y: 8 }}
						animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
						transition={reduceMotion ? { duration: 0 } : { duration: 0.22 }}
					>
						<span className="text-[var(--faint)]">
							+{String(trace.delayMs).padStart(3, "0")}ms
						</span>
						<span className="text-[var(--green)]">[ OK ]</span>
						<span className="min-w-0 truncate text-[var(--muted)]">
							{trace.text}
						</span>
					</m.p>
				))}
			</div>
		</section>
	);
}
