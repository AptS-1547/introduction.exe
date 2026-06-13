import { FiRadio } from "react-icons/fi";
import type { MessageCatalog } from "../../i18n/messages";
import { monoCaps, panelClass } from "../../styles/classes";

type CurrentSignalProps = {
	messages: MessageCatalog;
};

export function CurrentSignal({ messages }: CurrentSignalProps) {
	return (
		<section className={`${panelClass} p-5`}>
			<p className={monoCaps}>
				<FiRadio className="mr-2 inline" />
				{messages.home.quoteTitle}
			</p>
			<blockquote className="mt-5 border-l border-[var(--line-hot)] pl-4 text-[clamp(1.15rem,2.2vw,1.65rem)] leading-[1.65] text-[var(--text)]">
				{messages.profile.quote}
			</blockquote>
		</section>
	);
}
