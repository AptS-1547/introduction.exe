import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { messages } from "../../i18n/messages";
import { TraceLog } from "./TraceLog";
import { advanceTraceWindow, selectNextTrace } from "./TraceLog.utils";

describe("TraceLog", () => {
	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it("advances the trace window while avoiding immediate repeats", () => {
		vi.spyOn(Math, "random").mockReturnValue(0);

		const advanced = advanceTraceWindow(
			[
				{ id: 0, delayMs: 0, text: "alpha" },
				{ id: 1, delayMs: 1, text: "beta" },
				{ id: 2, delayMs: 2, text: "gamma" },
				{ id: 3, delayMs: 3, text: "delta" },
				{ id: 4, delayMs: 4, text: "epsilon" },
				{ id: 5, delayMs: 5, text: "zeta" },
			],
			["alpha", "beta", "gamma"],
			6,
		);

		expect(advanced).toHaveLength(6);
		expect(advanced[0]?.text).toBe("beta");
		expect(advanced.at(-1)?.text).toBe("alpha");
	});

	it("pauses runtime trace updates when the live control is toggled", () => {
		vi.useFakeTimers();
		vi.spyOn(Math, "random").mockReturnValue(0);

		render(<TraceLog locale="en-US" messages={messages["en-US"]} />);

		fireEvent.click(screen.getByRole("button", { name: "live" }));

		act(() => {
			vi.advanceTimersByTime(2800);
		});

		expect(screen.getByText("Profile fragments mounted")).toBeInTheDocument();
		expect(screen.getByText("paused")).toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "paused" }));

		act(() => {
			vi.advanceTimersByTime(2800);
		});

		expect(screen.getByText("Project index ready")).toBeInTheDocument();
	});

	it("restores runtime traces from the current browser session", () => {
		window.sessionStorage.setItem(
			"introduction.traceLog",
			JSON.stringify({
				locale: "en-US",
				nextTraceId: 8,
				nextTraceIndex: 8,
				visibleTraces: [
					{ id: 7, delayMs: 812, text: "Restored runtime trace" },
				],
			}),
		);

		render(<TraceLog locale="en-US" messages={messages["en-US"]} />);

		expect(screen.getByText("Restored runtime trace")).toBeInTheDocument();
	});

	it("selects random trace entries without immediately repeating the last one", () => {
		vi.spyOn(Math, "random").mockReturnValue(0);

		expect(selectNextTrace(["alpha", "beta", "gamma"], "alpha")).toBe("beta");
	});
});
