import { screen } from "@testing-library/react";
import { FiTerminal } from "react-icons/fi";
import { Route, Routes } from "react-router";
import { describe, expect, it } from "vitest";
import { Panel } from "../components/Panel";
import { messages } from "../i18n/messages";
import { navItems } from "../routes/nav";
import {
	actionPrimary,
	actionSecondary,
	glassButton,
	glassOverlay,
	monoCaps,
	pageTitle,
	panelClass,
} from "../styles/classes";
import { renderWithAppContext } from "../test/render";
import { ContactPage } from "./ContactPage";
import { HomePage } from "./HomePage";
import { MemoryPage } from "./MemoryPage";
import { NotFoundPage } from "./NotFoundPage";
import { ProfilePage } from "./ProfilePage";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { ProjectsPage } from "./ProjectsPage";

describe("content pages", () => {
	it("renders the home dashboard in Chinese", () => {
		renderWithAppContext(<HomePage />);

		expect(
			screen.getByText("introduction.exe --open-profile --lang zh-CN"),
		).toBeInTheDocument();
		expect(screen.getByText("Runtime Modules")).toBeInTheDocument();
		expect(screen.getByText("Executable identity core")).toBeInTheDocument();
		expect(screen.getByText("Recent Trace")).toBeInTheDocument();
		expect(screen.getByText("Project index ready")).toBeInTheDocument();
		expect(screen.getAllByText("ESAP-TY-0000").length).toBeGreaterThan(0);
	});

	it("renders profile sections from the active locale", () => {
		renderWithAppContext(<ProfilePage />, { locale: "en-US" });

		expect(
			screen.getByRole("heading", { name: "Bian Yuhan" }),
		).toBeInTheDocument();
		expect(
			screen.getByText("Creator / Full-stack Developer / Stubborn Altruist"),
		).toBeInTheDocument();
		expect(screen.getAllByText("Capability Map")).toHaveLength(1);
		expect(screen.getByText("Rust Backend Systems")).toBeInTheDocument();
		expect(screen.getByText("Structured thinking")).toBeInTheDocument();
		expect(screen.getByText("signal stable")).toBeInTheDocument();
	});

	it("renders project cards, images, and tags", () => {
		renderWithAppContext(<ProjectsPage />);

		expect(
			screen.getByRole("heading", { name: "Projects worth opening" }),
		).toBeInTheDocument();
		expect(screen.getByText("ShortLinker - 短链接服务")).toBeInTheDocument();
		expect(
			screen.getByText("DNS Orchestrator - DNS 统一管理平台"),
		).toBeInTheDocument();
		expect(
			screen.getByText("AsterDrive - 自托管云存储系统"),
		).toBeInTheDocument();
		expect(screen.getByText("gcop-rs - AI Git 助手")).toBeInTheDocument();
		expect(screen.getAllByRole("link")[0]).toHaveAttribute(
			"href",
			"/projects/aster-drive",
		);
		expect(screen.getByRole("link", { name: /ShortLinker/ })).toHaveAttribute(
			"href",
			"/projects/shortlinker",
		);
		expect(screen.getAllByText("Actix-web").length).toBeGreaterThan(0);
	});

	it("renders a project detail route and its archive signals", () => {
		renderWithAppContext(
			<Routes>
				<Route path="/projects/:slug" element={<ProjectDetailPage />} />
			</Routes>,
			{
				locale: "en-US",
				route: "/projects/shortlinker",
			},
		);

		expect(
			screen.getByRole("heading", { name: "ShortLinker" }),
		).toBeInTheDocument();
		expect(screen.getByText("shortlinker")).toBeInTheDocument();
		expect(screen.getByText("Feature Signals")).toBeInTheDocument();
		expect(
			screen.getByText("Achieves 700k+ QPS with optimized caching layer"),
		).toBeInTheDocument();
		expect(screen.getByRole("link", { name: /\/projects/ })).toHaveAttribute(
			"href",
			"/projects",
		);
	});

	it("renders project detail fallback for missing slugs", () => {
		const { unmount } = renderWithAppContext(
			<Routes>
				<Route path="/projects/:slug" element={<ProjectDetailPage />} />
			</Routes>,
			{
				route: "/projects/not-found",
			},
		);

		expect(
			screen.getByRole("heading", { name: "PROJECT SIGNAL LOST" }),
		).toBeInTheDocument();
		expect(screen.getByText("/projects/not-found")).toBeInTheDocument();
		expect(screen.getByText("返回项目索引")).toHaveAttribute(
			"href",
			"/projects",
		);

		unmount();

		renderWithAppContext(
			<Routes>
				<Route path="/projects/:slug" element={<ProjectDetailPage />} />
			</Routes>,
			{
				route: "/projects/dns-orchestrator",
			},
		);

		expect(
			screen.getByRole("heading", {
				name: "DNS Orchestrator - DNS 统一管理平台",
			}),
		).toBeInTheDocument();
	});

	it("renders a 404 page for unknown routes", () => {
		const { container, unmount } = renderWithAppContext(<NotFoundPage />, {
			locale: "en-US",
			route: "/unknown/system",
		});

		expect(
			screen.getByRole("heading", { name: "404 / SIGNAL LOST" }),
		).toBeInTheDocument();
		expect(screen.getByText("/unknown/system")).toBeInTheDocument();
		expect(screen.getByText("Return to INIT")).toHaveAttribute("href", "/");
		expect(screen.getByText("View Projects")).toHaveAttribute(
			"href",
			"/projects",
		);

		const firstPattern = Array.from(
			container.querySelectorAll("[data-active]"),
			(cell) => cell.getAttribute("data-active"),
		).join("");

		unmount();

		const { container: secondContainer } = renderWithAppContext(
			<NotFoundPage />,
			{
				locale: "en-US",
				route: "/sada",
			},
		);
		const secondPattern = Array.from(
			secondContainer.querySelectorAll("[data-active]"),
			(cell) => cell.getAttribute("data-active"),
		).join("");

		expect(secondPattern).not.toBe(firstPattern);
	});

	it("renders memory archives and timeline entries", () => {
		renderWithAppContext(<MemoryPage />, { locale: "en-US" });

		expect(
			screen.getByRole("heading", { name: "Universe Archive" }),
		).toBeInTheDocument();
		expect(screen.getByText("The ESAP Project")).toBeInTheDocument();
		expect(screen.getByText("The Remnant Project")).toBeInTheDocument();
		expect(
			screen.getByText("Feedscattering Particle Discovery"),
		).toBeInTheDocument();
		expect(screen.getByText("Archive Note")).toBeInTheDocument();
		expect(screen.getByText("Recovered file")).toBeInTheDocument();
	});

	it("renders contact links with external link attributes", () => {
		renderWithAppContext(<ContactPage />);

		expect(
			screen.getByRole("heading", { name: "Signal channel ready." }),
		).toBeInTheDocument();

		const mailLink = screen.getByRole("link", {
			name: /AptS-1547@esaps.net/,
		});
		const githubLink = screen.getByRole("link", { name: /GitHub/ });

		expect(mailLink).toHaveAttribute("href", "mailto:AptS-1547@esaps.net");
		expect(mailLink).not.toHaveAttribute("target");
		expect(githubLink).toHaveAttribute("target", "_blank");
		expect(githubLink).toHaveAttribute("rel", "noreferrer");
	});
});

describe("shared content and presentational constants", () => {
	it("renders a titled panel with its children", () => {
		renderWithAppContext(
			<Panel title="Probe Panel" icon={FiTerminal}>
				<p>panel body</p>
			</Panel>,
		);

		expect(screen.getByText("Probe Panel")).toBeInTheDocument();
		expect(screen.getByText("panel body")).toBeInTheDocument();
	});

	it("defines navigation and style tokens used by the shell", () => {
		expect(navItems.map((item) => item.to)).toEqual([
			"/",
			"/profile",
			"/projects",
			"/memory",
			"/contact",
		]);
		expect(navItems.every((item) => item.index && item.shortLabel)).toBe(true);
		expect(Object.keys(messages)).toEqual(["zh-CN", "en-US"]);
		expect(panelClass).toContain("border");
		expect(glassOverlay).toContain("backdrop-blur");
		expect(glassButton).toContain("transition");
		expect(monoCaps).toContain("uppercase");
		expect(actionPrimary).toContain("inline-flex");
		expect(actionSecondary).toContain("inline-flex");
		expect(pageTitle).toContain("clamp");
	});
});
