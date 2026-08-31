import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { getSchools } from './api';
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
	const [schools, setSchools] = useState<string[] | null>(null);

	useEffect(() => {
		getSchools().then((list) => setSchools(list.map(({ id }) => `/${id}`)));
	}, []);

	useEffect(() => {
		if (!schools) return;
		const firstSchool = schools[0];
		const storedSchool = localStorage.getItem('selectedSchool');

		if (location.pathname === '/' && firstSchool) {
			localStorage.setItem('selectedSchool', firstSchool.replace('/', ''));
			navigate(firstSchool, { replace: true });
			return;
		}

		if (schools.includes(location.pathname) && storedSchool !== location.pathname.replace('/', '')) {
			localStorage.setItem('selectedSchool', location.pathname.replace('/', ''));
		}
	}, [location.pathname, navigate, schools]);

	if (!schools) return null;

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
