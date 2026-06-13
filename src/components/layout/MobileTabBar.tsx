import { NavLink } from "react-router";
import { useI18n } from "../../i18n/useI18n";
import { navItems } from "../../routes/nav";
import { glassOverlay } from "../../styles/classes";

export function MobileTabBar() {
	const { messages } = useI18n();

	return (
		<nav
			className={`fixed right-3 bottom-3 left-3 z-20 grid grid-cols-5 p-1 min-[1080px]:hidden ${glassOverlay}`}
			aria-label="Primary navigation"
		>
			{navItems.map((item) => {
				const Icon = item.icon;

				return (
					<NavLink
						key={item.to}
						className={({ isActive }) =>
							[
								"grid min-h-[58px] place-items-center gap-1 border px-1 font-mono text-[0.62rem] tracking-normal transition",
								isActive
									? "border-[rgba(99,230,244,0.38)] bg-[rgba(99,230,244,0.13)] text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
									: "border-transparent text-[var(--muted)] hover:bg-white/5",
							].join(" ")
						}
						to={item.to}
						aria-label={messages.nav[item.messageKey]}
					>
						<Icon className="text-base" />
						<span>{item.shortLabel}</span>
					</NavLink>
				);
			})}
		</nav>
	);
}
