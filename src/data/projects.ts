import type { Accent } from "../types/content";
import enProjects from "./projects.en-US";
import zhProjects from "./projects.zh-CN";

export type ProjectLocale = "zh-CN" | "en-US";

export type ProjectTechStackSection = {
	name: string;
	items: Array<{
		name: string;
		purpose: string;
	}>;
};

export type ProjectPerformanceItem = {
	name: string;
	value: string;
};

type ProjectMetadataShape = {
	slug: string;
	githubUrl: string;
	language: string;
	status:
		| "active"
		| "low-maintenance"
		| "in-development"
		| "planned"
		| "archived";
	license: string;
	stars: number;
	tags: readonly string[];
	image?: string;
};

const projectMetadata = [
	{
		slug: "dns-orchestrator",
		githubUrl: "https://github.com/AptS-1547/dns-orchestrator",
		language: "TypeScript",
		status: "low-maintenance",
		license: "MIT",
		stars: 12,
		tags: [
			"Tauri",
			"React",
			"Rust",
			"TypeScript",
			"DNS",
			"Desktop App",
			"Cross-Platform",
		],
		image: "/images/projects/dns-orchestrator.webp",
	},
	{
		slug: "gcop-rs",
		githubUrl: "https://github.com/AptS-1547/gcop-rs",
		language: "Rust",
		status: "active",
		license: "MIT",
		stars: 16,
		tags: ["Rust", "Git", "AI", "CLI", "Code Review", "LLM"],
		image: "/images/projects/gcop-rs.webp",
	},
	{
		slug: "shortlinker",
		githubUrl: "https://github.com/AptS-1547/shortlinker",
		language: "Rust",
		status: "active",
		license: "MIT",
		stars: 22,
		tags: ["Rust", "Actix-web", "SQLite", "Docker", "High-Performance"],
		image: "/images/projects/shortlinker.webp",
	},
	{
		slug: "aster-drive",
		githubUrl: "https://github.com/AptS-1547/AsterDrive",
		language: "Rust",
		status: "active",
		license: "MIT",
		stars: 27,
		tags: [
			"Rust",
			"React",
			"Self-Hosted",
			"Cloud Storage",
			"WebDAV",
			"S3",
			"SQLite",
		],
		image: "/images/projects/aster-drive.webp",
	},
	{
		slug: "ferrus-gate",
		githubUrl: "https://github.com/FerrusGate/FerrusGate",
		language: "Rust",
		status: "planned",
		license: "MIT",
		stars: 3,
		tags: ["Rust", "OAuth2", "OIDC", "SAML", "FIDO2", "Authentication"],
	},
	{
		slug: "nebulink",
		githubUrl: "https://github.com/AptS-1547/Nebulink",
		language: "Rust",
		status: "planned",
		license: "Apache-2.0",
		stars: 3,
		tags: ["Rust", "Actix-web", "CDN", "Distributed System", "Load Balancing"],
	},
	{
		slug: "sled-gui",
		githubUrl: "https://github.com/AptS-1547/sled-gui",
		language: "Rust",
		status: "planned",
		license: "MIT",
		stars: 4,
		tags: ["Tauri", "Rust", "Vue.js", "TypeScript", "Sled", "Desktop App"],
	},
	{
		slug: "onebot-github-webhook",
		githubUrl: "https://github.com/AptS-1547/onebot-github-webhook",
		language: "Python",
		status: "active",
		license: "Apache-2.0",
		stars: 7,
		tags: ["Python", "FastAPI", "OneBot", "GitHub API", "WebSocket", "Docker"],
		image: "/images/projects/onebot-github-webhook.webp",
	},
	{
		slug: "vue-portfolio",
		githubUrl: "https://github.com/AptS-1547/VUE-About-Me",
		language: "TypeScript",
		status: "archived",
		license: "MIT",
		stars: 4,
		tags: ["Vue.js", "TypeScript", "Tailwind CSS", "Responsive", "Portfolio"],
		image: "/images/projects/vue-portfolio.webp",
	},
	{
		slug: "wakatime-readme-updater",
		githubUrl: "https://github.com/AptS-1547/wakatime-readme-updater",
		language: "Rust",
		status: "active",
		license: "MIT",
		stars: 2,
		tags: ["Rust", "WakaTime", "GitHub Actions", "Docker", "Automation"],
		image: "/images/projects/wakatime-readme-updater.webp",
	},
	{
		slug: "nginx-modsecurity",
		githubUrl: "https://github.com/AptS-1547/nginx-modsecurity",
		language: "Dockerfile",
		status: "active",
		license: "MIT",
		stars: 10,
		tags: ["Docker", "Nginx", "ModSecurity", "WAF", "Security", "Alpine"],
		image: "/images/projects/nginx-modsecurity.webp",
	},
	{
		slug: "acme-docker-reloader",
		githubUrl: "https://github.com/AptS-1547/acme-docker-reloader",
		language: "Shell",
		status: "active",
		license: "MIT",
		stars: 6,
		tags: ["Shell", "Docker", "acme.sh", "SSL", "Automation", "systemd"],
		image: "/images/projects/acme-docker-reloader.webp",
	},
	{
		slug: "aster-pulse",
		githubUrl: "https://github.com/AptS-1547/AsterPulse",
		language: "Rust",
		status: "planned",
		license: "Apache-2.0",
		stars: 3,
		tags: ["Rust", "Distributed System", "Monitoring", "Uptime", "Network"],
	},
	{
		slug: "introduction-exe",
		githubUrl: "https://github.com/AptS-1547/introduction.exe",
		language: "TypeScript",
		status: "active",
		license: "MIT",
		stars: 1,
		tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "i18n", "Portfolio"],
		image: "/images/projects/introduction-exe.webp",
	},
] as const satisfies readonly ProjectMetadataShape[];

