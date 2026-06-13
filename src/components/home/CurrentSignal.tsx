import { FiRadio } from "react-icons/fi";
import type { MessageCatalog } from "../../i18n/messages";
import { monoCaps, panelClass } from "../../styles/classes";

type CurrentSignalProps = {
	messages: MessageCatalog;
};

const signalBars = Array.from({ length: 12 }, (_, index) => ({
	id: `signal-bar-${index + 1}`,
	delay: index * 0.11,
	height: 28 + ((index * 17) % 58),
}));

export function CurrentSignal({ messages }: CurrentSignalProps) {
	return (
		<section className={`${panelClass} p-5`}>
			<div className="flex items-center justify-between gap-4">
				<p className={monoCaps}>
					<FiRadio className="mr-2 inline" />
					{messages.home.quoteTitle}
				</p>
				<div
					aria-hidden="true"
					className="grid h-5 w-24 grid-cols-12 items-end gap-1 overflow-hidden"
				>
					{signalBars.map((bar) => (
						<span
							key={bar.id}
							className="block animate-[signalBars_2.6s_ease-in-out_infinite] bg-[var(--cyan)] opacity-45 shadow-[0_0_10px_rgba(99,230,244,0.28)]"
							style={{
								animationDelay: `${bar.delay}s`,
								height: `${bar.height}%`,
							}}
						/>
					))}
				</div>
			</div>
			<blockquote className="mt-5 border-l border-[var(--line-hot)] pl-4 text-[clamp(1.15rem,2.2vw,1.65rem)] leading-[1.65] text-[var(--text)]">
				{messages.profile.quote}
			</blockquote>
		</section>
	);
}
