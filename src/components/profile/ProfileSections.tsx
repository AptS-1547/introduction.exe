import { FiLayers, FiUserCheck, FiZap } from "react-icons/fi";
import type { MessageCatalog } from "../../i18n/messages";
import { panelClass } from "../../styles/classes";

type ProfileSectionsProps = {
	profile: MessageCatalog["profile"];
};

export function ProfileCapabilityMap({ profile }: ProfileSectionsProps) {
	return (
		<section className={`${panelClass} p-5`}>
			<p className="mb-5 flex items-center gap-2 font-mono text-[0.75rem] tracking-normal text-[var(--cyan)] uppercase">
				<FiLayers />
				{profile.capabilityTitle}
			</p>
			<div className="grid gap-4 min-[921px]:grid-cols-2">
				{profile.capabilities.map((item) => (
					<div
						key={item.label}
						className="grid gap-3 border border-[rgba(156,184,190,0.15)] bg-[rgba(255,255,255,0.024)] p-4"
					>
						<div className="flex justify-between gap-4">
							<span className="font-mono text-[0.78rem] text-[var(--muted)]">
								{item.label}
							</span>
							<strong className="font-mono text-[0.78rem] text-[var(--cyan)]">
								{item.value}%
							</strong>
						</div>
						<div className="relative h-2 overflow-hidden border border-[rgba(156,184,190,0.18)] bg-[rgba(255,255,255,0.035)]">
							<i
								className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,var(--cyan),var(--green))] shadow-[0_0_20px_rgba(99,230,244,0.35)]"
								style={{ width: `${item.value}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export function ProfileTraceLog({ profile }: ProfileSectionsProps) {
	return (
		<section className="grid gap-[18px] min-[921px]:grid-cols-[minmax(0,0.58fr)_minmax(0,1fr)]">
			<div className={`${panelClass} p-5`}>
				<p className="mb-5 flex items-center gap-2 font-mono text-[0.75rem] tracking-normal text-[var(--cyan)] uppercase">
					<FiZap />
					{profile.biasTitle}
				</p>
				<div className="grid gap-2.5">
					{profile.bias.map((item, index) => (
						<div
							key={item}
							className="flex min-h-[58px] items-center gap-3.5 border border-[rgba(156,184,190,0.16)] bg-[rgba(255,255,255,0.025)] px-3.5"
						>
							<span className="font-mono text-[0.75rem] text-[var(--red)]">
								0{index + 1}
							</span>
							<strong className="leading-[1.35]">{item}</strong>
						</div>
					))}
				</div>
			</div>
			<div className={`${panelClass} p-5`}>
				<p className="mb-5 flex items-center gap-2 font-mono text-[0.75rem] tracking-normal text-[var(--cyan)] uppercase">
					<FiUserCheck />
					{profile.traitsTitle}
				</p>
				<div className="grid gap-3">
					{profile.traits.map((trait) => (
						<p
							key={trait}
							className="border border-[rgba(156,184,190,0.16)] bg-[rgba(255,255,255,0.025)] p-4 leading-[1.75] text-[var(--muted)]"
						>
							{trait}
						</p>
					))}
				</div>
			</div>
		</section>
	);
}
