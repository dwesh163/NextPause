import { Theme } from '../../types/types';

interface TimeProps {
	time: { hours: number; minutes: number; seconds: number };
	theme: Theme;
}

export default function HologramTimer({ time, theme }: TimeProps) {
	return (
		<div>
			<div className="flex gap-8 relative">
				<TimeUnit value={time.hours} label="heures" theme={theme} />
				<TimeUnit value={time.minutes} label="minutes" theme={theme} />
				<TimeUnit value={time.seconds} label="secondes" theme={theme} />
			</div>
		</div>
	);
}

function TimeUnit({ value, label, theme }: { value: number; label: string; theme: Theme }) {
	return (
		<div className="flex flex-col items-center">
			<div
				className="text-8xl font-bold relative"
				style={{
					color: theme.accent,
					textShadow: `0 0 20px ${theme.accent}`,
					opacity: 0.8,
				}}>
				{value.toString().padStart(2, '0')}
			</div>
			<div className="mt-2 text-sm uppercase tracking-widest" style={{ color: theme.text, opacity: 0.6 }}>
				{label}
			</div>
		</div>
	);
}
