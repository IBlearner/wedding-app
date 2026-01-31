"use client";
import { useEffect, useState } from "react";

type Guest = {
	id: string;
	guestFullName: string;
	isAttending: boolean;
	dietryReqs: string;
	isPerforming: boolean;
};

export default function Guests() {
	const [guests, setGuests] = useState<Guest[]>([]);

	useEffect(() => {
		const fetchGuestList = async () => {
			try {
				const res = await fetch("/api/guests");
				const data = await res.json();
				setGuests(data.message);
			} catch (err) {
				console.error("Failed to fetch guest list", err);
			}
		};

		fetchGuestList();
	}, []);

	const mapGuests = () => {
		return guests.map((guest) => {
			return (
				<div key={guest?.id}>
					{guest?.guestFullName}: {guest.isAttending ? "Yes" : "No"}
				</div>
			);
		});
	};
	return <div>{mapGuests()}</div>;
}
