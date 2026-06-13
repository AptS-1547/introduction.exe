import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { I18nProvider } from "../i18n/I18nProvider";

vi.mock("framer-motion", async () => {
	const actual =
		await vi.importActual<typeof import("framer-motion")>("framer-motion");

	return {
		...actual,
		useReducedMotion: () => true,
	};
});

describe("reduced motion rendering", () => {
	beforeEach(() => {
		window.sessionStorage.setItem("introduction.booted", "true");
	});

	it("renders animated shell components with reduced motion enabled", async () => {
		const { AppShell } = await import("./AppShell");

		render(
			<I18nProvider>
				<MemoryRouter initialEntries={["/projects/shortlinker"]}>
					<AppShell />
				</MemoryRouter>
			</I18nProvider>,
		);

		expect(
			screen.getByRole("heading", { name: "ShortLinker - 短链接服务" }),
		).toBeInTheDocument();
		expect(
			screen.getByText("/path: /projects/shortlinker"),
		).toBeInTheDocument();
		expect(screen.getAllByText("PROJECTS").length).toBeGreaterThan(0);
	});

	it("renders boot and identity animations in reduced motion mode", async () => {
		const { BootSequence } = await import("./boot/BootSequence");
		const { IdentityCore } = await import("./home/IdentityCore");

		render(
			<I18nProvider>
				<MemoryRouter>
					<BootSequence />
					<IdentityCore />
				</MemoryRouter>
			</I18nProvider>,
		);

		expect(
			screen.getByText("AptS:1547 personal archive boot sequence"),
		).toBeInTheDocument();
		expect(screen.getByText("Executable identity core")).toBeInTheDocument();
	});
});
