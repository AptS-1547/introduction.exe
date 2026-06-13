import { FiTerminal } from "react-icons/fi";
import type { MessageCatalog } from "../../i18n/messages";
import { monoCaps, panelClass } from "../../styles/classes";

type CommandPanelProps = {
	messages: MessageCatalog;
};

export function CommandPanel({ messages }: CommandPanelProps) {
	return (
		<section className={`${panelClass} p-5`}>
			<p className={monoCaps}>
				<FiTerminal className="mr-2 inline" />
				{messages.home.command}
			</p>
			<div className="mt-5 grid gap-2 font-mono text-[0.78rem] tracking-normal">
				{messages.home.identityRows.map((row) => (
					<div
						key={row.label}
						className="grid min-h-[42px] grid-cols-[74px_minmax(0,1fr)] items-center gap-3 border border-[rgba(156,184,190,0.14)] bg-[rgba(255,255,255,0.024)] px-3 py-2 max-[620px]:grid-cols-1 max-[620px]:gap-1"
					>
						<span className="text-[var(--faint)]">{row.label}</span>
						<strong className="min-w-0 break-words text-[var(--text)]">
							{row.value}
						</strong>
					</div>
				))}
			</div>
		</section>
	);
}