export type ProjectSlug = (typeof projectMetadata)[number]["slug"];
export type ProjectStatus =
	| "active"
	| "low-maintenance"
	| "in-development"
	| "planned"
	| "archived";
type ProjectMetadata = (typeof projectMetadata)[number];

export type ProjectCopy = {
	title: string;
	description: string;
	longDescription: string;
	features: string[];
	techStack?: ProjectTechStackSection[];
	performance?: ProjectPerformanceItem[];
};

export type ProjectCopyCatalog = {
	statusLabels: Record<ProjectStatus, string>;
	projects: Record<ProjectSlug, ProjectCopy>;
};

export type LocalizedProject = {
	name: string;
	slug: ProjectSlug;
	image?: string;
	type: string;
	status: string;
	statusKey: ProjectStatus;
	accent: Accent;
	summary: string;
	longSummary: string;
	highlights: string[];
	tags: readonly string[];
	githubUrl: string;
	language: string;
	license: string;
	stars: number;
	techStack: ProjectTechStackSection[];
	performance: ProjectPerformanceItem[];
};

const projectCatalogs: Record<ProjectLocale, ProjectCopyCatalog> = {
	"en-US": enProjects,
	"zh-CN": zhProjects,
};

function getAccent(project: ProjectMetadata): Accent {
	if (project.status === "archived") {
		return "red";
	}

	if (project.status === "planned") {
		return "amber";
	}

	if (project.language === "Rust" || project.status === "active") {
		return "green";
	}

	return "cyan";
}

function localizeProject(
	project: ProjectMetadata,
	copy: ProjectCopy,
	statusLabels: Record<ProjectStatus, string>,
): LocalizedProject {
	return {
		name: copy.title,
		slug: project.slug,
		image: "image" in project ? project.image : undefined,
		type: project.language,
		status: statusLabels[project.status],
		statusKey: project.status,
		accent: getAccent(project),
		summary: copy.description,
		longSummary: copy.longDescription,
		highlights: copy.features,
		tags: project.tags,
		githubUrl: project.githubUrl,
		language: project.language,
		license: project.license,
		stars: project.stars,
		techStack: copy.techStack ?? [],
		performance: copy.performance ?? [],
	};
}

export function getProjects(locale: ProjectLocale): LocalizedProject[] {
	const catalog = projectCatalogs[locale];

	return projectMetadata
		.map((project, index) => ({ project, index }))
		.sort((left, right) => {
			const starDiff = right.project.stars - left.project.stars;

			if (starDiff !== 0) {
				return starDiff;
			}

			return left.index - right.index;
		})
		.map(({ project }) =>
			localizeProject(
				project,
				catalog.projects[project.slug],
				catalog.statusLabels,
			),
		);
}

export function getProjectBySlug(
	locale: ProjectLocale,
	slug: string | undefined,
) {
	return getProjects(locale).find((project) => project.slug === slug);
}
