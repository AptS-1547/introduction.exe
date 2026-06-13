import { FiArchive, FiClock, FiTerminal } from "react-icons/fi";
import { Panel } from "../components/Panel";
import { useI18n } from "../i18n/useI18n";
import { monoCaps, pageTitle, panelClass } from "../styles/classes";

export function MemoryPage() {
	const { messages } = useI18n();

	return (
		<section className="grid gap-[18px]">
			<div className="grid gap-3">
				<p className={monoCaps}>
					<FiArchive className="mr-2 inline" />
					archived universes
				</p>
				<h1 className={pageTitle}>{messages.memory.title}</h1>
			</div>
			<div className="grid gap-[18px] min-[1101px]:grid-cols-2">
				{messages.memory.collections.map((collection) => (
					<article
						key={collection.name}
						className={`${panelClass} grid overflow-hidden`}
					>
						<div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--line)] bg-[rgba(4,8,11,0.74)]">
							<img
								src={collection.image}
								alt={collection.name}
								className="h-full w-full object-cover opacity-88"
								loading="lazy"
							/>
							<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,11,0.08),rgba(4,8,11,0.56)),radial-gradient(circle_at_20%_0%,rgba(99,230,244,0.16),transparent_38%)]" />
						</div>
						<div className="grid min-w-0 gap-5 p-5">
							<div className="grid min-w-0 gap-3">
								<div className="flex min-w-0 flex-wrap items-center gap-2">
									<p className="font-mono text-[0.68rem] tracking-normal text-[var(--cyan)] uppercase">
										{collection.label}
									</p>
									<span className="max-w-full border border-[rgba(168,255,154,0.28)] bg-[rgba(168,255,154,0.08)] px-2.5 py-1 font-mono text-[0.66rem] text-[var(--green)] uppercase">
										{collection.status}
									</span>
								</div>
								<h3 className="max-w-full text-[clamp(1.7rem,3vw,2.65rem)] leading-[0.98] tracking-normal break-words">
									{collection.name}
								</h3>
							</div>
							<p className="leading-[1.75] text-[var(--muted)]">
								{collection.summary}
							</p>
							<div className="flex flex-wrap gap-2">
								{collection.points.map((point) => (
									<span
										key={point}
										className="border border-[rgba(156,184,190,0.16)] bg-[rgba(255,255,255,0.025)] px-2.5 py-1 font-mono text-[0.68rem] text-[var(--muted)]"
									>
										{point}
									</span>
								))}
							</div>
						</div>
					</article>
				))}
			</div>
			<div className="grid gap-[18px] min-[921px]:grid-cols-[minmax(0,1fr)_minmax(280px,0.62fr)]">
				<Panel
					title={messages.memory.title}
					icon={FiClock}
					className="min-[921px]:col-span-2"
				>
					<div className="grid gap-3.5">
						{messages.memory.timeline.map((item) => (
							<article
								key={item.time}
								className="grid gap-[18px] border border-[rgba(156,184,190,0.16)] bg-[rgba(255,255,255,0.025)] p-4 min-[621px]:grid-cols-[84px_minmax(0,1fr)]"
							>
								<time className="font-mono text-[0.78rem] text-[var(--cyan)]">
									{item.time}
								</time>
								<div>
									<h3 className="mb-2 text-[1.28rem] leading-[1.15] tracking-normal">
										{item.title}
									</h3>
									<p className="leading-[1.75] text-[var(--muted)]">
										{item.body}
									</p>
								</div>
							</article>
						))}
					</div>
				</Panel>
				<Panel title={messages.memory.noteTitle} icon={FiTerminal}>
					<p className="leading-[1.75] text-[var(--muted)]">
						{messages.memory.note}
					</p>
				</Panel>
			</div>
		</section>
	);
}
