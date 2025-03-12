import { Theme } from '../../types/types';

interface TimeProps {
	time: { hours: number; minutes: number; seconds: number };
	theme: Theme;
}

export default function BasicTimer({ time, theme }: TimeProps) {
	return (
		<div className="flex gap-8">
			<TimeUnit value={time.hours} label="heures" theme={theme} />
			<TimeUnit value={time.minutes} label="minutes" theme={theme} />
			<TimeUnit value={time.seconds} label="secondes" theme={theme} />
		</div>
	);
}

function TimeUnit({ value }: { value: number; label: string; theme: Theme }) {
	return (
		<div className="flex flex-col items-center">
			<div className="text-7xl font-bold mb-3">{value.toString().padStart(2, '0')}</div>
		</div>
	);
}
