import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
	const config = {
		plugins: [tailwindcss(), react()],
		base: '/NextPause/',
	};
	return config;
});
