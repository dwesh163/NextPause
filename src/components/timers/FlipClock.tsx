import { Theme } from '../../types/types';

interface TimeProps {
	time: { hours: number; minutes: number; seconds: number };
	theme: Theme;
}

export default function FlipClock({ time, theme }: TimeProps) {
	return (
		<div className="flex gap-4">
			<FlipUnit value={time.hours} label="heures" theme={theme} />
			<FlipUnit value={time.minutes} label="minutes" theme={theme} />
			<FlipUnit value={time.seconds} label="secondes" theme={theme} />
		</div>
	);
}

function FlipUnit({ value, label, theme }: { value: number; label: string; theme: Theme }) {
	return (
		<div className="flex flex-col items-center">
			<div
				className="relative text-6xl font-mono rounded-lg overflow-hidden perspective"
				style={{
					background: theme.card,
					boxShadow: `0 10px 30px rgba(0,0,0,0.3)`,
					width: '120px',
					height: '140px',
				}}>
				<div className="absolute inset-0 flex items-center justify-center border-t border-opacity-20" style={{ borderColor: theme.accent }}>
					{value.toString().padStart(2, '0')}
				</div>
			</div>
			<div className="mt-4 text-lg opacity-60">{label}</div>
		</div>
	);
}
