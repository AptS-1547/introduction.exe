import type { ReactNode } from "react";
import type { IconType } from "react-icons";

type PanelProps = {
	title: string;
	icon: IconType;
	className?: string;
	children: ReactNode;
};

export function Panel({
	title,
	icon: Icon,
	className = "",
	children,
}: PanelProps) {
	return (
		<article
			className={`border border-[var(--line)] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),transparent_42%),var(--panel)] p-[22px] shadow-[var(--shadow)] ${className}`}
		>
			<div className="mb-6 flex items-center gap-2.5 font-mono text-[0.75rem] tracking-normal text-[var(--cyan)]">
				<Icon />
				<span>{title}</span>
			</div>
			{children}
		</article>
	);
}
