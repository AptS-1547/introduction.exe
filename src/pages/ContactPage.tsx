import { FiGithub, FiMail, FiMapPin, FiRss, FiTerminal } from "react-icons/fi";
import { useI18n } from "../i18n/useI18n";
import { actionSecondary, glassOverlay, pageTitle } from "../styles/classes";

const contactIcons = [FiMail, FiGithub, FiMapPin, FiRss];

export function ContactPage() {
	const { messages } = useI18n();

	return (
		<section className="relative min-h-[calc(100vh-156px)] overflow-hidden border border-[var(--line)] bg-[#05080b] shadow-[var(--shadow)] max-[1079px]:min-h-[calc(100vh-176px)]">
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-[image:linear-gradient(90deg,rgba(5,8,11,0.76)_0%,rgba(5,8,11,0.52)_38%,rgba(5,8,11,0.78)_100%),linear-gradient(180deg,rgba(3,6,9,0.14)_0%,rgba(3,6,9,0.58)_100%),url('/images/contact/contact.webp')] bg-cover bg-[center_28%]"
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(99,230,244,0.18),transparent_24%),radial-gradient(circle_at_28%_82%,rgba(255,93,102,0.1),transparent_28%)]"
			/>
			<div className="relative grid min-h-[calc(100vh-156px)] items-end px-5 py-5 max-[1079px]:min-h-[calc(100vh-176px)] max-[620px]:px-3.5 max-[620px]:py-3.5 min-[921px]:items-center min-[921px]:justify-items-end">
				<div className="w-full max-w-[560px] min-[921px]:mr-[clamp(1rem,3vw,2.5rem)]">
					<div className={`${glassOverlay} rounded-none p-5 max-[620px]:p-4`}>
						<div className="mb-7 flex gap-2">
							<span className="size-2.5 rounded-full bg-[var(--red)]" />
							<span className="size-2.5 rounded-full bg-[var(--amber)]" />
							<span className="size-2.5 rounded-full bg-[var(--green)]" />
						</div>
						<p className="mb-4 flex items-center gap-2.5 font-mono text-[0.8rem] tracking-normal text-[var(--cyan)]">
							<FiTerminal />
							{messages.contact.command}
						</p>
						<h1 className={`${pageTitle} mb-[18px]`}>
							{messages.contact.title}
						</h1>
						<p className="max-w-[42ch] leading-[1.75] text-[var(--muted)]">
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
				</div>
			</div>
		</section>
	);
}
