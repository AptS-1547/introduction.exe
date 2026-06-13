import { FiArrowLeft, FiBox, FiGithub, FiRadio } from "react-icons/fi";
import { NavLink, useParams } from "react-router";
import { getProjectBySlug } from "../data/projects";
import { useI18n } from "../i18n/useI18n";
import { monoCaps, panelClass } from "../styles/classes";
import type { Accent } from "../types/content";
import { NotFoundPage } from "./NotFoundPage";

const statusBadgeClass: Record<Accent, string> = {
	amber:
		"border-[rgba(244,201,107,0.3)] bg-[rgba(244,201,107,0.08)] text-[var(--amber)]",
	cyan: "border-[rgba(99,230,244,0.28)] bg-[rgba(99,230,244,0.08)] text-[var(--cyan)]",
	green:
		"border-[rgba(168,255,154,0.28)] bg-[rgba(168,255,154,0.08)] text-[var(--green)]",
	red: "border-[rgba(255,93,102,0.28)] bg-[rgba(255,93,102,0.08)] text-[var(--red)]",
};

const detailTitleClass =
	"text-[clamp(2rem,4.8vw,4.2rem)] leading-[1.05] font-bold tracking-normal [overflow-wrap:anywhere]";

export function ProjectDetailPage() {
	const { slug } = useParams();
	const { locale } = useI18n();
	const project = getProjectBySlug(locale, slug);

	if (!project) {
		return <NotFoundPage variant="project" />;
	}

	return (
		<section className="grid gap-[18px]">
			<NavLink
				to="/projects"
				className="inline-flex w-fit items-center gap-2 font-mono text-[0.72rem] tracking-normal text-[var(--muted)] uppercase transition hover:text-[var(--cyan)]"
			>
				<FiArrowLeft />
				/projects
			</NavLink>
			<section className={`${panelClass} overflow-hidden`}>
				<div className="grid min-[1080px]:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.62fr)]">
					<div className="relative min-h-[360px] overflow-hidden border-b border-[var(--line)] bg-[rgba(4,8,11,0.74)] min-[1080px]:border-r min-[1080px]:border-b-0">
						{project.image ? (
							<img
								src={project.image}
								alt={project.name}
								className="h-full min-h-[360px] w-full object-cover opacity-90"
							/>
						) : (
							<div className="grid h-full min-h-[360px] place-items-center font-mono text-[0.78rem] text-[var(--red)] uppercase">
								SIGNAL LOST
							</div>
						)}
						<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,11,0.06),rgba(4,8,11,0.72)),radial-gradient(circle_at_78%_8%,rgba(99,230,244,0.14),transparent_32%)]" />
					</div>
					<div className="grid min-w-0 content-between gap-8 p-5 min-[621px]:p-7">
						<div className="min-w-0">
							<p className={monoCaps}>
								<FiBox className="mr-2 inline" />
								{project.type}
							</p>
							<h1 className={`${detailTitleClass} mt-5`}>{project.name}</h1>
							<div className="mt-4 flex flex-wrap gap-2">
								<span
									className={`border px-2.5 py-1 font-mono text-[0.66rem] uppercase ${statusBadgeClass[project.accent]}`}
								>
									{project.status}
								</span>
								<span className="border border-[rgba(99,230,244,0.24)] bg-[rgba(99,230,244,0.08)] px-2.5 py-1 font-mono text-[0.66rem] text-[var(--cyan)] uppercase">
									{project.slug}
								</span>
							</div>
						</div>
						<p className="border-l border-[var(--line-hot)] pl-4 text-[clamp(1.05rem,1.6vw,1.32rem)] leading-[1.75] text-[var(--text)]">
							{project.longSummary}
						</p>
						<div className="flex flex-wrap gap-2">
							{project.tags.map((tag) => (
								<span
									key={tag}
									className="border border-[rgba(156,184,190,0.16)] bg-[rgba(255,255,255,0.025)] px-2.5 py-1 font-mono text-[0.68rem] text-[var(--muted)]"
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</div>
			</section>
			<section className="grid gap-[18px] min-[921px]:grid-cols-[minmax(0,1fr)_minmax(280px,0.46fr)]">
				<div className={`${panelClass} p-5`}>
					<p className="mb-5 flex items-center gap-2 font-mono text-[0.75rem] tracking-normal text-[var(--cyan)] uppercase">
						<FiRadio />
						Feature Signals
					</p>
					<div className="grid gap-3">
						{project.highlights.map((highlight, index) => (
							<div
								key={highlight}
								className="grid min-h-[62px] grid-cols-[42px_minmax(0,1fr)] items-center gap-3 border border-[rgba(156,184,190,0.15)] bg-[rgba(255,255,255,0.024)] p-3.5"
							>
								<span className="font-mono text-[0.7rem] text-[var(--faint)]">
									0{index + 1}
								</span>
								<strong className="leading-[1.45]">{highlight}</strong>
							</div>
						))}
					</div>
				</div>
				<div className={`${panelClass} grid content-between gap-5 p-5`}>
					<div>
						<p className="font-mono text-[0.75rem] tracking-normal text-[var(--cyan)] uppercase">
							Archive Link
						</p>
						<dl className="mt-4 grid gap-2.5">
							<div className="border border-[rgba(156,184,190,0.15)] bg-[rgba(255,255,255,0.024)] p-3">
								<dt className="font-mono text-[0.62rem] text-[var(--faint)] uppercase">
									language
								</dt>
								<dd className="mt-2 text-[var(--text)]">{project.language}</dd>
							</div>
							<div className="border border-[rgba(156,184,190,0.15)] bg-[rgba(255,255,255,0.024)] p-3">
								<dt className="font-mono text-[0.62rem] text-[var(--faint)] uppercase">
									license
								</dt>
								<dd className="mt-2 text-[var(--text)]">{project.license}</dd>
							</div>
							{project.performance.map((item) => (
								<div
									key={item.name}
									className="border border-[rgba(156,184,190,0.15)] bg-[rgba(255,255,255,0.024)] p-3"
								>
									<dt className="font-mono text-[0.62rem] text-[var(--faint)] uppercase">
										{item.name}
									</dt>
									<dd className="mt-2 text-[var(--text)]">{item.value}</dd>
								</div>
							))}
						</dl>
					</div>
					<a
						href={project.githubUrl}
						target="_blank"
						rel="noreferrer"
						className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-[var(--line)] bg-[rgba(255,255,255,0.03)] px-4 font-mono text-[0.75rem] text-[var(--muted)] uppercase transition hover:border-[var(--line-hot)] hover:text-[var(--text)]"
					>
						repository
						<FiGithub />
					</a>
				</div>
			</section>
			{project.techStack.length > 0 ? (
				<section className={`${panelClass} p-5`}>
					<p className="mb-5 flex items-center gap-2 font-mono text-[0.75rem] tracking-normal text-[var(--cyan)] uppercase">
						<FiBox />
						Tech Stack
					</p>
					<div className="grid gap-4 min-[921px]:grid-cols-3">
						{project.techStack.map((section) => (
							<div
								key={section.name}
								className="border border-[rgba(156,184,190,0.15)] bg-[rgba(255,255,255,0.024)] p-4"
							>
								<h2 className="font-mono text-[0.78rem] text-[var(--cyan)] uppercase">
									{section.name}
								</h2>
								<div className="mt-4 grid gap-3">
									{section.items.map((item) => (
										<div key={item.name}>
											<strong className="block leading-[1.35] text-[var(--text)]">
												{item.name}
											</strong>
											<p className="mt-1 text-sm leading-[1.55] text-[var(--muted)]">
												{item.purpose}
											</p>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</section>
			) : null}
		</section>
	);
}
