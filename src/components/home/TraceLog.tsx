import type { MessageCatalog } from "../../i18n/messages";
import { monoCaps, panelClass } from "../../styles/classes";

type TraceLogProps = {
	messages: MessageCatalog;
};

export function TraceLog({ messages }: TraceLogProps) {
	return (
		<section className={`${panelClass} p-5`}>
			<p className={monoCaps}>{messages.home.traceTitle}</p>
			<div className="mt-4 grid gap-2 font-mono text-[0.76rem] tracking-normal">
				{messages.home.traces.map((trace) => (
					<p key={trace} className="grid grid-cols-[54px_minmax(0,1fr)] gap-3">
						<span className="text-[var(--green)]">[ OK ]</span>
						<span className="text-[var(--muted)]">{trace}</span>
					</p>
				))}
			</div>
		</section>
	);
}
