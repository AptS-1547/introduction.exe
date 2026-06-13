import { describe, expect, it, vi } from "vitest";
import {
	bootAccessCardDelaySeconds,
	bootLineRevealWindowSeconds,
	createBootLineDelays,
	formatBootDelay,
} from "./BootSequence.utils";

describe("createBootLineDelays", () => {
	it("returns bounded, non-decreasing delays within the boot reveal window", () => {
		vi.spyOn(Math, "random").mockReturnValue(0.99);

		const delays = createBootLineDelays(13);

		expect(delays).toHaveLength(13);
		expect(delays[0]).toBe(0);
		expect(delays.at(-1) ?? 0).toBeLessThanOrEqual(bootLineRevealWindowSeconds);

		for (let index = 1; index < delays.length; index += 1) {
			expect(delays[index]).toBeGreaterThan(delays[index - 1]);
		}
	});

	it("assigns each line its own random interval before scaling", () => {
		const sequence = [0.1, 0.6, 0.25, 0.9, 0.4];
		let cursor = 0;
		vi.spyOn(Math, "random").mockImplementation(() => {
			const value = sequence[cursor];
			cursor = (cursor + 1) % sequence.length;
			return value;
		});

		const delays = createBootLineDelays(6);

		for (let index = 1; index < delays.length; index += 1) {
			expect(delays[index]).toBeGreaterThan(delays[index - 1]);
		}

		expect(delays.at(-1) ?? 0).toBeLessThanOrEqual(bootLineRevealWindowSeconds);
	});

	it("keeps a fixed pause between the final line and the access card", () => {
		expect(
			bootAccessCardDelaySeconds - bootLineRevealWindowSeconds,
		).toBeGreaterThanOrEqual(0.3);
	});

	it("formats line delays as boot-style elapsed milliseconds", () => {
		expect(formatBootDelay(0)).toBe("+000ms");
		expect(formatBootDelay(0.084)).toBe("+084ms");
		expect(formatBootDelay(1.5)).toBe("+1500ms");
	});
});
