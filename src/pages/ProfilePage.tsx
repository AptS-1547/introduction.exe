import { ProfileHero } from "../components/profile/ProfileHero";
import {
	ProfileCapabilityMap,
	ProfileTraceLog,
} from "../components/profile/ProfileSections";
import { useI18n } from "../i18n/useI18n";

export function ProfilePage() {
	const { messages } = useI18n();
	const { profile } = messages;

	return (
		<section className="grid gap-[18px]">
			<ProfileHero profile={profile} />
			<ProfileCapabilityMap profile={profile} />
			<ProfileTraceLog profile={profile} />
		</section>
	);
}
