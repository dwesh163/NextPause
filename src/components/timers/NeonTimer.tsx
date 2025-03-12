import { Theme } from '../../types/types';

interface TimeProps {
	time: { hours: number; minutes: number; seconds: number };
	theme: Theme;
}

export default function NeonTimer({ time, theme }: TimeProps) {
	return (
		<div className="flex gap-8">
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
				className="text-7xl font-bold mb-3"
				style={{
					color: theme.accent,
					textShadow: `0 0 1px ${theme.accent}, 0 0 5px ${theme.accent}, 0 0 12px ${theme.accent}`,
				}}>
				{value.toString().padStart(2, '0')}
			</div>
			<div className="text-sm uppercase tracking-widest" style={{ color: theme.text }}>
				{label}
			</div>
		</div>
	);
}
