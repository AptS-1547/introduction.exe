import { m, useReducedMotion } from "framer-motion";

export function IdentityCore() {
	const reduceMotion = useReducedMotion();

	return (
		<figure className="relative grid min-h-[620px] place-items-center overflow-hidden border border-[var(--line)] bg-[linear-gradient(135deg,rgba(255,255,255,0.065),transparent_34%),rgba(8,13,17,0.52)] shadow-[var(--shadow)] max-[920px]:min-h-[520px] max-[620px]:min-h-[420px]">
			<figcaption className="sr-only">Executable identity core</figcaption>
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_48%,rgba(99,230,244,0.08)_50%,transparent_52%)] bg-[size:100%_8px] opacity-[0.42] mix-blend-screen" />
			<div className="pointer-events-none absolute h-px w-[76%] animate-[scan_4.2s_linear_infinite] bg-[linear-gradient(90deg,transparent,var(--cyan),transparent)]" />
			<div className="absolute aspect-square w-[48%] animate-[spin_14s_linear_infinite] rounded-full border border-[rgba(99,230,244,0.24)]" />
			<div className="absolute aspect-square w-[68%] animate-[spin_20s_linear_infinite_reverse] rounded-full border border-[rgba(255,93,102,0.18)]" />
			<m.div
				className="relative z-[1] grid aspect-square w-[min(70%,430px)] place-items-center overflow-hidden bg-[radial-gradient(circle,rgba(99,230,244,0.16),rgba(4,8,11,0.86)_58%,rgba(255,93,102,0.08))] shadow-[0_0_70px_rgba(99,230,244,0.18)] max-[620px]:w-[min(78%,330px)]"
				animate={
					reduceMotion
						? { y: 0, rotate: 0 }
						: { y: [0, -8, 0], rotate: [0, 0.4, 0] }
				}
				transition={
					reduceMotion
						? { duration: 0 }
						: { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
				}
			>
				<span className="absolute inset-0 grid size-full place-items-center overflow-hidden bg-transparent">
					<img
						src="/images/general/avatar.webp"
						alt=""
						width="512"
						height="512"
						className="h-full w-full object-contain opacity-90"
						aria-hidden="true"
					/>
					<span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,transparent_34%,rgba(4,8,11,0.58)_72%)]" />
				</span>
				<div className="pointer-events-none absolute inset-[8%] bg-[linear-gradient(90deg,rgba(156,184,190,0.16)_1px,transparent_1px),linear-gradient(rgba(156,184,190,0.12)_1px,transparent_1px)] bg-[size:28px_28px] opacity-30" />
			</m.div>
			<div className="absolute top-[10%] left-[7%] z-[2] grid min-w-[128px] gap-1 border border-[var(--line)] bg-[rgba(4,8,11,0.7)] px-3.5 py-3 font-mono tracking-normal backdrop-blur-[14px]">
				<span className="text-[0.64rem] text-[var(--faint)]">SUBJECT</span>
				<strong className="text-base text-[var(--text)]">AptS:1547</strong>
			</div>
			<div className="absolute right-[7%] bottom-[10%] z-[2] grid min-w-[128px] gap-1 border border-[var(--line)] bg-[rgba(4,8,11,0.7)] px-3.5 py-3 font-mono tracking-normal backdrop-blur-[14px]">
				<span className="text-[0.64rem] text-[var(--faint)]">MODEL</span>
				<strong className="text-base text-[var(--text)]">ESAP-TY-0000</strong>
			</div>
		</figure>
	);
}
