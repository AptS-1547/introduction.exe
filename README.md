# introduction.exe

AptS:1547 的个人介绍页面。它不是普通的作品集模板，而是一个带启动序列、固定导航、项目档案、世界观入口和联系通道的暗色个人 runtime。

## Stack

- React 19
- React Router 7
- TypeScript
- Vite 8
- Tailwind CSS 4
- Framer Motion
- react-icons
- Biome
- Vitest

## Pages

- `/` - INIT runtime dashboard
- `/profile` - 身份档案、能力图谱和工作倾向
- `/projects` - 按 GitHub stars 排序的项目索引
- `/projects/:slug` - 项目详情页
- `/memory` - The ESAP Project / The Remnant Project 世界观入口
- `/contact` - 少量但明确的联系入口

## Features

- Dark-only interface
- Linux-style boot waterfall animation
- Desktop fixed left rail and top status bar
- Mobile bottom tab navigation
- Chinese / English i18n
- Project data split into shared metadata and localized copy
- Real visual assets under `public/images`
- Reduced-motion compatible rendering tests

## Development

Install dependencies:

```bash
bun install
```

Start the dev server:

```bash
bun run dev
```

Build for production:

```bash
bun run build
```

Run tests:

```bash
bun run test
```

Run type checking and Biome checks:

```bash
bun run check
```

Format and autofix:

```bash
bun run check:fix
```

## Project Data

Project metadata lives in:

- `src/data/projects.ts`

Localized project copy lives in:

- `src/data/projects.zh-CN.ts`
- `src/data/projects.en-US.ts`

Shared metadata includes slug, GitHub URL, language, status key, license, stars, tags, and image path. Localized files only hold display copy such as title, description, long description, feature signals, tech stack notes, performance labels, and status labels.

## Assets

General assets:

- `public/images/general/logo.webp`
- `public/images/general/avatar.webp`

Memory assets:

- `public/images/memory/ESAP.webp`
- `public/images/memory/Remnant.webp`

Project assets:

- `public/images/projects/shortlinker.webp`

Missing project visuals intentionally render as `SIGNAL LOST`.

## Verification

Before shipping changes, run:

```bash
bun run test
bun run check
bun run build
```
