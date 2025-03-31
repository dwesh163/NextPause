import { useEffect, useState } from 'react';
import time from '../assets/time.json';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { TimeObject, Theme } from '../types/types';
import ThemeSelector from '../components/ThemeSelector';
import { getStoredTheme } from '../utils/themes';

export default function Layout() {
	const navigate = useNavigate();
	const location = useLocation();

	const getInitialSchool = () => {
		const urlPath = location.pathname.split('/')[1];
		if (urlPath && urlPath in time) return urlPath;
		const storedSchool = localStorage.getItem('selectedSchool');
		if (storedSchool && time[storedSchool as keyof typeof time]) return storedSchool;
		return 'epsic';
	};

	const [selectedSchool, setSelectedSchool] = useState<string | null>(getInitialSchool());
	const [theme, setTheme] = useState<Theme>(getStoredTheme());
	const [showSidebar, setShowSidebar] = useState(false);
	const [scale, setScale] = useState(() => {
		const savedScale = localStorage.getItem('timerScale');
		return savedScale ? parseFloat(savedScale) : 2.5;
	});

	const handleThemeChange = (newTheme: Theme) => {
		setTheme(newTheme);
		localStorage.setItem('theme', JSON.stringify(newTheme));
	};

	const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newScale = parseFloat(e.target.value);
		setScale(newScale);
		localStorage.setItem('timerScale', newScale.toString());
	};

	useEffect(() => {
		if (selectedSchool) {
			localStorage.setItem('selectedSchool', selectedSchool);
			navigate(`/${selectedSchool}`);
		}
	}, [selectedSchool, navigate]);

	return (
		<main
			style={{
				background: theme.background,
				color: theme.text,
				height: '100vh',
				width: '100vw',
				overflow: 'hidden',
				position: 'relative',
				transition: 'all 0.3s ease',
			}}>
			<button className="fixed top-4 right-4 z-50 text-lg opacity-70 hover:opacity-100 transition-opacity" onClick={() => setShowSidebar(!showSidebar)} style={{ color: theme.accent }}>
				{showSidebar ? '✕' : '⚙️'}
			</button>

			<div className="h-full w-full">
				<div className="h-full w-full" style={{ backgroundColor: theme.card, borderRadius: '12px' }}>
					<Outlet context={{ theme, scale }} />
				</div>
			</div>

			<div className={`fixed top-0 right-0 h-full sm:w-1/3 lg:w-1/5 w-full bg-black bg-opacity-80 p-6 transform transition-transform duration-300 ease-in-out ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`} style={{ boxShadow: `-4px 0 10px rgba(0, 0, 0, 0.2)`, zIndex: 40 }}>
				<div className="h-full flex flex-col">
					<h3 className="text-white text-lg font-medium mb-6 mt-10">Settings</h3>

					<div className="mb-6">
						<label className="block text-white text-sm mb-2">School</label>
						<select value={selectedSchool ?? ''} onChange={(e) => setSelectedSchool(e.target.value)} className="w-full bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-opacity-50" style={{ borderColor: theme.accent }}>
							{Object.keys(time).map((school) => (
								<option key={school} value={school}>
									{(time as TimeObject)[school].name}
								</option>
							))}
						</select>
					</div>

					<div className="mb-6">
						<label className="block text-white text-sm mb-2">Timer Size: {scale.toFixed(1)}x</label>
						<input type="range" min="1" max="4" step="0.1" value={scale} onChange={handleScaleChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" style={{ accentColor: theme.accent }} />
					</div>

					<div className="flex-grow">
						<label className="block text-white text-sm mb-2">Theme</label>
						<ThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} />
					</div>
				</div>
			</div>
		</main>
	);
}
