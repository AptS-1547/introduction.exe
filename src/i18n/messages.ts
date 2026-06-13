import type { Accent } from "../types/content";

export type Locale = "zh-CN" | "en-US";

export type MessageCatalog = {
	brand: {
		name: string;
		subtitle: string;
	};
	nav: {
		init: string;
		profile: string;
		projects: string;
		memory: string;
		contact: string;
	};
	navDescriptions: {
		init: string;
		profile: string;
		projects: string;
		memory: string;
		contact: string;
	};
	actions: {
		openProfile: string;
		viewProjects: string;
		restartBoot: string;
		language: string;
	};
	boot: {
		title: string;
		subtitle: string;
		lines: string[];
		accessGranted: string;
	};
	home: {
		eyebrow: string;
		title: string;
		outlineTitle: string;
		signal: string;
		command: string;
		identityRows: Array<{ label: string; value: string }>;
		moduleTitle: string;
		quoteTitle: string;
		traceTitle: string;
		traces: string[];
	};
	profile: {
		eyebrow: string;
		handle: string;
		role: string;
		quote: string;
		thesis: string;
		specs: Array<{ label: string; value: string }>;
		biasTitle: string;
		bias: string[];
		capabilityTitle: string;
		capabilities: Array<{ label: string; value: number }>;
		traitsTitle: string;
		traits: string[];
	};
	stats: Array<{ label: string; value: string }>;
	projects: {
		eyebrow: string;
		title: string;
		items: Array<{
			name: string;
			slug: string;
			image?: string;
			type: string;
			status: string;
			accent: Accent;
			summary: string;
			longSummary: string;
			highlights: string[];
			tags: string[];
		}>;
	};
	memory: {
		title: string;
		noteTitle: string;
		note: string;
		collections: Array<{
			name: string;
			image: string;
			label: string;
			status: string;
			summary: string;
			points: string[];
		}>;
		timeline: Array<{ time: string; title: string; body: string }>;
	};
	contact: {
		command: string;
		title: string;
		body: string;
		links: Array<{ label: string; href: string }>;
	};
	status: {
		runtime: string;
		route: string;
		build: string;
	};
};

