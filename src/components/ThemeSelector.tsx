import { Theme } from '../types/types';
import { predefinedThemes } from '../utils/themes';

interface ThemeSelectorProps {
	currentTheme: Theme;
	onThemeChange: (theme: Theme) => void;
}

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
	return (
		<div className="flex flex-col gap-2 h-[calc(100vh-22rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 overflow-x-hidden">
			{predefinedThemes.map((theme) => (
				<button
					key={theme.name}
					className="p-2 rounded transition-transform hover:scale-101 focus:outline-none"
					style={{
						background: theme.background,
						border: theme.name === currentTheme.name ? `2px solid ${theme.accent}` : '2px solid transparent',
					}}
					onClick={() => onThemeChange(theme)}
					title={theme.name}>
					<div className="h-12 rounded flex items-end p-2" style={{ background: theme.card }}>
						<div className="w-full h-2 rounded" style={{ backgroundColor: theme.accent }} />
					</div>
				</button>
			))}
		</div>
	);
}
