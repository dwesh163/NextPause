export type School = {
	name: string;
	time: string[];
	text?: string[];
};

export type TimeObject = {
	[key: string]: {
		name: string;
		time: string[];
	};
};

export type Theme = {
	name: string;
	background: string;
	text: string;
	accent: string;
	card: string;
	style: 'basic' | 'flip' | 'minimal' | 'glass' | 'blocks' | 'neon' | 'hologram' | 'gradient' | 'matrix';
};