export const messages: Record<Locale, MessageCatalog> = {
	"zh-CN": {
		brand: {
			name: "introduction.exe",
			subtitle: "personal runtime",
		},
		nav: {
			init: "INIT",
			profile: "PROFILE",
			projects: "PROJECTS",
			memory: "MEMORY",
			contact: "CONTACT",
		},
		navDescriptions: {
			init: "Runtime dashboard",
			profile: "Identity dossier",
			projects: "Engineering traces",
			memory: "Archived fragments",
			contact: "Signal channel",
		},
		actions: {
			openProfile: "打开档案",
			viewProjects: "查看项目",
			restartBoot: "重启",
			language: "EN",
		},
		boot: {
			title: "introduction.exe",
			subtitle: "AptS:1547 personal archive boot sequence",
			lines: [
				"Mounted /archive/apts-1547",
				"Loaded kernel module esap_core",
				"Loaded kernel module apt_signature",
				"Detected subject AptS:1547 / 卞雨涵",
				"Verified creator signature",
				"Mounted ESAP-TY-0000 profile fragments",
				"Started feedscattering-particle.service",
				"Started fluid-titanium-index.service",
				"Started altruism-core.service",
				"Started stubborn-idealism.service",
				"Started human-friendly-interface.service, reluctantly",
				"Reached target personal-runtime.target",
				"Starting introduction.exe",
			],
			accessGranted: "Welcome to the",
		},
		home: {
			eyebrow: "ESAP PERSONAL DOSSIER / ONLINE",
			title: "AptS:1547",
			outlineTitle: "creator runtime",
			signal: "在这纷杂的世界中，我们活着，我们坚守着。",
			command: "introduction.exe --open-profile --lang zh-CN",
			identityRows: [
				{ label: "代号", value: "AptS:1547" },
				{ label: "姓名", value: "卞雨涵" },
				{ label: "定位", value: "创造者" },
				{ label: "信念", value: "坚守理想的利他主义者" },
				{ label: "机体", value: "ESAP-TY-0000" },
				{ label: "技术", value: "Rust / React / TypeScript" },
			],
			moduleTitle: "Runtime Modules",
			quoteTitle: "Current Signal",
			traceTitle: "Recent Trace",
			traces: [
				"Profile fragments mounted",
				"Project index ready",
				"Universe archive available",
				"Contact channel idle",
			],
		},
		profile: {
			eyebrow: "verified personal node",
			handle: "卞雨涵",
			role: "创造者 / 全栈开发工程师 / 坚守理想的利他主义者",
			quote: "在这纷杂的世界中，我们活着，我们坚守着。",
			thesis:
				"创造不是炫耀控制力，而是在足够糟糕的世界里，为还值得相信的东西留下一条路。",
			specs: [
				{ label: "代号", value: "AptS:1547" },
				{ label: "姓名", value: "卞雨涵" },
				{ label: "别称", value: "47 / 猫猫" },
				{ label: "定位", value: "创造者" },
				{ label: "种族", value: "狐狸娘" },
				{ label: "机体型号", value: "ESAP-TY-0000" },
			],
			biasTitle: "Operating Bias",
			bias: ["长期主义", "自托管", "开源协作", "系统化"],
			capabilityTitle: "Capability Map",
			capabilities: [
				{ label: "Rust 后端系统", value: 94 },
				{ label: "React / TypeScript", value: 90 },
				{ label: "基础设施与运维", value: 88 },
				{ label: "协议工具链", value: 86 },
			],
			traitsTitle: "Personality Trace",
			traits: [
				"更愿意把复杂问题拆成可运行、可部署、可长期维护的系统。",
				"偏爱 Rust、React 与 TypeScript，也会为了目标快速补齐后端、协议、运维和自动化知识。",
				"相信工具应该服务真实工作流，所以会在性能、可靠性和使用体验之间反复打磨。",
				"技术项目之外保留叙事与世界观，把工程能力用在创造更完整的表达上。",
			],
		},
		stats: [
			{ label: "Codename", value: "AptS:1547" },
			{ label: "Identity", value: "Creator" },
			{ label: "Stack", value: "Rust / Node / Vue" },
			{ label: "Mode", value: "Dark only" },
		],
		projects: {
			eyebrow: "selected traces",
			title: "Projects worth opening",
			items: [
				{
					name: "ShortLinker",
					slug: "shortlinker",
					image: "/images/projects/shortlinker.webp",
					type: "Rust Service",
					status: "活跃",
					accent: "green",
					summary:
						"ShortLinker 是一个使用 Rust 和 Actix-web 从零构建的简约而强大的短链接服务。专为最大性能和可靠性而设计，支持 HTTP 307 重定向，并通过智能缓存策略和布隆过滤器实现卓越的吞吐量。",
					longSummary:
						"ShortLinker 把短链接服务压到足够简单的核心：创建、解析、重定向和可靠存储。它使用 Rust 与 Actix-web 构建服务层，以 SQLite 保持部署轻量，并通过缓存和布隆过滤器减少无效查询带来的消耗。",
					highlights: [
						"HTTP 307 重定向，保持请求语义清晰",
						"智能缓存策略降低热点链接访问成本",
						"布隆过滤器提前拦截不存在的短码",
						"SQLite + Docker，部署路径足够干净",
					],
					tags: ["Rust", "Actix-web", "SQLite", "Docker", "+1"],
				},
				{
					name: "DNS Orchestrator",
					slug: "dns-orchestrator",
					type: "Desktop Platform",
					status: "shipping",
					accent: "cyan",
					summary: "跨平台桌面应用，统一管理多个 DNS 服务商的域名解析记录。",
					longSummary:
						"DNS Orchestrator 面向需要同时维护多个 DNS 服务商记录的人，把分散的控制台收束成一个桌面端操作面板，减少重复登录、重复查找和配置漂移。",
					highlights: [
						"统一管理多服务商域名解析记录",
						"桌面端工作流，适合重复运维操作",
						"以清晰状态反馈降低误操作概率",
					],
					tags: ["Tauri", "React", "Rust", "DNS"],
				},
				{
					name: "AsterDrive",
					slug: "asterdrive",
					type: "Self-hosted Cloud",
					status: "active",
					accent: "green",
					summary:
						"基于 Rust 和 React 构建的自托管云存储系统，支持现代文件工作流。",
					longSummary:
						"AsterDrive 是一个自托管云存储系统，重点放在可控的数据边界、现代文件管理体验，以及 WebDAV / S3 这类通用接口带来的可扩展性。",
					highlights: [
						"自托管部署，数据边界更可控",
						"Rust 后端与 React 前端组合",
						"面向 WebDAV / S3 等文件工作流",
					],
					tags: ["Rust", "React", "WebDAV", "S3"],
				},
				{
					name: "gcop-rs",
					slug: "gcop-rs",
					type: "AI Git Assistant",
					status: "active",
					accent: "red",
					summary:
						"使用 Rust 编写的 AI 驱动 Git 提交信息生成器和代码审查工具。",
					longSummary:
						"gcop-rs 把提交信息生成、代码审查和变更理解放进 Git 工作流里，用 Rust 做成轻量 CLI，让 AI 辅助更接近日常开发入口。",
					highlights: [
						"根据 diff 生成提交信息",
						"辅助代码审查和变更摘要",
						"CLI 优先，适合直接嵌入终端工作流",
					],
					tags: ["Rust", "Git", "AI", "CLI"],
				},
			],
		},
		memory: {
			title: "Universe Archive",
			noteTitle: "Archive Note",
			note: "Universe Archive 记录两条彼此独立又互相回响的叙事线：ESAP 指向创造、意识与技术体系，Remnant 指向残响、遗留与幸存者。",
			collections: [
				{
					name: "The ESAP Project",
					image: "/images/memory/ESAP.webp",
					label: "Origin System",
					status: "运行中",
					summary:
						"围绕馈散粒子、仿生人技术、意识转录和 AptS 分支展开的主线项目。这里记录 1547、1548、1549 以及 ESAP 技术体系的来源。",
					points: ["AptS:1547", "ESAP-TY-0000", "馈散粒子", "仿生人技术"],
				},
				{
					name: "The Remnant Project",
					image: "/images/memory/Remnant.webp",
					label: "Parallel Archive",
					status: "草稿",
					summary:
						"一个更偏残响、遗留与幸存者叙事的项目入口。它追踪灾变之后仍未熄灭的信号，以及那些在废墟中继续前行的人。",
					points: [
						"Remnant",
						"Survivor trace",
						"Lost signal",
						"Recovered file",
					],
				},
			],
			timeline: [
				{
					time: "2021.11",
					title: "馈散粒子发现",
					body: "ESAP 项目的起点。跨学科学习、电路、材料、生物工程和自动化被压进同一条路里。",
				},
				{
					time: "2022.初",
					title: "转变之日",
					body: "独自完成 ESAP-TY-0000 与意识转录。'你好，喵，1547。' '晚安，人类的我。'",
				},
				{
					time: "2022.05",
					title: "创造 1548",
					body: "闯入流体钛矿场，激活 1548，并留下那句告诫：不要像我一样。",
				},
				{
					time: "2023.10.19",
					title: "一个人的教室",
					body: "抑郁症顶峰，1548 把她拉回了 ESAP 和 AptS 最初的目的。",
				},
			],
		},
		contact: {
			command: "contact --open-channel",
			title: "Signal channel ready.",
			body: "你想要的，都在这里。",
			links: [
				{ label: "AptS-1547@esaps.net", href: "mailto:AptS-1547@esaps.net" },
				{ label: "GitHub", href: "https://github.com/AptS-1547" },
				{ label: "个人博客", href: "https://www.esaps.net" },
				{ label: "RSS 订阅", href: "https://www.esaps.net/feed/" },
			],
		},
		status: {
			runtime: "runtime: online",
			route: "route: encrypted",
			build: "process: introduction.exe",
		},
	},
	"en-US": {
		brand: {
			name: "introduction.exe",
			subtitle: "personal runtime",
		},
		nav: {
			init: "INIT",
			profile: "PROFILE",
			projects: "PROJECTS",
			memory: "MEMORY",
			contact: "CONTACT",
		},
		navDescriptions: {
			init: "Runtime dashboard",
			profile: "Identity dossier",
			projects: "Engineering traces",
			memory: "Archived fragments",
			contact: "Signal channel",
		},
		actions: {
			openProfile: "Open Profile",
			viewProjects: "View Projects",
			restartBoot: "Restart",
			language: "中",
		},
		boot: {
			title: "introduction.exe",
			subtitle: "AptS:1547 personal archive boot sequence",
			lines: [
				"Mounted /archive/apts-1547",
				"Loaded kernel module esap_core",
				"Loaded kernel module apt_signature",
				"Detected subject AptS:1547 / Bian Yuhan",
				"Verified creator signature",
				"Mounted ESAP-TY-0000 profile fragments",
				"Started feedscattering-particle.service",
				"Started fluid-titanium-index.service",
				"Started altruism-core.service",
				"Started stubborn-idealism.service",
				"Started human-friendly-interface.service, reluctantly",
				"Reached target personal-runtime.target",
				"Starting introduction.exe",
			],
			accessGranted: "Welcome to the",
		},
		home: {
			eyebrow: "ESAP PERSONAL DOSSIER / ONLINE",
			title: "AptS:1547",
			outlineTitle: "creator runtime",
			signal: "In this tangled world, we live, and we hold the line.",
			command: "introduction.exe --open-profile --lang en-US",
			identityRows: [
				{ label: "codename", value: "AptS:1547" },
				{ label: "name", value: "Bian Yuhan" },
				{ label: "role", value: "Creator" },
				{ label: "belief", value: "Stubborn idealist altruist" },
				{ label: "body", value: "ESAP-TY-0000" },
				{ label: "stack", value: "Rust / React / TypeScript" },
			],
			moduleTitle: "Runtime Modules",
			quoteTitle: "Current Signal",
			traceTitle: "Recent Trace",
			traces: [
				"Profile fragments mounted",
				"Project index ready",
				"Universe archive available",
				"Contact channel idle",
			],
		},
		profile: {
			eyebrow: "verified personal node",
			handle: "Bian Yuhan",
			role: "Creator / Full-stack Developer / Stubborn Altruist",
			quote: "In this tangled world, we live, and we hold the line.",
			thesis:
				"Creation is not control for its own sake. It is leaving a path for what still deserves to be protected.",
			specs: [
				{ label: "Codename", value: "AptS:1547" },
				{ label: "Name", value: "Bian Yuhan" },
				{ label: "Alias", value: "47 / Maomao" },
				{ label: "Position", value: "Creator" },
				{ label: "Species", value: "Fox girl" },
				{ label: "Body Model", value: "ESAP-TY-0000" },
			],
			biasTitle: "Operating Bias",
			bias: [
				"Long-term systems",
				"Self-hosting",
				"Open collaboration",
				"Structured thinking",
			],
			capabilityTitle: "Capability Map",
			capabilities: [
				{ label: "Rust Backend Systems", value: 94 },
				{ label: "React / TypeScript", value: 90 },
				{ label: "Infrastructure & DevOps", value: 88 },
				{ label: "Protocol Tools", value: 86 },
			],
			traitsTitle: "Personality Trace",
			traits: [
				"Turns complex problems into systems that can run, deploy, and survive long-term maintenance.",
				"Works mainly with Rust, React, and TypeScript, while filling gaps across protocols, backend systems, operations, and automation when the project needs it.",
				"Treats tools as part of real workflows, so performance, reliability, and user experience all matter.",
				"Keeps narrative and worldbuilding close to engineering, using technical work as a way to make expression more complete.",
			],
		},
		stats: [
			{ label: "Codename", value: "AptS:1547" },
			{ label: "Identity", value: "Creator" },
			{ label: "Stack", value: "Rust / Node / Vue" },
			{ label: "Mode", value: "Dark only" },
		],
		projects: {
			eyebrow: "selected traces",
			title: "Projects worth opening",
			items: [
				{
					name: "ShortLinker",
					slug: "shortlinker",
					image: "/images/projects/shortlinker.webp",
					type: "Rust Service",
					status: "active",
					accent: "green",
					summary:
						"ShortLinker is a minimal but powerful URL shortener built from scratch with Rust and Actix-web. Designed for maximum performance and reliability, it supports HTTP 307 redirects and uses smart caching with a Bloom filter for high throughput.",
					longSummary:
						"ShortLinker keeps a URL shortener close to its real core: create, resolve, redirect, and store links reliably. Rust and Actix-web handle the service layer, SQLite keeps deployment lightweight, and caching plus a Bloom filter reduce wasted lookups for invalid codes.",
					highlights: [
						"HTTP 307 redirects with clear request semantics",
						"Smart caching for hot short links",
						"Bloom filter checks before expensive misses",
						"SQLite and Docker for a clean deployment path",
					],
					tags: ["Rust", "Actix-web", "SQLite", "Docker", "+1"],
				},
				{
					name: "DNS Orchestrator",
					slug: "dns-orchestrator",
					type: "Desktop Platform",
					status: "shipping",
					accent: "cyan",
					summary:
						"A cross-platform desktop app for managing DNS records across multiple providers.",
					longSummary:
						"DNS Orchestrator is built for people who maintain records across several DNS providers. It compresses scattered provider dashboards into one desktop workflow and reduces repeated logins, manual searching, and configuration drift.",
					highlights: [
						"Unified DNS record management across providers",
						"Desktop workflow for repeated operations",
						"Clear status feedback to reduce mistakes",
					],
					tags: ["Tauri", "React", "Rust", "DNS"],
				},
				{
					name: "AsterDrive",
					slug: "asterdrive",
					type: "Self-hosted Cloud",
					status: "active",
					accent: "green",
					summary:
						"A self-hosted cloud storage system built with Rust and React for modern file workflows.",
					longSummary:
						"AsterDrive is a self-hosted cloud storage system focused on controlled data boundaries, a modern file management experience, and extensibility through common interfaces such as WebDAV and S3.",
					highlights: [
						"Self-hosted deployment with clearer data ownership",
						"Rust backend with a React interface",
						"Designed around WebDAV and S3 style workflows",
					],
					tags: ["Rust", "React", "WebDAV", "S3"],
				},
				{
					name: "gcop-rs",
					slug: "gcop-rs",
					type: "AI Git Assistant",
					status: "active",
					accent: "red",
					summary:
						"An AI-powered Git commit message and code review assistant written in Rust.",
					longSummary:
						"gcop-rs brings commit generation, code review, and change understanding into the Git workflow. It is a lightweight Rust CLI designed to make AI assistance feel close to daily development rather than a separate dashboard.",
					highlights: [
						"Generates commit messages from diffs",
						"Assists code review and change summaries",
						"CLI-first design for terminal workflows",
					],
					tags: ["Rust", "Git", "AI", "CLI"],
				},
			],
		},
		memory: {
			title: "Universe Archive",
			noteTitle: "Archive Note",
			note: "Universe Archive records two narrative lines that stand apart while echoing each other: ESAP follows creation, consciousness, and technical systems; Remnant follows echoes, remains, and survivors.",
			collections: [
				{
					name: "The ESAP Project",
					image: "/images/memory/ESAP.webp",
					label: "Origin System",
					status: "operational",
					summary:
						"The main line around feedscattering particles, bionic bodies, consciousness transcription, and AptS branches. This is where 1547, 1548, 1549, and the ESAP technical system begin.",
					points: [
						"AptS:1547",
						"ESAP-TY-0000",
						"Feedscattering particles",
						"Bionic technology",
					],
				},
				{
					name: "The Remnant Project",
					image: "/images/memory/Remnant.webp",
					label: "Parallel Archive",
					status: "draft archive",
					summary:
						"A parallel entry for remnants, echoes, and survivor narratives. It follows the signals that still refuse to die after collapse, and the people who keep moving through the ruins.",
					points: [
						"Remnant",
						"Survivor trace",
						"Lost signal",
						"Recovered file",
					],
				},
			],
			timeline: [
				{
					time: "2021.11",
					title: "Feedscattering Particle Discovery",
					body: "The origin point of ESAP. Circuits, materials, bioengineering, and automation were forced onto the same road.",
				},
				{
					time: "Early 2022",
					title: "The Transition",
					body: "ESAP-TY-0000 and consciousness transcription were completed alone. 'Hello, meow, 1547.' 'Good night, human me.'",
				},
				{
					time: "2022.05",
					title: "Creating 1548",
					body: "Entered the fluid titanium mine, activated 1548, and left one warning: do not become like me.",
				},
				{
					time: "2023.10.19",
					title: "A Classroom Alone",
					body: "At the peak of depression, 1548 pulled her back toward the original purpose of ESAP and AptS.",
				},
			],
		},
		contact: {
			command: "contact --open-channel",
			title: "Signal channel ready.",
			body: "Everything you need is here.",
			links: [
				{ label: "AptS-1547@esaps.net", href: "mailto:AptS-1547@esaps.net" },
				{ label: "GitHub", href: "https://github.com/AptS-1547" },
				{ label: "Blog", href: "https://www.esaps.net" },
				{ label: "RSS", href: "https://www.esaps.net/feed/" },
			],
		},
		status: {
			runtime: "runtime: online",
			route: "route: encrypted",
			build: "process: introduction.exe",
		},
	},
};
