import type { Locale, MessageCatalog } from "../../i18n/messages";

export type RuntimeTrace = {
	id: number;
	delayMs: number;
	text: string;
};

export type TraceSessionState = {
	locale: Locale;
	nextTraceIndex: number;
	nextTraceId: number;
	visibleTraces: RuntimeTrace[];
};

export const maxVisibleTraces = 6;
export const traceMinIntervalMs = 1400;
export const traceIntervalVarianceMs = 1400;
export const traceSessionStorageKey = "introduction.traceLog";

function createRuntimeTrace(text: string, id: number): RuntimeTrace {
	return {
		id,
		delayMs: Math.round(id * 137 + Math.random() * 83),
		text,
	};
}

export function selectNextTrace(traces: string[], previousTrace?: string) {
	if (traces.length === 0) {
		return "";
	}

	if (traces.length === 1) {
		return traces[0];
	}

	const candidates = traces.filter((trace) => trace !== previousTrace);
	const candidateIndex = Math.floor(Math.random() * candidates.length);

	return candidates[candidateIndex] ?? candidates[0] ?? traces[0];
}

export function advanceTraceWindow(
	current: RuntimeTrace[],
	traces: string[],
	nextId: number,
) {
	const trace = selectNextTrace(traces, current.at(-1)?.text);

	return [
		...current.slice(-(maxVisibleTraces - 1)),
		createRuntimeTrace(trace, nextId),
	];
}

function createInitialTraceSessionState(
	messages: MessageCatalog,
	locale: Locale,
): TraceSessionState {
	return {
		locale,
		nextTraceId: Math.min(messages.home.traces.length, maxVisibleTraces),
		nextTraceIndex: Math.min(messages.home.traces.length, maxVisibleTraces),
		visibleTraces: messages.home.traces
			.slice(0, maxVisibleTraces)
			.map((trace, index) => ({
				id: index,
				delayMs: index * 124,
				text: trace,
			})),
	};
}

export function getSessionTraceState(
	messages: MessageCatalog,
	locale: Locale,
): TraceSessionState {
	const storedValue = window.sessionStorage.getItem(traceSessionStorageKey);

	if (!storedValue) {
		return createInitialTraceSessionState(messages, locale);
	}

	try {
		const parsedValue: unknown = JSON.parse(storedValue);

		if (
			typeof parsedValue === "object" &&
			parsedValue !== null &&
			"locale" in parsedValue &&
			"nextTraceId" in parsedValue &&
			"nextTraceIndex" in parsedValue &&
			"visibleTraces" in parsedValue
		) {
			const state = parsedValue as TraceSessionState;
			const validVisibleTraces =
				Array.isArray(state.visibleTraces) &&
				state.visibleTraces.every(
					(trace) =>
						typeof trace.id === "number" &&
						typeof trace.delayMs === "number" &&
						typeof trace.text === "string",
				);

			if (
				state.locale === locale &&
				Number.isFinite(state.nextTraceId) &&
				Number.isFinite(state.nextTraceIndex) &&
				validVisibleTraces
			) {
				return {
					locale,
					nextTraceId: state.nextTraceId,
					nextTraceIndex: state.nextTraceIndex,
					visibleTraces: state.visibleTraces.slice(-maxVisibleTraces),
				};
			}
		}
	} catch {
		return createInitialTraceSessionState(messages, locale);
	}

	return createInitialTraceSessionState(messages, locale);
}
