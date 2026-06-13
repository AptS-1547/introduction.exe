import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useBootSequence } from "./useBootSequence";

function BootProbe() {
	const { booting, restartBoot } = useBootSequence();

	return (
		<div>
			<p data-testid="booting">{booting ? "booting" : "ready"}</p>
			<button type="button" onClick={restartBoot}>
				restart
			</button>
		</div>
	);
}

describe("useBootSequence", () => {
	it("boots once, persists completion, and clears the timer", () => {
		vi.useFakeTimers();

		const { unmount } = render(<BootProbe />);

		expect(screen.getByTestId("booting")).toHaveTextContent("booting");
		expect(window.sessionStorage.getItem("introduction.booted")).toBeNull();

		act(() => {
			vi.advanceTimersByTime(2850);
		});

		expect(screen.getByTestId("booting")).toHaveTextContent("ready");
		expect(window.sessionStorage.getItem("introduction.booted")).toBe("true");

		unmount();
		vi.useRealTimers();
	});

	it("skips boot when the session has already completed it", () => {
		window.sessionStorage.setItem("introduction.booted", "true");

		render(<BootProbe />);

		expect(screen.getByTestId("booting")).toHaveTextContent("ready");
	});

	it("can restart the boot sequence", async () => {
		vi.useFakeTimers();
		window.sessionStorage.setItem("introduction.booted", "true");

		render(<BootProbe />);

		fireEvent.click(screen.getByRole("button", { name: "restart" }));

		expect(window.sessionStorage.getItem("introduction.booted")).toBeNull();
		expect(screen.getByTestId("booting")).toHaveTextContent("booting");

		act(() => {
			vi.advanceTimersByTime(2850);
		});

		expect(screen.getByTestId("booting")).toHaveTextContent("ready");
		vi.useRealTimers();
	});
});
