import { useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { getProjectBySlug } from "../data/projects";
import type { Locale } from "../i18n/messages";
import { useI18n } from "../i18n/useI18n";
import { buildAbsoluteUrl, buildImageUrl } from "./site";

type SeoEntry = {
	title: string;
	description: string;
	image: string;
	type?: "profile" | "website";
	noindex?: boolean;
	structuredData?: Record<string, unknown>;
};

const siteName = "introduction.exe";
const authorName = "AptS:1547";
const defaultImage = "/images/general/logo.webp";

const staticSeo: Record<
	Locale,
	Record<string, Omit<SeoEntry, "structuredData">>
> = {
	"zh-CN": {
		"/": {
			title: "AptS:1547 - 个人主页与项目档案",
			description:
				"AptS:1547 的个人主页，记录全栈开发、Rust、React、TypeScript、自托管系统、开源项目与 ESAP 世界观档案。",
			image: defaultImage,
		},
		"/profile": {
			title: "卞雨涵 / AptS:1547 - 全栈开发工程师",
			description:
				"卞雨涵的身份档案，展示 Rust 后端系统、React / TypeScript 前端、基础设施运维、协议工具链与长期主义工作倾向。",
			image: "/images/general/avatar.webp",
			type: "profile",
		},
		"/projects": {
			title: "项目作品 - AptS:1547",
			description:
				"AptS:1547 的工程项目索引，包含 ShortLinker、AsterDrive、gcop-rs、DNS Orchestrator 等 Rust、React 与自托管工具。",
			image: "/images/projects/introduction-exe.webp",
		},
		"/memory": {
			title: "Universe Archive - ESAP 与 Remnant 档案",
			description:
				"Universe Archive 记录 ESAP Project 与 Remnant Project 两条叙事线，包含创造、意识、技术体系与幸存者残响。",
			image: "/images/memory/ESAP.webp",
		},
		"/contact": {
			title: "联系 AptS:1547",
			description:
				"联系 AptS:1547 的信号通道，包括邮件、GitHub、个人博客与 RSS 订阅入口。",
			image: "/images/contact/contact.webp",
		},
	},
	"en-US": {
		"/": {
			title: "AptS:1547 - Personal Site and Project Archive",
			description:
				"The personal site of AptS:1547, covering full-stack development, Rust, React, TypeScript, self-hosted systems, open-source projects, and ESAP archives.",
			image: defaultImage,
		},
		"/profile": {
			title: "Bian Yuhan / AptS:1547 - Full-stack Developer",
			description:
				"The identity dossier of Bian Yuhan, covering Rust backend systems, React / TypeScript frontend work, infrastructure, protocol tooling, and long-term engineering habits.",
			image: "/images/general/avatar.webp",
			type: "profile",
		},
		"/projects": {
			title: "Projects - AptS:1547",
			description:
				"An engineering project index by AptS:1547, including ShortLinker, AsterDrive, gcop-rs, DNS Orchestrator, and other Rust, React, and self-hosted tools.",
			image: "/images/projects/introduction-exe.webp",
		},
		"/memory": {
			title: "Universe Archive - ESAP and Remnant",
			description:
				"Universe Archive records the ESAP Project and Remnant Project: creation, consciousness, technical systems, and survivor signals.",
			image: "/images/memory/ESAP.webp",
		},
		"/contact": {
			title: "Contact AptS:1547",
			description:
				"Signal channels for AptS:1547, including email, GitHub, personal blog, and RSS subscription links.",
			image: "/images/contact/contact.webp",
		},
	},
};

function upsertMeta(
	attribute: "name" | "property",
	key: string,
	content: string,
) {
	let element = document.head.querySelector<HTMLMetaElement>(
		`meta[${attribute}="${key}"]`,
	);

	if (!element) {
		element = document.createElement("meta");
		element.setAttribute(attribute, key);
		document.head.append(element);
	}

	element.content = content;
}

function upsertLink(rel: string, href: string) {
	let element = document.head.querySelector<HTMLLinkElement>(
		`link[rel="${rel}"]`,
	);

	if (!element) {
		element = document.createElement("link");
		element.rel = rel;
		document.head.append(element);
	}

	element.href = href;
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
	let element = document.getElementById(id) as HTMLScriptElement | null;

	if (!element) {
		element = document.createElement("script");
		element.id = id;
		element.type = "application/ld+json";
		document.head.append(element);
	}

	element.textContent = JSON.stringify(data);
}

function buildPersonSchema(locale: Locale) {
	const isChinese = locale === "zh-CN";

	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: isChinese ? "卞雨涵" : "Bian Yuhan",
		alternateName: ["AptS:1547", "47"],
		url: buildAbsoluteUrl("/profile"),
		image: buildImageUrl("/images/general/avatar.webp"),
		jobTitle: isChinese ? "全栈开发工程师" : "Full-stack Developer",
		knowsAbout: [
			"Rust",
			"React",
			"TypeScript",
			"Self-hosting",
			"Infrastructure",
			"Open source",
		],
		sameAs: ["https://github.com/AptS-1547", "https://www.esaps.net"],
	};
}

