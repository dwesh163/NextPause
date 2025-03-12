import { Theme } from '../../types/types';

interface TimeProps {
	time: { hours: number; minutes: number; seconds: number };
	theme: Theme;
}

export default function GradientTimer({ time, theme }: TimeProps) {
	return (
		<div className="relative p-12 rounded-2xl overflow-hidden">
			<div
				className="absolute inset-0"
				style={{
					background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))',
					backdropFilter: 'blur(10px)',
					borderRadius: '1rem',
				}}
			/>
			<div className="relative flex gap-12">
				<TimeUnit value={time.hours} label="heures" theme={theme} />
				<TimeUnit value={time.minutes} label="minutes" theme={theme} />
				<TimeUnit value={time.seconds} label="secondes" theme={theme} />
			</div>
		</div>
	);
}

function TimeUnit({ value, label }: { value: number; label: string; theme: Theme }) {
	return (
		<div className="flex flex-col items-center">
			<div
				className="text-7xl font-bold"
				style={{
					background: 'linear-gradient(to bottom right, #ffffff, rgba(255,255,255,0.7))',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))',
				}}>
				{value.toString().padStart(2, '0')}
			</div>
			<div className="mt-3 text-sm uppercase tracking-wider opacity-80">{label}</div>
		</div>
	);
}
