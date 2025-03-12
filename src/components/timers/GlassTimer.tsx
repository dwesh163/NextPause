import { Theme } from '../../types/types';

interface TimeProps {
	time: { hours: number; minutes: number; seconds: number };
	theme: Theme;
}

export default function GlassTimer({ time, theme }: TimeProps) {
	return (
		<div
			className="relative p-8 rounded-2xl backdrop-blur-xl"
			style={{
				background: 'rgba(255, 255, 255, 0.1)',
				border: '1px solid rgba(255, 255, 255, 0.2)',
			}}>
			<div className="flex gap-4 relative z-10">
				<TimeUnit value={time.hours} label="heures" theme={theme} />
				<TimeUnit value={time.minutes} label="minutes" theme={theme} />
				<TimeUnit value={time.seconds} label="secondes" theme={theme} />
			</div>
			<div
				className="absolute top-0 right-0 w-24 h-24 rounded-full"
				style={{
					background: theme.accent,
					filter: 'blur(60px)',
					opacity: 0.6,
				}}
			/>
		</div>
	);
}

function TimeUnit({ value, label }: { value: number; label: string; theme: Theme }) {
	return (
		<div className="flex flex-col items-center">
			<div className="text-6xl font-mono mb-2 p-4 rounded-lg" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
				{value.toString().padStart(2, '0')}
			</div>
			<div className="text-sm opacity-80">{label}</div>
		</div>
	);
}
