import { FiGithub, FiMail, FiMapPin, FiRss, FiTerminal } from "react-icons/fi";
import { useI18n } from "../i18n/useI18n";
import { actionSecondary, pageTitle } from "../styles/classes";

const contactIcons = [FiMail, FiGithub, FiMapPin, FiRss];

export function ContactPage() {
	const { messages } = useI18n();

	return (
		<section className="grid min-h-[58vh] place-items-center">
			<div className="w-[min(760px,100%)] border border-[var(--line)] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),transparent_42%),var(--panel)] p-[26px] shadow-[var(--shadow)]">
				<div className="mb-7 flex gap-2">
					<span className="size-2.5 rounded-full bg-[var(--red)]" />
					<span className="size-2.5 rounded-full bg-[var(--amber)]" />
					<span className="size-2.5 rounded-full bg-[var(--green)]" />
				</div>
				<p className="mb-4 flex items-center gap-2.5 font-mono text-[0.8rem] tracking-normal text-[var(--cyan)]">
					<FiTerminal />
					{messages.contact.command}
				</p>
				<h2 className={`${pageTitle} mb-[18px]`}>{messages.contact.title}</h2>
				<p className="leading-[1.75] text-[var(--muted)]">
					{messages.contact.body}
				</p>
				<div className="mt-[34px] flex flex-wrap gap-3 max-[620px]:flex-col">
					{messages.contact.links.map((link, index) => {
						const Icon = contactIcons[index] ?? FiMapPin;
						const isExternal = link.href.startsWith("http");

						return (
							<a
								key={link.href}
								className={actionSecondary}
								href={link.href}
								rel={isExternal ? "noreferrer" : undefined}
								target={isExternal ? "_blank" : undefined}
							>
								<Icon />
								{link.label}
							</a>
						);
					})}
				</div>
			</div>
		</section>
	);
}
