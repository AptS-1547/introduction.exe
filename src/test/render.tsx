import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import { I18nContext, type I18nContextValue } from "../i18n/I18nContext";
import { type Locale, messages } from "../i18n/messages";

type RenderOptions = {
	locale?: Locale;
	route?: string;
	context?: Partial<I18nContextValue>;
};

export function renderWithAppContext(
	ui: ReactNode,
	{ context, locale = "zh-CN", route = "/" }: RenderOptions = {},
) {
	const value: I18nContextValue = {
		isLocaleTransitioning: false,
		locale,
		messages: messages[locale],
		toggleLocale: vi.fn(),
		...context,
	};

	return {
		context: value,
		...render(
			<I18nContext.Provider value={value}>
				<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
			</I18nContext.Provider>,
		),
	};
}
