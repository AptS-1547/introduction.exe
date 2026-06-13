import { FiActivity, FiCpu, FiUser } from "react-icons/fi";
import type { MessageCatalog } from "../../i18n/messages";
import { monoCaps, pageTitle, panelClass } from "../../styles/classes";

type ProfileHeroProps = {
	profile: MessageCatalog["profile"];
};

export function ProfileHero({ profile }: ProfileHeroProps) {
	return (
		<section
			className={`${panelClass} relative overflow-hidden p-5 min-[921px]:grid min-[921px]:min-h-[560px] min-[921px]:grid-cols-[minmax(260px,0.72fr)_minmax(0,1fr)] min-[921px]:items-stretch`}
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,93,102,0.12),transparent_28%),radial-gradient(circle_at_76%_12%,rgba(99,230,244,0.12),transparent_32%)]" />
			<div className="relative grid min-h-[360px] place-items-center overflow-hidden border border-[rgba(156,184,190,0.16)] bg-[rgba(4,8,11,0.32)] max-[920px]:mb-5">
				<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_48%,rgba(99,230,244,0.06)_50%,transparent_52%)] bg-[size:100%_9px] opacity-60" />
				<div className="pointer-events-none absolute aspect-square w-[78%] rounded-full border border-[rgba(99,230,244,0.2)]" />
				<div className="pointer-events-none absolute aspect-square w-[56%] rounded-full border border-[rgba(255,93,102,0.22)]" />
				<div className="relative grid aspect-square w-[min(78%,360px)] place-items-center overflow-hidden">
					<img
						src="/images/general/avatar.webp"
						alt=""
						width="512"
						height="512"
						className="h-full w-full object-contain opacity-95"
						aria-hidden="true"
					/>
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_42%,rgba(4,8,11,0.58)_82%)]" />
				</div>
				<div className="absolute right-4 bottom-4 left-4 border border-white/10 bg-[rgba(4,8,11,0.46)] p-3 font-mono text-[0.68rem] tracking-normal text-[var(--muted)] backdrop-blur-xl">
					<span className="text-[var(--cyan)]">quote:// </span>
					{profile.quote}
				</div>
			</div>
			<div className="relative grid min-w-0 content-between gap-8 p-0 min-[921px]:pl-7">
				<div className="min-w-0">
					<p className={monoCaps}>
						<FiUser className="mr-2 inline" />
						{profile.eyebrow}
					</p>
					<h1 className={`${pageTitle} mt-5 break-words`}>{profile.handle}</h1>
					<p className="mt-4 max-w-[760px] text-[clamp(1rem,1.4vw,1.18rem)] leading-[1.7] text-[var(--muted)]">
						{profile.role}
					</p>
					<p className="mt-7 max-w-[780px] border-l border-[var(--line-hot)] pl-4 text-[clamp(1.15rem,2vw,1.55rem)] leading-[1.72] text-[var(--text)]">
						{profile.thesis}
					</p>
				</div>
				<div className="grid gap-2.5 min-[621px]:grid-cols-2">
					{profile.specs.map((spec, index) => (
						<div
							key={spec.label}
							className="grid min-h-[76px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 border border-[rgba(156,184,190,0.15)] bg-[rgba(255,255,255,0.026)] p-3"
						>
							<span className="font-mono text-[0.7rem] text-[var(--faint)]">
								0{index + 1}
							</span>
							<span className="min-w-0">
								<small className="block font-mono text-[0.64rem] tracking-normal text-[var(--faint)] uppercase">
									{spec.label}
								</small>
								<strong className="mt-1.5 block break-words text-[0.96rem] leading-[1.25] text-[var(--text)]">
									{spec.value}
								</strong>
							</span>
						</div>
					))}
				</div>
				<div className="grid gap-2 font-mono text-[0.68rem] tracking-normal text-[var(--faint)] uppercase min-[621px]:grid-cols-2">
					<span className="inline-flex items-center gap-2">
						<FiActivity className="text-[var(--green)]" />
						signal stable
					</span>
					<span className="inline-flex items-center gap-2 min-[621px]:justify-end">
						<FiCpu className="text-[var(--cyan)]" />
						ESAP-TY-0000
					</span>
				</div>
			</div>
		</section>
	);
}
