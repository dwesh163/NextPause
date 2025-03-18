import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import timeData from '../assets/time.json';
import { School, Theme } from '../types/types';
import FlipClock from '../components/timers/FlipClock';
import MinimalTimer from '../components/timers/MinimalTimer';
import GlassTimer from '../components/timers/GlassTimer';
import BlocksTimer from '../components/timers/BlocksTimer';
import NeonTimer from '../components/timers/NeonTimer';
import HologramTimer from '../components/timers/HologramTimer';
import GradientTimer from '../components/timers/GradientTimer';
import MatrixTimer from '../components/timers/MatrixTimer';
import BasicTimer from '../components/timers/BasicTimer';

export default function Main() {
	const { theme, scale } = useOutletContext<{ theme: Theme; scale: number }>();
	const selectedSchool = localStorage.getItem('selectedSchool') as keyof typeof timeData | null;
	const [school, setSchool] = useState<School>(selectedSchool ? timeData[selectedSchool] : ({} as School));
	const [timeUntilNextEvent, setTimeUntilNextEvent] = useState<Date>(new Date());
	const [text, setText] = useState<string>('');
	const [currentTime, setCurrentTime] = useState<Date>(new Date());
	const [noMoreEvents, setNoMoreEvents] = useState(false);
	const [mobileScale, setMobileScale] = useState(scale);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);
		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		if (school && school.time) {
			const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
			const nextTime = school.time.find((t) => {
				const [hours, minutes] = t.split(':').map(Number);
				return hours * 60 + minutes > currentMinutes;
			});

			if (nextTime) {
				setNoMoreEvents(false);
				const [nextHours, nextMinutes] = nextTime.split(':').map(Number);
				const nextEventDate = new Date(currentTime);
				nextEventDate.setHours(nextHours, nextMinutes, 0, 0);
				setTimeUntilNextEvent(nextEventDate);

				if (school.text) {
					setText(school.text[school.time.indexOf(nextTime)]);
				} else {
					setText('');
				}
			} else {
				setNoMoreEvents(true);
				setText('No more events today');
				setTimeUntilNextEvent(new Date());
			}
		}
	}, [currentTime, school]);

	useEffect(() => {
		if (selectedSchool) {
			setSchool(timeData[selectedSchool]);
		}
	}, [selectedSchool]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 640) {
				setMobileScale(scale / 3);
			} else {
				setMobileScale(scale);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, [scale]);

	const calculateTimeRemaining = (eventDate: Date) => {
		const now = new Date();
		const difference = eventDate.getTime() - now.getTime();
		if (difference <= 0) return null;
		const hours = Math.floor(difference / (1000 * 60 * 60));
		const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((difference % (1000 * 60)) / 1000);
		return { hours, minutes, seconds };
	};

	const timeRemaining = calculateTimeRemaining(timeUntilNextEvent);

	if (noMoreEvents || !timeRemaining) {
		return (
			<div className="h-full w-full flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-center text-center px-8" style={{ transform: `scale(${mobileScale})` }}>
					<h2 className="text-4xl font-bold mb-4" style={{ color: theme.accent }}>
						Fin de journée
					</h2>
					<p className="mt-6 text-xl opacity-25" style={{ color: theme.text }}>
						{new Date().toLocaleDateString('fr-FR', {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						})}
					</p>
				</div>
			</div>
		);
	}

	const renderTimer = () => {
		switch (theme.style) {
			case 'basic':
				return <BasicTimer time={timeRemaining} theme={theme} />;
			case 'flip':
				return <FlipClock time={timeRemaining} theme={theme} />;
			case 'minimal':
				return <MinimalTimer time={timeRemaining} theme={theme} />;
			case 'glass':
				return <GlassTimer time={timeRemaining} theme={theme} />;
			case 'blocks':
				return <BlocksTimer time={timeRemaining} theme={theme} />;
			case 'neon':
				return <NeonTimer time={timeRemaining} theme={theme} />;
			case 'hologram':
				return <HologramTimer time={timeRemaining} theme={theme} />;
			case 'gradient':
				return <GradientTimer time={timeRemaining} theme={theme} />;
			case 'matrix':
				return <MatrixTimer time={timeRemaining} theme={theme} />;
			default:
				return <MinimalTimer time={timeRemaining} theme={theme} />;
		}
	};

	return (
		<div className="h-full w-full flex flex-col items-center justify-center">
			<div className="flex flex-col items-center justify-center" style={{ transform: `scale(${mobileScale})` }}>
				<h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: theme.text, fontFamily: 'Arial' }}>
					{text ? text : 'Prochaine sonnerie dans :'}
				</h2>
				<div className="timer-container">{renderTimer()}</div>
			</div>
		</div>
	);
}
