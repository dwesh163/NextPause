import { Theme } from '../types/types';

export const predefinedThemes: Theme[] = [
	{
		name: 'Basic',
		background: '#000000',
		text: '#ffffff',
		accent: '#ffffff',
		card: '#000000',
		style: 'basic',
	},
	{
		name: 'Flip Clock',
		background: '#1a1a1a',
		text: '#ffffff',
		accent: '#f0f0f0',
		card: '#2d2d2d',
		style: 'flip',
	},
	{
		name: 'Minimal Light',
		background: '#ffffff',
		text: '#1a1a1a',
		accent: '#3b82f6',
		card: '#f8f9fa',
		style: 'minimal',
	},
	{
		name: 'Minimal Dark',
		background: '#1a1a1a',
		text: '#ffffff',
		accent: '#60a5fa',
		card: '#2d2d2d',
		style: 'minimal',
	},
	{
		name: 'Glass Countdown',
		background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
		text: '#ffffff',
		accent: '#f97316',
		card: 'rgba(255, 255, 255, 0.1)',
		style: 'glass',
	},
	{
		name: 'Modern Blocks',
		background: '#1e293b',
		text: '#e2e8f0',
		accent: '#22c55e',
		card: '#334155',
		style: 'blocks',
	},
	{
		name: 'Neon Glow',
		background: '#000000',
		text: '#ffffff',
		accent: '#f0427c',
		card: '#1a1a1a',
		style: 'neon',
	},
	{
		name: 'Hologram',
		background: '#000B18',
		text: '#00fff2',
		accent: '#00fff2',
		card: 'rgba(0, 255, 242, 0.1)',
		style: 'hologram',
	},
	{
		name: 'Gradient Flow',
		background: 'linear-gradient(45deg, #654ea3, #da98b4)',
		text: '#ffffff',
		accent: '#ffffff',
		card: 'rgba(255, 255, 255, 0.1)',
		style: 'gradient',
	},
	{
		name: 'Matrix Code',
		background: '#000000',
		text: '#00ff00',
		accent: '#00ff00',
		card: '#0a0a0a',
		style: 'matrix',
	},
];

export const getStoredTheme = (): Theme => {
	const storedTheme = localStorage.getItem('theme');
	return storedTheme ? JSON.parse(storedTheme) : predefinedThemes[0];
};
