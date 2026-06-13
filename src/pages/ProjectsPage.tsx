import { FiArrowUpRight } from "react-icons/fi";
import { NavLink } from "react-router";
import { getProjects } from "../data/projects";
import { useI18n } from "../i18n/useI18n";
import { monoCaps, pageTitle } from "../styles/classes";
import type { Accent } from "../types/content";

const accentClass: Record<Accent, string> = {
	amber: "after:bg-[var(--amber)]",
	cyan: "after:bg-[var(--cyan)]",
	green: "after:bg-[var(--green)]",
	red: "after:bg-[var(--red)]",
};

const accentTextClass: Record<Accent, string> = {
	amber: "text-[var(--amber)]",
	cyan: "text-[var(--cyan)]",
	green: "text-[var(--green)]",
	red: "text-[var(--red)]",
};

export function ProjectsPage() {
	const { locale, messages } = useI18n();
	const projects = getProjects(locale);

	return (
		<section className="grid gap-7">
			<div className="grid gap-2">
				<p className={monoCaps}>{messages.projects.eyebrow}</p>
				<h2 className={pageTitle}>{messages.projects.title}</h2>
			</div>
			<div className="grid gap-4 min-[921px]:grid-cols-3">
				{projects.map((project) => (
					<NavLink
						className={`group relative grid min-h-[430px] overflow-hidden border border-[var(--line)] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),transparent_42%),var(--panel)] p-5 text-[var(--text)] shadow-[var(--shadow)] transition duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-1 hover:-translate-y-1 hover:border-[var(--line-hot)] ${accentClass[project.accent]}`}
						key={project.name}
						to={`/projects/${project.slug}`}
					>
						<div className="relative mb-5 aspect-[16/9] overflow-hidden border border-[rgba(156,184,190,0.16)] bg-[linear-gradient(135deg,rgba(99,230,244,0.1),transparent_38%),linear-gradient(45deg,rgba(255,255,255,0.03)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.03)_75%,transparent_75%)] bg-[size:auto,18px_18px]">
							{project.image ? (
								<>
									<img
										src={project.image}
										alt=""
										className="h-full w-full object-cover opacity-90"
										loading="lazy"
										aria-hidden="true"
									/>
									<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,11,0.04),rgba(4,8,11,0.36)),radial-gradient(circle_at_80%_8%,rgba(99,230,244,0.16),transparent_36%)]" />
								</>
							) : (
								<>
									<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,93,102,0.12),transparent_38%)]" />
									<div className="grid h-full place-items-center font-mono tracking-normal uppercase">
										<span className="grid gap-1 text-center">
											<strong className="text-[0.78rem] text-[var(--red)]">
												SIGNAL LOST
											</strong>
										</span>
									</div>
								</>
							)}
						</div>
						<div className="flex items-start justify-between gap-3">
							<span className="font-mono text-[0.68rem] tracking-normal text-[var(--faint)] uppercase">
								{project.type}
							</span>
							<strong
								className={`font-mono text-[0.68rem] tracking-normal uppercase ${accentTextClass[project.accent]}`}
							>
								{project.status}
							</strong>
						</div>
						<h3 className="self-end text-[clamp(1.6rem,3vw,2.55rem)] leading-[1.15] tracking-normal">
							{project.name}
						</h3>
						<p className="leading-[1.7] text-[var(--muted)]">
							{project.summary}
						</p>
						<div className="mb-12 flex flex-wrap gap-2">
							{project.tags.map((tag) => (
								<span
									key={tag}
									className="border border-[rgba(156,184,190,0.16)] bg-[rgba(255,255,255,0.025)] px-2.5 py-1 font-mono text-[0.68rem] text-[var(--muted)]"
								>
									{tag}
								</span>
							))}
						</div>
						<span className="absolute right-4 bottom-4 grid size-[42px] place-items-center border border-[var(--line)] bg-[rgba(255,255,255,0.03)] text-[var(--text)] transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-[var(--line-hot)]">
							<FiArrowUpRight />
						</span>
					</NavLink>
				))}
			</div>
		</section>
	);
}
