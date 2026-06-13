import { describe, expect, it } from "vitest";
import { formatRuntimeClock, formatRuntimeUptime } from "./TopStatusBar.utils";

describe("TopStatusBar runtime formatters", () => {
	it("formats local runtime clock values", () => {
		expect(formatRuntimeClock(new Date(2026, 0, 1, 3, 4, 5))).toBe("03:04:05");
	});

	it("formats uptime from elapsed milliseconds", () => {
		expect(formatRuntimeUptime(0)).toBe("00:00:00");
		expect(formatRuntimeUptime(3661000)).toBe("01:01:01");
		expect(formatRuntimeUptime(-1000)).toBe("00:00:00");
	});
});
