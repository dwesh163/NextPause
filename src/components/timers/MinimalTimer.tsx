import { Theme } from '../../types/types';

interface TimeProps {
	time: { hours: number; minutes: number; seconds: number };
	theme: Theme;
}

export default function MinimalTimer({ time, theme }: TimeProps) {
	return (
		<div className="flex items-center gap-8">
			<TimeUnit value={time.hours} label="heures" theme={theme} />
			<div className="text-6xl -mt-6" style={{ color: theme.accent }}>
				:
			</div>
			<TimeUnit value={time.minutes} label="minutes" theme={theme} />
			<div className="text-6xl -mt-6" style={{ color: theme.accent }}>
				:
			</div>
			<TimeUnit value={time.seconds} label="secondes" theme={theme} />
		</div>
	);
}

function TimeUnit({ value, label }: { value: number; label: string; theme: Theme }) {
	return (
		<div className="flex flex-col items-center">
			<div className="text-7xl font-light mb-2">{value.toString().padStart(2, '0')}</div>
			<div className="text-sm opacity-60">{label}</div>
		</div>
	);
}
