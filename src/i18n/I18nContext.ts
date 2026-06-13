import { createContext } from "react";
import type { Locale, MessageCatalog } from "./messages";

export type I18nContextValue = {
	isLocaleTransitioning: boolean;
	locale: Locale;
	messages: MessageCatalog;
	toggleLocale: () => void;
};

export const I18nContext = createContext<I18nContextValue | null>(null);
