export const defaultSiteUrl = "https://me.esaps.net";

function trimTrailingSlashes(value: string) {
	return value.replace(/\/+$/, "");
}

export function getSiteUrl() {
	const configured =
		typeof import.meta.env.VITE_SITE_URL === "string"
			? import.meta.env.VITE_SITE_URL.trim()
			: "";

	return trimTrailingSlashes(configured || defaultSiteUrl);
}

export function buildAbsoluteUrl(pathname: string) {
	const siteUrl = getSiteUrl();
	const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

	return new URL(normalizedPath, `${siteUrl}/`).toString();
}

export function buildImageUrl(pathname: string) {
	return buildAbsoluteUrl(pathname);
}
