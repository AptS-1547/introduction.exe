import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import type { PluginOption } from "vite";
import { defineConfig } from "vitest/config";
import { projectSlugs } from "./src/data/projects";

const defaultSiteUrl = "https://me.esaps.net";

const staticRoutes = ["/", "/profile", "/projects", "/memory", "/contact"];

function getSiteUrl() {
	return (process.env.VITE_SITE_URL?.trim() || defaultSiteUrl).replace(
		/\/+$/,
		"",
	);
}

function escapeXml(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

function routeToUrl(siteUrl: string, route: string) {
	return new URL(route, `${siteUrl}/`).toString();
}

function seoFilesPlugin(): PluginOption {
	return {
		name: "introduction-seo-files",
		generateBundle() {
			const siteUrl = getSiteUrl();
			const routes = [
				...staticRoutes,
				...projectSlugs.map((slug) => `/projects/${slug}`),
			];
			const sitemap = [
				'<?xml version="1.0" encoding="UTF-8"?>',
				'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
				...routes.map((route) => {
					return [
						"  <url>",
						`    <loc>${escapeXml(routeToUrl(siteUrl, route))}</loc>`,
						"  </url>",
					].join("\n");
				}),
				"</urlset>",
				"",
			].join("\n");

			this.emitFile({
				type: "asset",
				fileName: "sitemap.xml",
				source: sitemap,
			});

			this.emitFile({
				type: "asset",
				fileName: "robots.txt",
				source: [
					"User-agent: *",
					"Allow: /",
					`Sitemap: ${routeToUrl(siteUrl, "/sitemap.xml")}`,
					"",
				].join("\n"),
			});
		},
		async writeBundle(options) {
			const outputDirectory = options.dir ?? "dist";
			const indexHtmlPath = join(outputDirectory, "index.html");
			const indexHtml = await readFile(indexHtmlPath, "utf8");

			await writeFile(join(outputDirectory, "404.html"), indexHtml);
		},
	};
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), seoFilesPlugin()],
	test: {
		coverage: {
			exclude: [
				"src/main.tsx",
				"src/types/**",
				"src/**/*.test.{ts,tsx}",
				"src/test/**",
			],
			include: ["src/**/*.{ts,tsx}"],
			thresholds: {
				branches: 85,
				functions: 85,
				lines: 85,
				statements: 85,
			},
		},
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
	},
});
