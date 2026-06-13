import { FiArrowLeft, FiCpu, FiFolder, FiHome, FiRadio } from "react-icons/fi";
import { NavLink, useLocation } from "react-router";
import { useI18n } from "../i18n/useI18n";
import {
	actionPrimary,
	actionSecondary,
	monoCaps,
	panelClass,
} from "../styles/classes";

type NotFoundPageProps = {
	variant?: "route" | "project";
};

function hashPath(pathname: string) {
	let hash = 2166136261;

	for (const character of pathname) {
		hash ^= character.codePointAt(0) ?? 0;
		hash = Math.imul(hash, 16777619);
	}

	return hash >>> 0;
}

function getDiagnosticCells(pathname: string) {
	const hash = hashPath(pathname);

	return Array.from({ length: 32 }, (_, index) => {
		const mixed =
			(hash ^ Math.imul(index + 1, 2654435761) ^ (hash >>> (index % 13))) >>> 0;

		return {
			id: `diagnostic-cell-${index}`,
			isHot: mixed % 5 === 0 || mixed % 11 === 0,
		};
	});
}

export function NotFoundPage({ variant = "route" }: NotFoundPageProps) {
	const { messages } = useI18n();
	const { pathname } = useLocation();
	const isProject = variant === "project";
	const diagnosticCells = getDiagnosticCells(pathname);

	return (
		<section className="grid min-h-[min(620px,calc(100vh-220px))] content-center gap-[18px]">
			<div
				className={`${panelClass} relative overflow-hidden p-5 min-[621px]:p-8`}
			>
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,93,102,0.14),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(99,230,244,0.14),transparent_24%)]" />
				<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--red),var(--cyan),transparent)]" />
				<div className="relative grid gap-8 min-[921px]:grid-cols-[minmax(0,0.82fr)_minmax(260px,0.46fr)] min-[921px]:items-end">
					<div className="grid gap-5">
						<p className={monoCaps}>
							<FiRadio className="mr-2 inline" />
							{messages.notFound.eyebrow}
						</p>
						<div className="grid gap-4">
							<h1 className="text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.9] font-black tracking-normal text-[var(--text)] [overflow-wrap:anywhere]">
								{isProject
									? messages.notFound.projectTitle
									: messages.notFound.title}
							</h1>
							<p className="max-w-[760px] border-l border-[var(--line-hot)] pl-4 text-[clamp(1rem,1.45vw,1.25rem)] leading-[1.8] text-[var(--muted)]">
								{isProject
									? messages.notFound.projectBody
									: messages.notFound.body}
							</p>
						</div>
						<div className="flex flex-wrap gap-3">
							<NavLink to="/" className={actionPrimary}>
								<FiHome />
								{messages.notFound.homeAction}
							</NavLink>
							<NavLink to="/projects" className={actionSecondary}>
								{isProject ? <FiArrowLeft /> : <FiFolder />}
								{isProject
									? messages.notFound.projectAction
									: messages.notFound.projectsAction}
							</NavLink>
						</div>
					</div>
					<aside className="grid gap-3 border border-[rgba(156,184,190,0.16)] bg-[rgba(255,255,255,0.026)] p-4 font-mono">
						<div className="flex items-center justify-between gap-3 text-[0.72rem] text-[var(--cyan)] uppercase">
							<span className="inline-flex items-center gap-2">
								<FiCpu />
								diagnostic
							</span>
							<span>0x194</span>
						</div>
						<div className="grid gap-2 border-t border-[rgba(156,184,190,0.14)] pt-4">
							<span className="text-[0.64rem] text-[var(--faint)] uppercase">
								{messages.notFound.pathLabel}
							</span>
							<code className="text-[0.82rem] leading-[1.6] text-[var(--red)] [overflow-wrap:anywhere]">
								{pathname}
							</code>
						</div>
						<div className="grid grid-cols-8 gap-1 pt-1" aria-hidden="true">
							{diagnosticCells.map((cell) => (
								<span
									key={cell.id}
									data-active={cell.isHot}
									className={`h-2 border border-[rgba(156,184,190,0.14)] ${
										cell.isHot
											? "bg-[rgba(255,93,102,0.72)]"
											: "bg-[rgba(99,230,244,0.14)]"
									}`}
								/>
							))}
						</div>
					</aside>
				</div>
			</div>
		</section>
	);
}
