import { CommandPanel } from "../components/home/CommandPanel";
import { CurrentSignal } from "../components/home/CurrentSignal";
import { IdentityCore } from "../components/home/IdentityCore";
import { ModuleLauncher } from "../components/home/ModuleLauncher";
import { TraceLog } from "../components/home/TraceLog";
import { useI18n } from "../i18n/useI18n";

export function HomePage() {
	const { messages } = useI18n();

	return (
		<section className="grid gap-[18px]">
			<div className="grid gap-[18px] min-[1180px]:grid-cols-[minmax(0,0.82fr)_minmax(430px,1.18fr)]">
				<div className="order-3 mx-auto grid w-full max-w-[840px] gap-[18px] min-[1180px]:order-1 min-[1180px]:max-w-none">
					<CommandPanel messages={messages} />
					<ModuleLauncher messages={messages} />
				</div>
				<div className="order-1 min-[1180px]:order-2">
					<IdentityCore />
				</div>
				<div className="order-2 min-[921px]:hidden">
					<CurrentSignal messages={messages} />
				</div>
			</div>
			<div className="grid gap-[18px] min-[921px]:grid-cols-[minmax(0,1fr)_minmax(320px,0.58fr)]">
				<div className="hidden min-[921px]:block">
					<CurrentSignal messages={messages} />
				</div>
				<TraceLog messages={messages} />
			</div>
		</section>
	);
}
