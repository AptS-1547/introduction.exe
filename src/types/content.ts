import type { IconType } from "react-icons";

export type Accent = "cyan" | "green" | "red";
export type NavMessageKey =
	| "init"
	| "profile"
	| "projects"
	| "memory"
	| "contact";

export type NavItem = {
	to: string;
	messageKey: NavMessageKey;
	icon: IconType;
	index: string;
	shortLabel: string;
};

export type StatItem = {
	label: string;
	value: string;
	icon: IconType;
};

export type ProjectItem = {
	name: string;
	type: string;
	status: string;
	accent: Accent;
	summary: string;
};

export type TimelineItem = {
	time: string;
	title: string;
	body: string;
};

export type ContactLink = {
	label: string;
	href: string;
	icon: IconType;
};
