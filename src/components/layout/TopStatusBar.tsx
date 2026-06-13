import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { FiRotateCcw } from "react-icons/fi";
import { useLocation } from "react-router";
import { useI18n } from "../../i18n/useI18n";
import { navItems } from "../../routes/nav";
import { glassButton, glassOverlay } from "../../styles/classes";

type TopStatusBarProps = {
	onRestartBoot: () => void;
};

export function TopStatusBar({ onRestartBoot }: TopStatusBarProps) {
	const location = useLocation();
	const { messages, toggleLocale } = useI18n();
	const reduceMotion = useReducedMotion();
	const currentItem =
		navItems.find(
			(item) =>
				item.to === location.pathname ||
				(item.to !== "/" && location.pathname.startsWith(`${item.to}/`)),
		) ?? navItems[0];
	const statusKey = location.pathname;

	return (
		<header
			className={`fixed top-4 right-[max(1rem,calc((100vw-1440px)/2+1rem))] left-[max(1rem,calc((100vw-1440px)/2+1rem))] z-20 flex min-h-[56px] items-center justify-between gap-3 px-4 py-3 max-[620px]:top-2.5 max-[620px]:right-2.5 max-[620px]:left-2.5 max-[620px]:px-3 min-[921px]:left-[max(280px,calc((100vw-1440px)/2+280px))] ${glassOverlay}`}
		>
			<div className="grid min-w-0 overflow-hidden">
				<AnimatePresence initial={false}>
					<m.div
						key={`desktop:${statusKey}`}
						className="col-start-1 row-start-1 hidden min-w-0 items-center gap-2 font-mono text-[0.68rem] tracking-normal text-[var(--faint)] uppercase min-[921px]:flex"
						initial={
							reduceMotion
								? { opacity: 1 }
								: { opacity: 0, filter: "blur(5px)" }
						}
						animate={{ opacity: 1, filter: "blur(0px)" }}
						exit={
							reduceMotion
								? { opacity: 1 }
								: { opacity: 0, filter: "blur(5px)" }
						}
						transition={{ duration: reduceMotion ? 0 : 0.2 }}
					>
						<span className="shrink-0">/path: {location.pathname}</span>
						<span className="shrink-0 text-[var(--line-hot)]">::</span>
						<span className="min-w-0 truncate">
							{messages.navDescriptions[currentItem.messageKey]}
						</span>
					</m.div>
				</AnimatePresence>
				<div className="flex items-center gap-3 min-[921px]:hidden">
					<span className="grid size-9 shrink-0 place-items-center overflow-hidden bg-[rgba(99,230,244,0.06)] shadow-[0_0_28px_rgba(99,230,244,0.16)]">
						<img
							src="/images/general/logo.webp"
							alt=""
							width="96"
							height="96"
							className="h-full w-full object-cover"
							aria-hidden="true"
						/>
					</span>
					<span className="grid min-w-0">
						<AnimatePresence initial={false}>
							<m.span
								key={`mobile:${statusKey}`}
								className="col-start-1 row-start-1 min-w-0"
								initial={
									reduceMotion
										? { opacity: 1 }
										: { opacity: 0, filter: "blur(5px)" }
								}
								animate={{ opacity: 1, filter: "blur(0px)" }}
								exit={
									reduceMotion
										? { opacity: 1 }
										: { opacity: 0, filter: "blur(5px)" }
								}
								transition={{ duration: reduceMotion ? 0 : 0.2 }}
							>
								<strong className="block truncate font-mono text-[0.88rem] tracking-normal">
									{messages.brand.name}
								</strong>
								<small className="block truncate font-mono text-[0.62rem] tracking-normal text-[var(--faint)] uppercase">
									{messages.nav[currentItem.messageKey]}
								</small>
							</m.span>
						</AnimatePresence>
					</span>
				</div>
			</div>
			<div className="flex shrink-0 items-center gap-2">
				<button
					className={`grid min-h-10 min-w-10 place-items-center px-3 font-mono text-[0.72rem] tracking-normal text-[var(--muted)] ${glassButton}`}
					type="button"
					onClick={onRestartBoot}
					aria-label={messages.actions.restartBoot}
					title={messages.actions.restartBoot}
				>
					<FiRotateCcw />
				</button>
				<button
					className={`grid min-h-10 min-w-10 place-items-center px-3 font-mono text-[0.72rem] tracking-normal text-[var(--muted)] ${glassButton}`}
					type="button"
					onClick={toggleLocale}
				>
					{messages.actions.language}
				</button>
			</div>
		</header>
	);
}
