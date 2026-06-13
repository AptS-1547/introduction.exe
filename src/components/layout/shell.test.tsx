import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import App from "../../App";
import { I18nProvider } from "../../i18n/I18nProvider";
import { renderWithAppContext } from "../../test/render";
import { AppShell } from "../AppShell";
import { BootSequence } from "../boot/BootSequence";
import { MobileTabBar } from "./MobileTabBar";
import { ModuleRail } from "./ModuleRail";
import { ShellFrame } from "./ShellFrame";
import { TopStatusBar } from "./TopStatusBar";

describe("layout shell", () => {
	it("renders the boot sequence from localized boot lines", () => {
		renderWithAppContext(<BootSequence />, { locale: "en-US" });

		expect(
			screen.getByText("AptS:1547 personal archive boot sequence"),
		).toBeInTheDocument();
		expect(
			screen.getByText(/Mounted \/archive\/apts-1547/),
		).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: "introduction.exe" }),
		).toBeInTheDocument();
	});

	it("renders desktop and mobile navigation surfaces", () => {
		const onRestartBoot = vi.fn();

		renderWithAppContext(
			<ShellFrame onRestartBoot={onRestartBoot} runtimeStartedAt={0}>
				<p>route body</p>
			</ShellFrame>,
			{ route: "/memory" },
		);

		expect(screen.getByText("route body")).toBeInTheDocument();
		expect(screen.getAllByLabelText("Primary navigation")).toHaveLength(2);
		expect(screen.getAllByText("MEMORY").length).toBeGreaterThan(0);
		expect(screen.getByRole("button", { name: "重启" })).toBeInTheDocument();
	});

	it("calls toolbar actions for restart and locale switching", async () => {
		const user = userEvent.setup();
		const toggleLocale = vi.fn();
		const onRestartBoot = vi.fn();
		const { context } = renderWithAppContext(
			<TopStatusBar onRestartBoot={onRestartBoot} runtimeStartedAt={0} />,
			{ context: { toggleLocale }, route: "/projects" },
		);

		await user.click(screen.getByRole("button", { name: "重启" }));
		await user.click(
			screen.getByRole("button", { name: context.messages.actions.language }),
		);

		expect(onRestartBoot).toHaveBeenCalledTimes(1);
		expect(toggleLocale).toHaveBeenCalledTimes(1);
		expect(screen.getByText("/path: /projects")).toBeInTheDocument();
		expect(screen.getByText("Engineering traces")).toBeInTheDocument();
	});

	it("renders standalone navigation components", () => {
		renderWithAppContext(
			<>
				<ModuleRail />
				<MobileTabBar />
			</>,
			{ locale: "en-US", route: "/contact" },
		);

		expect(screen.getByText("personal runtime")).toBeInTheDocument();
		expect(screen.getAllByText("CONTACT").length).toBeGreaterThan(0);
		expect(screen.getAllByLabelText("Primary navigation")).toHaveLength(2);
		expect(screen.getByText("PID")).toBeInTheDocument();
	});

	it("renders the app shell route and can restart boot", async () => {
		vi.useFakeTimers();
		window.sessionStorage.setItem("introduction.booted", "true");

		renderWithAppContext(<AppShell />, { route: "/projects" });

		expect(
			screen.getByRole("heading", { name: "Projects worth opening" }),
		).toBeInTheDocument();
		expect(window.scrollTo).toHaveBeenCalledWith(0, 0);

		fireEvent.click(screen.getByRole("button", { name: "重启" }));

		expect(
			screen.getByText("AptS:1547 personal archive boot sequence"),
		).toBeInTheDocument();

		act(() => {
			vi.advanceTimersByTime(2850);
		});

		expect(window.sessionStorage.getItem("introduction.booted")).toBe("true");
		vi.useRealTimers();
	});

	it("renders the root App component with providers", () => {
		window.history.pushState({}, "", "/contact");
		window.sessionStorage.setItem("introduction.booted", "true");

		render(<App />);

		expect(
			screen.getByRole("heading", { name: "Signal channel ready." }),
		).toBeInTheDocument();
	});

	it("updates displayed copy after toggling locale through the app providers", async () => {
		vi.useFakeTimers();
		window.sessionStorage.setItem("introduction.booted", "true");

		render(
			<I18nProvider>
				<MemoryRouter initialEntries={["/profile"]}>
					<AppShell />
				</MemoryRouter>
			</I18nProvider>,
		);

		expect(screen.getByRole("heading", { name: "卞雨涵" })).toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "EN" }));

		expect(
			screen.getByRole("heading", { name: "Bian Yuhan" }),
		).toBeInTheDocument();
		expect(window.localStorage.getItem("introduction.locale")).toBe("en-US");

		act(() => {
			vi.advanceTimersByTime(260);
		});

		vi.useRealTimers();
	});
});
