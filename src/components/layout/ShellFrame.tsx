import type { ReactNode } from "react";
import { MobileTabBar } from "./MobileTabBar";
import { ModuleRail } from "./ModuleRail";
import { TopStatusBar } from "./TopStatusBar";

type ShellFrameProps = {
	children: ReactNode;
	onRestartBoot: () => void;
};

export function ShellFrame({ children, onRestartBoot }: ShellFrameProps) {
	return (
		<div className="mx-auto min-h-screen w-[min(1440px,100%)] p-4 max-[620px]:p-2.5">
			<ModuleRail />
			<div className="grid min-w-0 min-[1080px]:ml-[264px]">
				<TopStatusBar onRestartBoot={onRestartBoot} />
				<main className="min-h-[calc(100vh-124px)] pt-[76px] pb-6 max-[1079px]:min-h-[calc(100vh-156px)] max-[1079px]:pt-[72px] max-[1079px]:pb-24 max-[620px]:pt-[68px]">
					<div className="relative">{children}</div>
				</main>
			</div>
			<MobileTabBar />
		</div>
	);
}
