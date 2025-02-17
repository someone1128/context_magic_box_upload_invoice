/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_PUBLIC_PATH: string;
	readonly VITE_GLOB_API_URL: string;
	readonly VITE_APP_API_BASE_URL: string;
	readonly VITE_GLOB_APP_PWA: string;
	readonly NODE_ENV: string;
}

declare module '*.vue' {
	import { DefineComponent } from 'vue';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
