import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';

import { PostHogProvider } from 'posthog-js/react';

const options = {
	api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
};

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<PostHogProvider apiKey={import.meta.env.VITE_APP_PUBLIC_POSTHOG_KEY || ''} options={options}>
			<App />
		</PostHogProvider>
	</StrictMode>
);
