import { describe, expect, it, vi } from "vitest";
import {
	appendPidSample,
	decreasePid,
	getInitialPidState,
	getPidBarHeight,
	getSessionPid,
	getSessionPidHistory,
	increasePid,
	startPidIdleDecay,
} from "./ModuleRail.utils";

describe("ModuleRail PID helpers", () => {
	it("increases PID without exceeding the runtime ceiling", () => {
		vi.spyOn(Math, "random").mockReturnValue(0.99);

		expect(increasePid(1547)).toBe(1548);
		expect(increasePid(1548)).toBe(1548);
	});

	it("decreases PID without going below the runtime floor", () => {
		vi.spyOn(Math, "random").mockReturnValue(0.99);

		expect(decreasePid(15)).toBe(12);
		expect(decreasePid(12)).toBe(12);
	});

	it("keeps the PID chart as a rolling history", () => {
		const history = Array.from({ length: 12 }, (_, index) => index + 40);

		expect(appendPidSample(history, 88)).toEqual([
			41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 88,
		]);
	});

	it("normalizes PID samples into visible bar heights", () => {
		expect(getPidBarHeight([], 48)).toBe(42);
		expect(getPidBarHeight([48, 48], 48)).toBe(42);
		expect(getPidBarHeight([12, 48, 112], 12)).toBe(22);
		expect(getPidBarHeight([12, 48, 112], 112)).toBe(92);
	});

	it("restores PID state from the current browser session", () => {
		window.sessionStorage.setItem("introduction.pid", "99");
		window.sessionStorage.setItem(
			"introduction.pidHistory",
			JSON.stringify([18, 21, 34]),
		);

		expect(getSessionPid()).toBe(99);
		expect(getSessionPidHistory(99).slice(-3)).toEqual([18, 21, 34]);
	});

	it("builds the initial PID state from session storage", () => {
		window.sessionStorage.setItem("introduction.pid", "64");
		window.sessionStorage.setItem(
			"introduction.pidHistory",
			JSON.stringify([22, 38, 64]),
		);

		expect(getInitialPidState()).toEqual({
			pid: 64,
			pidHistory: [...Array.from({ length: 10 }, () => 22), 38, 64],
		});
	});

	it("decays PID after the runtime has been idle", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2026-01-01T00:00:10.000Z"));
		vi.spyOn(Math, "random").mockReturnValue(0);
		let currentState = {
			pid: 48,
			pidHistory: Array.from({ length: 12 }, () => 48),
		};

		const stopDecay = startPidIdleDecay(
			() => Date.now() - 3000,
			(updater) => {
				currentState = updater(currentState);
			},
		);

		vi.advanceTimersByTime(3000);

		expect(currentState.pid).toBe(47);
		expect(currentState.pidHistory.at(-1)).toBe(47);

		stopDecay();
		vi.useRealTimers();
	});
});
