import { useEffect, useState, useMemo } from "react";

type TimeRemaining = {
	totalMs: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

function getUpcomingWeddingDate() {
	const now = new Date();
	const year = now.getFullYear();

	let target = new Date(year, 3, 11, 0, 0, 0); // April = 3

	if (now > target) {
		target = new Date(year + 1, 3, 2, 0, 0, 0);
	}

	return target;
}

function getTimeRemaining(target: Date) {
	const diff = target.getTime() - new Date().getTime();

	if (diff <= 0) return null;

	return {
		totalMs: diff,
		days: Math.floor(diff / (1000 * 60 * 60 * 24)),
		hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((diff / (1000 * 60)) % 60),
		seconds: Math.floor((diff / 1000) % 60),
	};
}

export function useWeddingDateCountdown() {
	const [timeLeft, setTimeLeft] = useState<TimeRemaining | null>(null);

	useEffect(() => {
		const target = getUpcomingWeddingDate();

		// set initial value on mount
		setTimeLeft(getTimeRemaining(target));

		const id = window.setInterval(() => {
			setTimeLeft(getTimeRemaining(target));
		}, 1000);

		return () => clearInterval(id);
	}, []);

	return timeLeft;
}
