import { Theme } from '../../types/types';

interface TimeProps {
	time: { hours: number; minutes: number; seconds: number };
	theme: Theme;
}

export default function BlocksTimer({ time, theme }: TimeProps) {
	return (
		<div className="flex gap-6">
			<TimeUnit value={time.hours} label="heures" theme={theme} />
			<TimeUnit value={time.minutes} label="minutes" theme={theme} />
			<TimeUnit value={time.seconds} label="secondes" theme={theme} />
		</div>
	);
}

function TimeUnit({ value, label, theme }: { value: number; label: string; theme: Theme }) {
	return (
		<div className="flex flex-col items-center">
			<div
				className="text-5xl font-bold rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform"
				style={{
					background: theme.accent,
					color: theme.background,
				}}>
				{value.toString().padStart(2, '0')}
			</div>
			<div className="mt-3 text-sm uppercase tracking-wide opacity-70">{label}</div>
		</div>
	);
}
