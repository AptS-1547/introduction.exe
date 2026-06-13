import { FiArrowUpRight } from "react-icons/fi";
import { NavLink } from "react-router";
import type { MessageCatalog } from "../../i18n/messages";
import { navItems } from "../../routes/nav";
import { monoCaps, panelClass } from "../../styles/classes";

type ModuleLauncherProps = {
	messages: MessageCatalog;
};

const moduleStates = ["mounted", "indexed", "available", "idle"];

export function ModuleLauncher({ messages }: ModuleLauncherProps) {
	return (
		<section className={`${panelClass} p-5`}>
			<p className={monoCaps}>{messages.home.moduleTitle}</p>
			<div className="mt-4 grid gap-2">
				{navItems.slice(1).map((item, index) => {
					const Icon = item.icon;

					return (
						<NavLink
							key={item.to}
							className="group grid min-h-[72px] grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 border border-[rgba(156,184,190,0.16)] bg-[rgba(255,255,255,0.025)] p-3 transition hover:border-[var(--line-hot)] hover:bg-[rgba(99,230,244,0.08)]"
							to={item.to}
						>
							<span className="grid gap-1 font-mono text-[0.66rem] text-[var(--faint)]">
								{item.index}
								<Icon className="text-[var(--cyan)]" />
							</span>
							<span className="min-w-0">
								<strong className="block font-mono text-[0.82rem] tracking-normal">
									{messages.nav[item.messageKey]}
								</strong>
								<small className="mt-1 block truncate text-[0.74rem] text-[var(--faint)]">
									{messages.navDescriptions[item.messageKey]}
								</small>
							</span>
							<span className="hidden items-center gap-2 font-mono text-[0.66rem] text-[var(--green)] uppercase min-[560px]:flex">
								{moduleStates[index]}
								<FiArrowUpRight className="text-[var(--muted)] transition group-hover:text-[var(--cyan)]" />
							</span>
						</NavLink>
					);
				})}
			</div>
		</section>
	);
}
