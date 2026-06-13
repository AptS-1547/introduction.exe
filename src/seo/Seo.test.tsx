import { waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithAppContext } from "../test/render";
import { Seo } from "./Seo";

function getMeta(attribute: "name" | "property", key: string) {
	return document.head
		.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
		?.getAttribute("content");
}

function getCanonical() {
	return document.head
		.querySelector<HTMLLinkElement>('link[rel="canonical"]')
		?.getAttribute("href");
}

describe("Seo", () => {
	it("updates base metadata for static routes", async () => {
		renderWithAppContext(<Seo />, {
			locale: "en-US",
			route: "/profile",
		});

		await waitFor(() => {
			expect(document.title).toBe(
				"Bian Yuhan / AptS:1547 - Full-stack Developer | introduction.exe",
			);
		});

		expect(document.documentElement.lang).toBe("en-US");
		expect(getCanonical()).toBe("https://me.esaps.net/profile");
		expect(getMeta("name", "robots")).toBe("index, follow");
		expect(getMeta("property", "og:type")).toBe("profile");
		expect(getMeta("name", "description")).toContain("Rust backend systems");
	});

	it("publishes project detail metadata and JSON-LD", async () => {
		renderWithAppContext(<Seo />, {
			locale: "en-US",
			route: "/projects/shortlinker",
		});

		await waitFor(() => {
			expect(document.title).toBe(
				"ShortLinker - AptS:1547 Project | introduction.exe",
			);
		});

		const structuredData = JSON.parse(
			document.getElementById("structured-data")?.textContent ?? "{}",
		);

		expect(getCanonical()).toBe("https://me.esaps.net/projects/shortlinker");
		expect(getMeta("property", "og:image")).toBe(
			"https://me.esaps.net/images/projects/shortlinker.webp",
		);
		expect(structuredData["@type"]).toBe("SoftwareSourceCode");
		expect(structuredData.codeRepository).toBe(
			"https://github.com/AptS-1547/shortlinker",
		);
	});

	it("marks missing project records as noindex", async () => {
		renderWithAppContext(<Seo />, {
			route: "/projects/not-found",
		});

		await waitFor(() => {
			expect(document.title).toBe(
				"Project not found - AptS:1547 | introduction.exe",
			);
		});

		expect(getMeta("name", "robots")).toBe("noindex, nofollow");
	});
});
