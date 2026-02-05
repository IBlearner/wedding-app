import { useEffect, useState, useMemo } from "react";

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
	const targetDate = useMemo(() => getUpcomingWeddingDate(), []);

	const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(targetDate));

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimeLeft(getTimeRemaining(targetDate));
		}, 1000);

		return () => clearInterval(intervalId);
	}, [targetDate]);

	return timeLeft;
}
