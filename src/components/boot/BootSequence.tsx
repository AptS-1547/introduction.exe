import { m, useReducedMotion } from "framer-motion";
import { FiTerminal } from "react-icons/fi";
import { useI18n } from "../../i18n/useI18n";

export function BootSequence() {
	const { messages } = useI18n();
	const reduceMotion = useReducedMotion();

	return (
		<m.div
			className="fixed inset-0 z-50 grid bg-black text-[var(--text)]"
			initial={{ opacity: 1 }}
			exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)" }}
			transition={
				reduceMotion
					? { duration: 0 }
					: { duration: 0.82, ease: [0.22, 1, 0.36, 1] }
			}
		>
			<div className="relative mx-auto grid w-[min(980px,calc(100%_-_28px))] content-center py-8">
				<div className="grid max-h-[58vh] gap-1 overflow-hidden font-mono text-[0.78rem] tracking-normal">
					<p className="mb-2 text-[var(--faint)]">
						<FiTerminal className="mr-2 inline text-[var(--cyan)]" />
						{messages.boot.subtitle}
					</p>
					<div className="grid gap-1">
						{messages.boot.lines.map((line, index) => (
							<m.p
								key={line}
								className="grid grid-cols-[70px_minmax(0,1fr)] gap-3 text-[var(--muted)]"
								initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 9 }}
								animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
								transition={
									reduceMotion
										? { duration: 0 }
										: { delay: index * 0.075, duration: 0.14 }
								}
							>
								<span className="text-[var(--green)]">[ OK ]</span>
								<span>
									{line}
									<span className="text-[var(--faint)]">
										{" "}
										#{String(index + 1).padStart(2, "0")}
									</span>
								</span>
							</m.p>
						))}
					</div>
				</div>
				<m.div
					className="mt-8 border border-[rgba(99,230,244,0.38)] bg-[rgba(99,230,244,0.06)] p-5 font-mono shadow-[0_0_70px_rgba(99,230,244,0.12)]"
					initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
					animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
					transition={
						reduceMotion
							? { duration: 0 }
							: { delay: 1.84, duration: 0.34, ease: [0.22, 1, 0.36, 1] }
					}
				>
					<p className="mb-2 text-[0.72rem] tracking-normal text-[var(--cyan)] uppercase">
						{messages.boot.accessGranted}
					</p>
					<h1 className="text-[clamp(2.4rem,8vw,5.7rem)] leading-none font-bold tracking-normal">
						{messages.boot.title}
					</h1>
				</m.div>
			</div>
		</m.div>
	);
}
