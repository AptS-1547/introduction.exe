import { useMemo, useState } from "react";
import { I18nContext, type I18nContextValue } from "./I18nContext";
import { type Locale, messages } from "./messages";

const defaultLocale: Locale = "zh-CN";
const storageKey = "introduction.locale";

function readInitialLocale(): Locale {
	const stored = window.localStorage.getItem(storageKey);
	return stored === "en-US" || stored === "zh-CN" ? stored : defaultLocale;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
	const [isLocaleTransitioning, setIsLocaleTransitioning] = useState(false);
	const [locale, setLocale] = useState<Locale>(readInitialLocale);

	const value = useMemo<I18nContextValue>(() => {
		return {
			isLocaleTransitioning,
			locale,
			messages: messages[locale],
			toggleLocale: () => {
				setIsLocaleTransitioning(true);
				setLocale((current) => {
					const next = current === "zh-CN" ? "en-US" : "zh-CN";
					window.localStorage.setItem(storageKey, next);
					return next;
				});
				window.setTimeout(() => setIsLocaleTransitioning(false), 260);
			},
		};
	}, [isLocaleTransitioning, locale]);

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
