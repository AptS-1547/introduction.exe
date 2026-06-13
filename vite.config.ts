import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	test: {
		coverage: {
			exclude: [
				"src/main.tsx",
				"src/types/**",
				"src/**/*.test.{ts,tsx}",
				"src/test/**",
			],
			include: ["src/**/*.{ts,tsx}"],
			thresholds: {
				branches: 85,
				functions: 85,
				lines: 85,
				statements: 85,
			},
		},
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
	},
});
