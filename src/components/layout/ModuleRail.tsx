import { NavLink } from "react-router";
import { useI18n } from "../../i18n/useI18n";
import { navItems } from "../../routes/nav";
import { glassOverlay } from "../../styles/classes";

export function ModuleRail() {
	const { messages } = useI18n();

	return (
		<aside
			className={`fixed top-4 left-[max(1rem,calc((100vw-1440px)/2+1rem))] z-20 hidden h-[calc(100svh-32px)] w-[248px] p-4 min-[921px]:grid min-[921px]:grid-rows-[auto_minmax(0,1fr)_auto] ${glassOverlay}`}
		>
			<NavLink className="mb-8 flex items-center gap-3" to="/">
				<span className="grid size-11 shrink-0 place-items-center overflow-hidden bg-[rgba(99,230,244,0.06)] shadow-[0_0_28px_rgba(99,230,244,0.16)]">
					<img
						src="/images/general/logo.webp"
						alt=""
						width="96"
						height="96"
						className="h-full w-full object-cover"
						aria-hidden="true"
					/>
				</span>
				<span>
					<strong className="block font-mono text-[0.95rem] leading-[1.1] tracking-normal">
						{messages.brand.name}
					</strong>
					<small className="mt-[3px] block font-mono text-[0.68rem] tracking-normal text-[var(--muted)] uppercase">
						{messages.brand.subtitle}
					</small>
				</span>
			</NavLink>
			<nav
				className="grid content-start gap-2 overflow-y-auto pr-1"
				aria-label="Primary navigation"
			>
				{navItems.map((item) => {
					const Icon = item.icon;

					return (
						<NavLink
							key={item.to}
							className={({ isActive }) =>
								[
									"group grid min-h-[72px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 border p-3 transition duration-200",
									isActive
										? "border-[rgba(99,230,244,0.44)] bg-[linear-gradient(145deg,rgba(99,230,244,0.16),rgba(255,255,255,0.035))] text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
										: "border-white/0 text-[var(--muted)] hover:border-white/12 hover:bg-[rgba(255,255,255,0.045)] hover:text-[var(--text)]",
								].join(" ")
							}
							to={item.to}
						>
							<span className="grid gap-1 font-mono text-[0.68rem] tracking-normal text-[var(--faint)]">
								{item.index}
								<Icon className="text-[var(--cyan)]" />
							</span>
							<span className="min-w-0">
								<strong className="block font-mono text-[0.78rem] tracking-normal">
									{messages.nav[item.messageKey]}
								</strong>
								<small className="mt-1 block truncate text-[0.76rem] text-[var(--faint)]">
									{messages.navDescriptions[item.messageKey]}
								</small>
							</span>
						</NavLink>
					);
				})}
			</nav>
			<div className="grid gap-2 border-t border-[rgba(156,184,190,0.14)] pt-4 font-mono text-[0.66rem] tracking-normal text-[var(--faint)] uppercase">
				<span>{messages.status.runtime}</span>
				<span>{messages.status.build}</span>
			</div>
		</aside>
	);
}
