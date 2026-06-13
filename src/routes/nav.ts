import {
	FiDatabase,
	FiFolder,
	FiMail,
	FiTerminal,
	FiUser,
} from "react-icons/fi";
import type { NavItem } from "../types/content";

export const navItems: NavItem[] = [
	{
		to: "/",
		messageKey: "init",
		icon: FiTerminal,
		index: "01",
		shortLabel: "INIT",
	},
	{
		to: "/profile",
		messageKey: "profile",
		icon: FiUser,
		index: "02",
		shortLabel: "ID",
	},
	{
		to: "/projects",
		messageKey: "projects",
		icon: FiFolder,
		index: "03",
		shortLabel: "WORK",
	},
	{
		to: "/memory",
		messageKey: "memory",
		icon: FiDatabase,
		index: "04",
		shortLabel: "MEM",
	},
	{
		to: "/contact",
		messageKey: "contact",
		icon: FiMail,
		index: "05",
		shortLabel: "LINK",
	},
];
