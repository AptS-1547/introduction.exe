export const minimumPid = 12;
export const maximumPid = 1548;
export const initialPid = 48;
export const pidIdleThresholdMs = 2400;
export const pidActivityThrottleMs = 1400;
export const pidDecayMinIntervalMs = 3000;
export const pidDecayIntervalVarianceMs = 2000;
export const pidStorageKey = "introduction.pid";
export const pidHistoryStorageKey = "introduction.pidHistory";
export const pidSignalBars = Array.from(
	{ length: 12 },
	(_, index) => `pid:${index}`,
);

export type PidState = {
	pid: number;
	pidHistory: number[];
};

export type PidStateUpdater = (
	updater: (current: PidState) => PidState,
) => void;

export function getInitialPidState(): PidState {
	const sessionPid = getSessionPid();

	return {
		pid: sessionPid,
		pidHistory: getSessionPidHistory(sessionPid),
	};
}

export function getSessionPid() {
	const storedValue = window.sessionStorage.getItem(pidStorageKey);
	const storedPid = storedValue ? Number(storedValue) : Number.NaN;

	if (Number.isFinite(storedPid)) {
		return Math.min(maximumPid, Math.max(minimumPid, storedPid));
	}

	return initialPid;
}

export function getSessionPidHistory(pid: number) {
	const storedValue = window.sessionStorage.getItem(pidHistoryStorageKey);

	if (!storedValue) {
		return Array.from({ length: pidSignalBars.length }, () => pid);
	}

	try {
		const parsedValue: unknown = JSON.parse(storedValue);

		if (
			Array.isArray(parsedValue) &&
			parsedValue.every((item) => typeof item === "number")
		) {
			const normalizedHistory = parsedValue
				.map((item) => Math.min(maximumPid, Math.max(minimumPid, item)))
				.slice(-pidSignalBars.length);

			return [
				...Array.from(
					{ length: pidSignalBars.length - normalizedHistory.length },
					() => normalizedHistory[0] ?? pid,
				),
				...normalizedHistory,
			];
		}
	} catch {
		return Array.from({ length: pidSignalBars.length }, () => pid);
	}

	return Array.from({ length: pidSignalBars.length }, () => pid);
}

export function appendPidSample(history: number[], nextPid: number) {
	return [...history, nextPid].slice(-pidSignalBars.length);
}

export function getPidBarHeight(pidHistory: number[], pid: number) {
	if (pidHistory.length === 0) {
		return 42;
	}

	const minPid = Math.min(...pidHistory);
	const maxPid = Math.max(...pidHistory);

	if (maxPid === minPid) {
		return 42;
	}

	return Math.round(22 + ((pid - minPid) / (maxPid - minPid)) * 70);
}

export function increasePid(currentPid: number) {
	return Math.min(maximumPid, currentPid + 1 + Math.floor(Math.random() * 6));
}

export function decreasePid(currentPid: number) {
	return Math.max(
		minimumPid,
		currentPid - (1 + Math.floor(Math.random() * 10)),
	);
}

export function startPidIdleDecay(
	getLastActivityAt: () => number,
	updatePidState: PidStateUpdater,
) {
	let timer: number | undefined;

	const queueDecay = () => {
		const interval =
			pidDecayMinIntervalMs + Math.random() * pidDecayIntervalVarianceMs;

		timer = window.setTimeout(() => {
			const hasBeenIdle =
				Date.now() - getLastActivityAt() >= pidIdleThresholdMs;

			if (hasBeenIdle) {
				updatePidState((current) => {
					const nextPid = decreasePid(current.pid);

					return {
						pid: nextPid,
						pidHistory: appendPidSample(current.pidHistory, nextPid),
					};
				});
			}

			queueDecay();
		}, interval);
	};

	queueDecay();

	return () => {
		if (timer !== undefined) {
			window.clearTimeout(timer);
		}
	};
}
