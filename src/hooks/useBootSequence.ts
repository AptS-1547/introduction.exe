import { useCallback, useEffect, useState } from "react";

const bootStorageKey = "introduction.booted";
const bootDurationMs = 2850;

export function useBootSequence() {
	const [booting, setBooting] = useState(() => {
		return window.sessionStorage.getItem(bootStorageKey) !== "true";
	});

	useEffect(() => {
		if (!booting) {
			return;
		}

		const timer = window.setTimeout(() => {
			window.sessionStorage.setItem(bootStorageKey, "true");
			setBooting(false);
		}, bootDurationMs);

		return () => window.clearTimeout(timer);
	}, [booting]);

	const restartBoot = useCallback(() => {
		window.sessionStorage.removeItem(bootStorageKey);
		setBooting(true);
	}, []);

	return { booting, restartBoot };
}