function buildWebsiteSchema(locale: Locale) {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteName,
		url: buildAbsoluteUrl("/"),
		inLanguage: locale,
		author: {
			"@type": "Person",
			name: authorName,
			url: buildAbsoluteUrl("/profile"),
		},
	};
}

function buildProjectSchema(project: ReturnType<typeof getProjectBySlug>) {
	if (!project) {
		return undefined;
	}

	return {
		"@context": "https://schema.org",
		"@type": "SoftwareSourceCode",
		name: project.name,
		description: project.summary,
		url: buildAbsoluteUrl(`/projects/${project.slug}`),
		image: project.image ? buildImageUrl(project.image) : undefined,
		codeRepository: project.githubUrl,
		programmingLanguage: project.language,
		license: project.license,
		keywords: project.tags.join(", "),
		author: {
			"@type": "Person",
			name: authorName,
			url: buildAbsoluteUrl("/profile"),
		},
	};
}

function buildSeoEntry(pathname: string, locale: Locale): SeoEntry {
	const staticEntry = staticSeo[locale][pathname];

	if (staticEntry) {
		return {
			...staticEntry,
			structuredData:
				pathname === "/profile"
					? buildPersonSchema(locale)
					: buildWebsiteSchema(locale),
		};
	}

	if (pathname.startsWith("/projects/")) {
		return {
			title: "Project not found - AptS:1547",
			description:
				"The requested project record could not be found in the AptS:1547 project archive.",
			image: defaultImage,
			noindex: true,
		};
	}

	return {
		title: "Page not found - AptS:1547",
		description:
			"The requested route could not be found in the AptS:1547 personal runtime.",
		image: defaultImage,
		noindex: true,
	};
}

export function Seo() {
	const { locale } = useI18n();
	const { pathname } = useLocation();

	const entry = useMemo<SeoEntry>(() => {
		if (pathname.startsWith("/projects/")) {
			const slug = pathname.replace(/^\/projects\//, "");
			const project = getProjectBySlug(locale, slug);

			if (project) {
				return {
					title: `${project.name} - AptS:1547 Project`,
					description: project.summary,
					image: project.image ?? defaultImage,
					structuredData: buildProjectSchema(project),
				} satisfies SeoEntry;
			}
		}

		return buildSeoEntry(pathname, locale);
	}, [locale, pathname]);

	useEffect(() => {
		const canonicalUrl = buildAbsoluteUrl(pathname);
		const imageUrl = buildImageUrl(entry.image);
		const title = `${entry.title} | ${siteName}`;

		document.documentElement.lang = locale;
		document.title = title;

		upsertMeta("name", "description", entry.description);
		upsertMeta(
			"name",
			"robots",
			entry.noindex ? "noindex, nofollow" : "index, follow",
		);
		upsertMeta("name", "author", authorName);
		upsertMeta("property", "og:site_name", siteName);
		upsertMeta("property", "og:type", entry.type ?? "website");
		upsertMeta("property", "og:title", title);
		upsertMeta("property", "og:description", entry.description);
		upsertMeta("property", "og:url", canonicalUrl);
		upsertMeta("property", "og:image", imageUrl);
		upsertMeta("property", "og:locale", locale === "zh-CN" ? "zh_CN" : "en_US");
		upsertMeta("name", "twitter:card", "summary_large_image");
		upsertMeta("name", "twitter:title", title);
		upsertMeta("name", "twitter:description", entry.description);
		upsertMeta("name", "twitter:image", imageUrl);
		upsertLink("canonical", canonicalUrl);

		if (entry.structuredData) {
			upsertJsonLd("structured-data", entry.structuredData);
		}
	}, [entry, locale, pathname]);

	return null;
}
