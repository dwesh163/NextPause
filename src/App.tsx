import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import timeData from './assets/time.json';
import Layout from './pages/layout';
import Main from './pages/main';
import NoPage from './pages/noPage';

export default function App() {
	return (
		<BrowserRouter basename="/NextPause">
			<AppRoutes />
		</BrowserRouter>
	);
}

function AppRoutes() {
	const navigate = useNavigate();
	const location = useLocation();

	const schools = Object.keys(timeData).map((school) => `/${school}`);
	const firstSchool = schools[0];

	useEffect(() => {
		const storedSchool = localStorage.getItem('selectedSchool');

		if (location.pathname === '/' && firstSchool) {
			localStorage.setItem('selectedSchool', firstSchool.replace('/', ''));
			navigate(firstSchool, { replace: true });
			return;
		}

		if (schools.includes(location.pathname) && storedSchool !== location.pathname.replace('/', '')) {
			localStorage.setItem('selectedSchool', location.pathname.replace('/', ''));
		}
	}, [location.pathname, navigate, firstSchool, schools]);

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{schools.map((schoolPath) => (
					<Route key={schoolPath} path={schoolPath.substring(1)} element={<Main />} />
				))}
			</Route>
			<Route path="*" element={<NoPage />} />
		</Routes>
	);
}
