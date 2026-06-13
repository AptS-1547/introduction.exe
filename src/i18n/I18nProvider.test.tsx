import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { I18nProvider } from "./I18nProvider";
import { messages } from "./messages";
import { useI18n } from "./useI18n";

function LocaleProbe() {
	const { isLocaleTransitioning, locale, messages, toggleLocale } = useI18n();

	return (
		<div>
			<p data-testid="locale">{locale}</p>
			<p data-testid="title">{messages.profile.handle}</p>
			<p data-testid="transition">
				{isLocaleTransitioning ? "transitioning" : "stable"}
			</p>
			<button type="button" onClick={toggleLocale}>
				{messages.actions.language}
			</button>
		</div>
	);
}

describe("I18nProvider", () => {
	it("starts with the default locale when storage is empty", () => {
		render(
			<I18nProvider>
				<LocaleProbe />
			</I18nProvider>,
		);

		expect(screen.getByTestId("locale")).toHaveTextContent("zh-CN");
		expect(screen.getByTestId("title")).toHaveTextContent("卞雨涵");
	});

	it("uses a supported locale from localStorage", () => {
		window.localStorage.setItem("introduction.locale", "en-US");

		render(
			<I18nProvider>
				<LocaleProbe />
			</I18nProvider>,
		);

		expect(screen.getByTestId("locale")).toHaveTextContent("en-US");
		expect(screen.getByTestId("title")).toHaveTextContent("Bian Yuhan");
	});

	it("ignores unsupported locale values from localStorage", () => {
		window.localStorage.setItem("introduction.locale", "ja-JP");

		render(
			<I18nProvider>
				<LocaleProbe />
			</I18nProvider>,
		);

		expect(screen.getByTestId("locale")).toHaveTextContent("zh-CN");
	});

	it("toggles locale, persists it, and clears transition state", async () => {
		vi.useFakeTimers();

		render(
			<I18nProvider>
				<LocaleProbe />
			</I18nProvider>,
		);

		fireEvent.click(screen.getByRole("button", { name: "EN" }));

		expect(screen.getByTestId("locale")).toHaveTextContent("en-US");
		expect(screen.getByTestId("transition")).toHaveTextContent("transitioning");
		expect(window.localStorage.getItem("introduction.locale")).toBe("en-US");

		act(() => {
			vi.advanceTimersByTime(260);
		});

		expect(screen.getByTestId("transition")).toHaveTextContent("stable");
		vi.useRealTimers();
	});
});

describe("useI18n", () => {
	it("throws outside I18nProvider", () => {
		const consoleError = vi
			.spyOn(console, "error")
			.mockImplementation(() => {});

		expect(() => render(<LocaleProbe />)).toThrow(
			"useI18n must be used inside I18nProvider",
		);
		consoleError.mockRestore();
	});
});

describe("messages", () => {
	it("keeps both locale catalogs structurally aligned", () => {
		expect(Object.keys(messages["zh-CN"])).toEqual(
			Object.keys(messages["en-US"]),
		);
		expect(messages["zh-CN"].boot.lines).toHaveLength(
			messages["en-US"].boot.lines.length,
		);
		expect(messages["zh-CN"].projects.items.map((item) => item.name)).toEqual(
			messages["en-US"].projects.items.map((item) => item.name),
		);
		expect(messages["zh-CN"].memory.collections).toHaveLength(2);
		expect(messages["en-US"].contact.links.every((link) => link.href)).toBe(
			true,
		);
	});
});
