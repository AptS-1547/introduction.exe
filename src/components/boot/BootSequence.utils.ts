export const bootAccessCardDelaySeconds = 1.84;
export const bootLineRevealWindowSeconds = 1.5;

const bootLineMinIntervalSeconds = 0.045;
const bootLineIntervalVarianceSeconds = 0.18;

export function createBootLineDelays(lineCount: number) {
	if (lineCount <= 0) {
		return [];
	}

	const delays = [0];
	let elapsed = 0;

	for (let index = 1; index < lineCount; index += 1) {
		elapsed +=
			bootLineMinIntervalSeconds +
			Math.random() * bootLineIntervalVarianceSeconds;
		delays.push(elapsed);
	}

	const maxDelay = delays.at(-1) ?? 0;
	if (maxDelay <= bootLineRevealWindowSeconds) {
		return delays;
	}

	const scale = bootLineRevealWindowSeconds / maxDelay;
	return delays.map((delay) => delay * scale);
}

export function formatBootDelay(delaySeconds: number) {
	return `+${String(Math.round(delaySeconds * 1000)).padStart(3, "0")}ms`;
}
