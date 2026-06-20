import type { ProjectCopyCatalog } from "./projects";

export default {
	statusLabels: {
		active: "active",
		"low-maintenance": "low-maintenance",
		"in-development": "in-development",
		planned: "planned",
		archived: "archived",
	},
	projects: {
		"dns-orchestrator": {
			title: "DNS Orchestrator",
			description:
				"Cross-platform desktop app for unified DNS record management across multiple providers",
			longDescription:
				"DNS Orchestrator is a cross-platform desktop application for unified management of DNS records across multiple DNS service providers. It supports Cloudflare, Alibaba Cloud DNS, Tencent Cloud DNSPod, and Huawei Cloud DNS, featuring secure credential storage, advanced search and filtering, account import/export, and built-in network toolbox.",
			features: [
				"Multi-account management with secure system keychain storage",
				"Universal DNS management across multiple providers",
				"Support for Cloudflare, Alibaba Cloud, Tencent Cloud, Huawei Cloud",
				"Advanced search, filtering, and infinite scroll pagination",
				"Encrypted account configuration import/export",
				"Built-in DNS lookup and WHOIS query toolbox",
				"Dark/light theme support with system preference detection",
				"Bilingual interface (English and Chinese)",
				"Cross-platform support (macOS, Windows, Linux)",
			],
			techStack: [
				{
					name: "frontend",
					items: [
						{
							name: "React 19",
							purpose: "Modern UI framework",
						},
						{
							name: "TypeScript 5",
							purpose: "Type-safe development",
						},
						{
							name: "Tailwind CSS 4",
							purpose: "Utility-first styling system",
						},
						{
							name: "Radix UI",
							purpose: "Accessible UI component library",
						},
						{
							name: "Zustand 5",
							purpose: "Lightweight state management",
						},
						{
							name: "i18next",
							purpose: "Internationalization support",
						},
					],
				},
				{
					name: "backend",
					items: [
						{
							name: "Tauri 2",
							purpose: "Cross-platform desktop app framework",
						},
						{
							name: "Rust",
							purpose: "High-performance backend core",
						},
						{
							name: "Tokio",
							purpose: "Async runtime",
						},
						{
							name: "keyring",
							purpose: "System keychain integration",
						},
					],
				},
				{
					name: "tools",
					items: [
						{
							name: "Vite 7",
							purpose: "Fast build tool",
						},
						{
							name: "pnpm",
							purpose: "Efficient package manager",
						},
						{
							name: "GitHub Actions",
							purpose: "CI/CD and multi-platform builds",
						},
					],
				},
			],
		},
		"gcop-rs": {
			title: "gcop-rs",
			description:
				"AI-powered Git commit message generator and code reviewer, written in Rust",
			longDescription:
				"gcop-rs is an AI-powered Git commit message generator and code reviewer written in Rust. This is a Rust rewrite of the original gcop project (Python), providing better performance, reliability, and maintainability. It supports multiple LLM providers including Claude, OpenAI, and Ollama, featuring convenient Git aliases, custom prompts, and flexible configuration options.",
			features: [
				"Generate conventional commit messages using Claude, OpenAI, or Ollama",
				"AI-powered code reviews with security and performance insights",
				"Convenient Git aliases (git c, git r, git acp) for streamlined workflow",
				"Interactive init command for quick configuration",
				"Support any OpenAI/Claude compatible API (DeepSeek, custom endpoints, etc.)",
				"Customize generation and review prompts with template variables",
				"Flexible configuration via file or environment variables",
				"Beautiful CLI with spinner animations and colored output",
				"Debug mode with verbose logging and full request/response inspection",
				"Full support for GPG commit signing via native git",
			],
			techStack: [
				{
					name: "backend",
					items: [
						{
							name: "Rust",
							purpose: "High-performance core language",
						},
						{
							name: "Tokio",
							purpose: "Async runtime",
						},
						{
							name: "Clap",
							purpose: "CLI argument parsing framework",
						},
						{
							name: "Reqwest",
							purpose: "HTTP client",
						},
						{
							name: "git2",
							purpose: "Git operations library",
						},
					],
				},
				{
					name: "tools",
					items: [
						{
							name: "Cargo",
							purpose: "Rust package management and building",
						},
						{
							name: "GitHub Actions",
							purpose: "CI/CD pipeline",
						},
						{
							name: "crates.io",
							purpose: "Rust package registry",
						},
					],
				},
			],
		},
		shortlinker: {
			title: "ShortLinker",
			description:
				"High-Performance URL Shortener built with Rust and Actix-web",
			longDescription:
				"ShortLinker is a minimalist yet powerful URL shortener service built from the ground up with Rust and Actix-web. Designed for maximum performance and reliability, it supports HTTP 307 redirection and achieves exceptional throughput through smart caching strategies and Bloom filters.",
			features: [
				"HTTP 307 redirection for better SEO and user experience",
				"Achieves 700k+ QPS with optimized caching layer",
				"Bloom filters for efficient URL existence checking",
				"Support for both SQLite and JSON storage backends",
				"Built-in admin API for URL management",
				"Configurable URL expiration support",
				"Cross-platform deployment with Docker",
				"Minimal memory footprint and fast startup",
			],
			techStack: [
				{
					name: "backend",
					items: [
						{
							name: "Rust",
							purpose: "Core language for performance",
						},
						{
							name: "Actix-web",
							purpose: "High-performance web framework",
						},
						{
							name: "SQLite",
							purpose: "Embedded database for persistence",
						},
						{
							name: "Bloom Filter",
							purpose: "Efficient URL existence checking",
						},
					],
				},
				{
					name: "tools",
					items: [
						{
							name: "Docker",
							purpose: "Containerization and deployment",
						},
						{
							name: "GitHub Actions",
							purpose: "CI/CD pipeline",
						},
						{
							name: "Cargo",
							purpose: "Package management and building",
						},
					],
				},
			],
			performance: [
				{
					name: "QPS",
					value: "700K+",
				},
				{
					name: "Memory Usage",
					value: "<50MB",
				},
				{
					name: "Startup Time",
					value: "<100ms",
				},
			],
		},
		"aster-drive": {
			title: "AsterDrive",
			description: "Self-hosted cloud storage built with Rust and React",
			longDescription:
				"AsterDrive is a self-hosted cloud storage system built with Rust and React. It uses a single-binary delivery model with the frontend panel embedded directly into the server, while also supporting multi-database deployments, pluggable storage policies, WebDAV, public sharing, version history, trash, thumbnails, and four upload modes. The goal is to balance simple deployment, extensibility, and a modern file collaboration experience.",
			features: [
				"Single-binary delivery with frontend assets embedded into the Rust server via rust-embed",
				"SQLite by default, with MySQL and PostgreSQL support",
				"Pluggable storage policies for local filesystem and S3-compatible object storage",
				"Four upload modes: direct, chunked, presigned, and presigned_multipart",
				"File and folder sharing with password protection, expiration, and download limits",
				"Built-in WebDAV accounts, scoped root access, database-backed locks, and DeltaV subset support",
				"Version history, trash, thumbnails, resource locks, and scheduled cleanup jobs",
				"Admin console covering users, policies, runtime config, shares, locks, and audit logs",
			],
			techStack: [
				{
					name: "frontend",
					items: [
						{
							name: "React 19",
							purpose: "File panel and admin interface",
						},
						{
							name: "TypeScript",
							purpose: "Type-safe frontend development",
						},
						{
							name: "Tailwind CSS 4",
							purpose: "Utility-first styling system",
						},
						{
							name: "react-router-dom 7",
							purpose: "Client-side routing and navigation",
						},
						{
							name: "i18next",
							purpose: "Multi-language interface support",
						},
					],
				},
				{
					name: "backend",
					items: [
						{
							name: "Rust",
							purpose: "High-performance backend core",
						},
						{
							name: "Actix-web 4",
							purpose: "HTTP API and file service framework",
						},
						{
							name: "SeaORM 2",
							purpose: "Multi-database ORM layer",
						},
						{
							name: "Tokio",
							purpose: "Async runtime",
						},
						{
							name: "dav-server",
							purpose: "WebDAV and DeltaV subset support",
						},
					],
				},
				{
					name: "tools",
					items: [
						{
							name: "Vite 8",
							purpose: "Frontend build tool",
						},
						{
							name: "Bun",
							purpose: "Frontend package management and script runner",
						},
						{
							name: "Docker",
							purpose: "Containerization and Alpine deployment",
						},
						{
							name: "Biome",
							purpose: "Frontend linting and formatting",
						},
						{
							name: "Vitest",
							purpose: "Frontend testing",
						},
					],
				},
			],
		},
		"aster-yggdrasil": {
			title: "AsterYggdrasil",
			description:
				"Self-hosted Minecraft skin site and Yggdrasil/authlib-injector authentication server",
			longDescription:
				"AsterYggdrasil is a self-hosted Minecraft skin site and Yggdrasil/authlib-injector authentication server for private Minecraft deployments. It covers site accounts, Minecraft profiles, skins and capes, launcher login, and server join verification, with a Rust backend and React admin/user panel. The project supports single-binary deployment, SQLite/MySQL/PostgreSQL, local/S3/MinIO object storage, runtime config, audit logs, maintenance tasks, and a public texture library.",
			features: [
				"Yggdrasil/authlib-injector-compatible protocol root with authenticate, refresh, validate, invalidate, and signout endpoints",
				"Minecraft join, hasJoined, profile lookup, and hash-based public texture reads",
				"Separate site accounts and Minecraft profiles, with multiple profiles per account",
				"Skin and cape uploads with PNG re-encoding, dimension validation, legacy cape compatibility, and profile binding",
				"Wardrobe texture management plus public texture library submission, review, publishing, copying, reporting, and unpublishing",
				"Admin and scoped operator workflows for users, profiles, texture moderation, config, audit, tasks, and external auth",
				"Runtime config for Yggdrasil signing key rotation, captcha policy preview, and scheduled maintenance tasks",
				"Single-binary deployment with frontend assets embedded into the Rust server via rust-embed",
			],
			techStack: [
				{
					name: "backend",
					items: [
						{
							name: "Rust 2024",
							purpose: "Authentication server and service core",
						},
						{
							name: "Actix Web 4",
							purpose: "HTTP APIs, protocol endpoints, and middleware",
						},
						{
							name: "SeaORM 2",
							purpose: "SQLite, MySQL, and PostgreSQL data access",
						},
						{
							name: "Tokio",
							purpose: "Async runtime and background task scheduling",
						},
						{
							name: "jsonwebtoken / rsa",
							purpose: "Yggdrasil texture signing and token capabilities",
						},
					],
				},
				{
					name: "frontend",
					items: [
						{
							name: "React 19",
							purpose: "Public entry, account panel, and admin console",
						},
						{
							name: "TypeScript",
							purpose: "Typed frontend service layer and page state",
						},
						{
							name: "Tailwind CSS 4",
							purpose: "Responsive UI and admin tool styling",
						},
						{
							name: "shadcn/ui",
							purpose: "Forms, dialogs, tables, and admin operation components",
						},
					],
				},
				{
					name: "infrastructure",
					items: [
						{
							name: "rust-embed",
							purpose: "Embed frontend build output into the server binary",
						},
						{
							name: "local / S3 / MinIO",
							purpose: "Object storage backends for textures and avatars",
						},
						{
							name: "Redis / memory cache",
							purpose: "Cache backends and runtime performance",
						},
						{
							name: "Docker",
							purpose: "Local trial and deployment delivery",
						},
					],
				},
			],
		},
		"ferrus-gate": {
			title: "Ferrus Gate",
			description:
				"Modern Identity Gateway supporting OAuth2, OIDC, SAML, and FIDO2",
			longDescription:
				"Ferrus Gate is a comprehensive identity gateway solution built with Rust, designed to provide unified authentication entry and account management for distributed systems. It supports multiple authentication protocols including OAuth2, OpenID Connect, SAML, and modern FIDO2/WebAuthn standards.",
			features: [
				"Multi-protocol support (OAuth2, OIDC, SAML, FIDO2)",
				"Passwordless authentication with FIDO2/WebAuthn",
				"Multi-tenant architecture for enterprise deployments",
				"Pluggable authentication providers",
				"Multi-factor authentication (MFA) support",
				"Session management and SSO capabilities",
				"Admin dashboard for user and tenant management",
				"API-first design with comprehensive REST APIs",
			],
			techStack: [
				{
					name: "backend",
					items: [
						{
							name: "Rust",
							purpose: "Core system implementation",
						},
						{
							name: "Actix-web",
							purpose: "Modern async web framework",
						},
						{
							name: "PostgreSQL",
							purpose: "Primary data storage",
						},
						{
							name: "Redis",
							purpose: "Session and cache management",
						},
					],
				},
				{
					name: "frontend",
					items: [
						{
							name: "Vue.js 3",
							purpose: "Admin dashboard frontend",
						},
						{
							name: "TypeScript",
							purpose: "Type-safe development",
						},
						{
							name: "Tailwind CSS",
							purpose: "Utility-first styling",
						},
					],
				},
				{
					name: "tools",
					items: [
						{
							name: "Docker Compose",
							purpose: "Local development environment",
						},
						{
							name: "Kubernetes",
							purpose: "Production deployment",
						},
						{
							name: "OpenAPI",
							purpose: "API documentation",
						},
					],
				},
			],
		},
		nebulink: {
			title: "Nebulink",
			description:
				"Distributed acceleration management platform based on global cloud nodes",
			longDescription:
				"Nebulink is a distributed acceleration management platform based on global cloud nodes, dedicated to building an efficient, flexible, and scalable CDN control system. It aims to weave global nodes into a nebula and accelerate services through intelligent routing and load balancing.",
			features: [
				"Global node registration and heartbeat monitoring",
				"Multi-node latency detection and load balancing",
				"Intelligent routing and acceleration logic",
				"Configuration center with management APIs",
				"Real-time monitoring and status reporting (planned)",
				"Security mechanisms (planned)",
				"Distributed system architecture",
				"High-performance CDN control system",
			],
			techStack: [
				{
					name: "backend",
					items: [
						{
							name: "Rust",
							purpose: "Core system implementation for performance",
						},
						{
							name: "Actix-web",
							purpose: "High-performance async web framework",
						},
					],
				},
				{
					name: "tools",
					items: [
						{
							name: "Cargo",
							purpose: "Rust package management and building",
						},
						{
							name: "GitHub",
							purpose: "Version control and collaboration",
						},
					],
				},
			],
		},
		"sled-gui": {
			title: "Sled GUI",
			description:
				"A Simple Visual Manager for Sled KV Database built with Tauri",
			longDescription:
				"Sled GUI is a modern desktop application built with Tauri that provides a visual interface for managing Sled embedded key-value databases. Combining the performance and security of Rust backend with the flexibility of modern web technologies, it offers developers an intuitive way to browse, edit, and manage Sled database entries without direct file manipulation. The application leverages Tauri's unique architecture to deliver native performance with web-based UI flexibility.",
			features: [
				"Native desktop performance with Tauri's Rust core",
				"Modern web UI built with Vue 3 and TypeScript",
				"Direct integration with Sled embedded database",
				"Real-time database browsing and key-value management",
				"Cross-platform support (Windows, macOS, Linux)",
				"Secure file system access through Tauri APIs",
				"Lightweight bundle size with Tauri's optimization",
				"Hot-reload development experience",
			],
			techStack: [
				{
					name: "backend",
					items: [
						{
							name: "Rust",
							purpose: "Core application logic and Tauri backend",
						},
						{
							name: "Tauri",
							purpose: "Desktop app framework and system APIs",
						},
						{
							name: "Sled",
							purpose: "Embedded key-value database integration",
						},
						{
							name: "tokio",
							purpose: "Async runtime for database operations",
						},
					],
				},
				{
					name: "frontend",
					items: [
						{
							name: "Vue 3",
							purpose: "Reactive UI framework with Composition API",
						},
						{
							name: "TypeScript",
							purpose: "Type-safe frontend development",
						},
						{
							name: "Tailwind CSS",
							purpose: "Utility-first styling system",
						},
						{
							name: "Vite",
							purpose: "Fast build tool optimized for Tauri",
						},
					],
				},
				{
					name: "tools",
					items: [
						{
							name: "Tauri CLI",
							purpose: "Build and development toolchain",
						},
						{
							name: "Cargo",
							purpose: "Rust package management",
						},
						{
							name: "ESLint + Prettier",
							purpose: "Code quality and formatting",
						},
					],
				},
			],
		},
		"onebot-github-webhook": {
			title: "OneBot GitHub Webhook",
			description:
				"GitHub Webhook to QQ notification service via OneBot protocol",
			longDescription:
				"OneBot GitHub Webhook is a powerful service that bridges GitHub webhooks to QQ groups using the OneBot protocol. It provides seamless integration between GitHub repositories and QQ groups, enabling real-time notifications for code changes, issues, pull requests, and releases. The service features advanced pattern matching, secure webhook verification, and flexible configuration options.",
			features: [
				"Secure GitHub Webhook signature verification",
				"OneBot protocol support (WebSocket and HTTP)",
				"Advanced repository and branch matching with wildcards",
				"Flexible event filtering (push, PR, issues, releases)",
				"Customizable message formatting and templates",
				"Multi-group and multi-bot support",
				"Docker containerization for easy deployment",
				"Comprehensive logging and error handling",
				"Planned: GitHub API polling for private repositories",
				"Planned: Custom Jinja2 template system",
			],
			techStack: [
				{
					name: "backend",
					items: [
						{
							name: "Python 3.8+",
							purpose: "Core programming language",
						},
						{
							name: "FastAPI",
							purpose: "High-performance async web framework",
						},
						{
							name: "Uvicorn",
							purpose: "ASGI server for production deployment",
						},
						{
							name: "Pydantic",
							purpose: "Data validation and settings management",
						},
						{
							name: "aiohttp",
							purpose: "Async HTTP client for OneBot communication",
						},
						{
							name: "PyYAML",
							purpose: "Configuration file parsing",
						},
					],
				},
				{
					name: "tools",
					items: [
						{
							name: "Docker",
							purpose: "Containerization and deployment",
						},
						{
							name: "GitHub Actions",
							purpose: "CI/CD pipeline",
						},
						{
							name: "Poetry",
							purpose: "Python dependency management",
						},
						{
							name: "pytest",
							purpose: "Unit testing framework",
						},
					],
				},
			],
			performance: [
				{
					name: "Response Time",
					value: "<100ms",
				},
				{
					name: "Memory Usage",
					value: "<100MB",
				},
				{
					name: "Event Processing",
					value: "1000+/min",
				},
			],
		},
		"vue-portfolio": {
			title: "Vue Portfolio",
			description:
				"Personal portfolio website built with Vue.js and modern design",
			longDescription:
				"A responsive and modern personal portfolio website showcasing projects, skills, and professional experience. Built with Vue.js 3, TypeScript, and Tailwind CSS, it features smooth animations, responsive design, and optimized performance.",
			features: [
				"Fully responsive design for all device sizes",
				"Smooth scroll animations and transitions",
				"Project showcase with filtering capabilities",
				"Skills and expertise visualization",
				"Professional experience timeline",
				"Contact form with validation",
				"SEO optimized with meta tags",
				"Fast loading with lazy loading images",
			],
			techStack: [
				{
					name: "frontend",
					items: [
						{
							name: "Vue.js 3",
							purpose: "Progressive web framework",
						},
						{
							name: "TypeScript",
							purpose: "Type safety and better DX",
						},
						{
							name: "Tailwind CSS",
							purpose: "Utility-first CSS framework",
						},
						{
							name: "Vue Router",
							purpose: "Client-side routing",
						},
					],
				},
				{
					name: "tools",
					items: [
						{
							name: "Vite",
							purpose: "Fast build tool and dev server",
						},
						{
							name: "ESLint",
							purpose: "Code linting and formatting",
						},
						{
							name: "Prettier",
							purpose: "Code formatting",
						},
					],
				},
			],
		},
		"introduction-exe": {
			title: "introduction.exe",
			description:
				"Dark-only personal introduction runtime built with React, Vite, and Tailwind CSS",
			longDescription:
				"introduction.exe is the current personal introduction site built with React, React Router, Vite, and Tailwind CSS. It frames the profile as a dark runtime dossier with a Linux-style boot waterfall, fixed desktop navigation, mobile bottom tabs, bilingual content, profile records, a project index, memory archives, and a focused contact channel.",
			features: [
				"Dark-only personal runtime visual system",
				"Linux-style boot waterfall with session-level boot state",
				"Fixed desktop side rail and top status bar",
				"Mobile app-like bottom navigation",
				"Chinese and English content with locale transition motion",
				"Project data sorted by GitHub stars",
				"Shared project metadata separated from localized copy",
				"Reduced-motion aware component test coverage",
			],
			techStack: [
				{
					name: "frontend",
					items: [
						{
							name: "React 19",
							purpose: "Page components and interactive interface",
						},
						{
							name: "React Router 7",
							purpose: "Page navigation and project detail routing",
						},
						{
							name: "TypeScript",
							purpose: "Type constraints for project data and component APIs",
						},
						{
							name: "Tailwind CSS 4",
							purpose: "Dark visual system and responsive layout",
						},
					],
				},
				{
					name: "motion",
					items: [
						{
							name: "Framer Motion",
							purpose:
								"Boot sequence, page transitions, and locale transitions",
						},
						{
							name: "react-icons",
							purpose: "Navigation, status, and action icons",
						},
					],
				},
				{
					name: "tools",
					items: [
						{
							name: "Vite 8",
							purpose: "Development server and production builds",
						},
						{
							name: "Vitest",
							purpose: "Component and page behavior tests",
						},
						{
							name: "Biome",
							purpose: "Code checking and formatting",
						},
					],
				},
			],
		},
		"wakatime-readme-updater": {
			title: "WakaTime README Updater",
			description:
				"Automatically integrate WakaTime coding statistics into GitHub README",
			longDescription:
				"A high-performance Rust tool that automatically integrates WakaTime coding statistics into GitHub README files. This is a complete rewrite of an earlier Python implementation, offering blazing fast performance, memory safety, and a single binary with no runtime dependencies. It supports flexible deployment options including GitHub Actions, Docker, and standalone CLI.",
			features: [
				"Memory-safe and blazing fast Rust implementation",
				"Single binary with no runtime dependencies",
				"Flexible deployment: GitHub Actions, Docker, or CLI",
				"Multiple configuration methods: CLI args, env vars, or TOML",
				"Automated Git workflow with intelligent authentication",
				"Customizable statistics display (languages, editors, OS)",
				"Configurable timeframe for statistics collection",
				"Small binary footprint for efficient CI/CD integration",
			],
			techStack: [
				{
					name: "backend",
					items: [
						{
							name: "Rust 1.90+",
							purpose: "Core language for performance and safety",
						},
						{
							name: "WakaTime API",
							purpose: "Coding statistics data source",
						},
						{
							name: "GitHub API",
							purpose: "Repository management and updates",
						},
					],
				},
				{
					name: "tools",
					items: [
						{
							name: "Docker",
							purpose: "Containerization for flexible deployment",
						},
						{
							name: "GitHub Actions",
							purpose: "Automated README updates",
						},
						{
							name: "Cargo",
							purpose: "Rust package management and building",
						},
					],
				},
			],
		},
		"nginx-modsecurity": {
			title: "Nginx with ModSecurity",
			description:
				"Enterprise-grade WAF Docker image with Nginx and OWASP ModSecurity",
			longDescription:
				"A lightweight yet powerful Docker image combining Nginx with the OWASP ModSecurity Web Application Firewall, providing enterprise-grade protection for modern web applications. Built on Alpine Linux with security hardening, it offers multi-architecture support and complete dependencies for robust security features.",
			features: [
				"Latest Nginx 1.28.0 with ModSecurity v3.0.14",
				"Lightweight Alpine Linux base (~60MB)",
				"Multi-architecture support (AMD64 and ARM64)",
				"ModSecurity compiled as dynamic module",
				"Complete dependencies: Lua 5.4, LMDB, YAJL, GeoIP",
				"Protection against OWASP Top 10 threats",
				"Multi-stage builds for reduced attack surface",
				"Automated CI/CD with GitHub Actions",
			],
			techStack: [
				{
					name: "infrastructure",
					items: [
						{
							name: "Nginx 1.28.0",
							purpose: "High-performance web server",
						},
						{
							name: "ModSecurity v3.0.14",
							purpose: "OWASP WAF engine",
						},
						{
							name: "Alpine Linux",
							purpose: "Lightweight and secure base image",
						},
						{
							name: "Lua 5.4",
							purpose: "Scripting support for advanced rules",
						},
					],
				},
				{
					name: "tools",
					items: [
						{
							name: "Docker",
							purpose: "Containerization and deployment",
						},
						{
							name: "GitHub Actions",
							purpose: "Automated building and publishing",
						},
						{
							name: "Multi-stage builds",
							purpose: "Optimized image size and security",
						},
					],
				},
			],
			performance: [
				{
					name: "Image Size",
					value: "~60MB",
				},
				{
					name: "Architectures",
					value: "AMD64 + ARM64",
				},
			],
		},
		"acme-docker-reloader": {
			title: "ACME Docker Reloader",
			description:
				"Automated SSL certificate renewal and service reload for Docker containers",
			longDescription:
				"An intelligent automation solution that enables acme.sh running in Docker containers to automatically request and renew SSL certificates, then seamlessly reload host or container services like Nginx or Caddy upon certificate updates. Features socket-based IPC, comprehensive error handling, and out-of-the-box usability.",
			features: [
				"Out-of-the-box functionality with three-step setup",
				"Containerized acme.sh with automated renewal",
				"Socket-based inter-process communication",
				"Multi-service support configuration",
				"Automatic service reload (Nginx, Caddy, etc.)",
				"Comprehensive error handling and logging",
				"Simple YAML-based configuration",
				"systemd service integration",
			],
			techStack: [
				{
					name: "automation",
					items: [
						{
							name: "Shell Script",
							purpose: "Core automation logic",
						},
						{
							name: "acme.sh",
							purpose: "ACME protocol SSL certificate management",
						},
						{
							name: "systemd",
							purpose: "Service management and daemon process",
						},
					],
				},
				{
					name: "tools",
					items: [
						{
							name: "Docker",
							purpose: "Container orchestration",
						},
						{
							name: "Docker Compose",
							purpose: "Multi-container setup",
						},
						{
							name: "Unix Sockets",
							purpose: "Host-container communication",
						},
					],
				},
			],
		},
		"aster-pulse": {
			title: "AsterPulse",
			description: "A distributed uptime monitoring system",
			longDescription:
				"AsterPulse is a planned distributed uptime monitoring system focused on tracking internet connectivity and service availability across globally distributed nodes. Based on the current GitHub repository metadata, the project is positioned as an uptime monitoring system and is still in an early stage.",
			features: [
				"Distributed uptime monitoring architecture (planned)",
				"Service availability checks across multiple nodes (planned)",
				"Internet connectivity and health signal tracking (planned)",
				"Early-stage monitoring platform exploration",
			],
		},
	},
} satisfies ProjectCopyCatalog;
