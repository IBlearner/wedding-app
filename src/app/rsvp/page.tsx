"use client";
import React, { useEffect, useState } from "react";
import { guestList } from "@/data/constants";
import { capitaliseString } from "@/helpers/stringUtils";
import "./styles.scss";
import { MoveRight } from "lucide-react";

export default function RSVP() {
	// Raw input value
	const [search, setSearch] = useState<string>("");
	// Guest data
	const [guestId, setGuestId] = useState<number>(0);
	const [guestFullName, setGuestFullName] = useState<string>(""); // Only used to display their name
	const [isAttending, setIsAttending] = useState<boolean>(false);
	// Guest diet data
	const [needsDietChange, setNeedsDietChange] = useState<boolean>(false);
	const [vegetarian, setVegetarian] = useState<boolean>(false);
	const [vegan, setVegan] = useState<boolean>(false);
	const [dairy, setDairy] = useState<boolean>(false);
	const [gluten, setGluten] = useState<boolean>(false);
	const [needsOtherDietChange, setNeedsOtherDietChange] = useState<boolean>(false);
	const [other, setOther] = useState<string>("");
	// Error triggers
	const [guestAlreadyResponded, setGuestAlreadyResponded] = useState<boolean>(false);
	const [searchError, setSearchError] = useState<boolean>(false);
	const [otherError, setOtherError] = useState<boolean>(false);
	// Page state
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isThankyouMessage, setIsThankyouMessage] = useState<boolean>(false);

	useEffect(() => {
		if (!needsDietChange) {
			resetDietryData();
		}
	}, [needsDietChange]);

	const resetErrors = () => {
		setSearchError(false);
		setGuestAlreadyResponded(false);
		setOtherError(false);
	};

	const resetDietryData = () => {
		setVegetarian(false);
		setVegan(false);
		setDairy(false);
		setGluten(false);
		setNeedsOtherDietChange(false);
		setOther("");
	};

	const resetMostData = () => {
		setIsAttending(false);
		resetDietryData();
		// Reset errors
		resetErrors();
	};

	const resetAllData = () => {
		setGuestId(0);
		setGuestFullName("");
		setIsThankyouMessage(false);
		resetMostData();
	};

	const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		// TODO: reset error messages after user types
		setSearch(event.target.value);
	};

	const handleSearchSubmit = async (event: React.FormEvent<HTMLElement>) => {
		event.preventDefault();

		// Ensure everything is reset
		resetAllData();
		// Set page as loading
		setIsLoading(true);

		const guest = guestList.find((guest) => {
			const guestFullName = `${guest.fName} ${guest.lName}`.toLowerCase();
			return guestFullName.includes(search.toLowerCase());
		});

		// If guest is found, initialise everything to default values
		if (guest) {
			setGuestId(guest.id);
			setGuestFullName(`${capitaliseString(guest.fName)} ${capitaliseString(guest.lName)}`);

			// Check if user has already responded
			const res = await fetch(`/api/rsvp?id=${guest.id}`);
			const data = await res.json();

			// If they have, show blocked content
			if (data.responded) {
				setGuestAlreadyResponded(true);
			}
		} else {
			setGuestId(0);
			setGuestFullName("");
			setSearchError(true);
		}

		setIsLoading(false);
	};

	const handleDietryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		setOther(event.target.value);
	};

	const handleRsvpSubmit = async (event: React.FormEvent<HTMLElement>) => {
		event.preventDefault();

		const response = isAttending
			? {
					id: guestId,
					needsDietChange: needsDietChange,
					vegetarian: vegetarian,
					vegan: vegan,
					dairy: dairy,
					gluten: gluten,
					other: other
			  }
			: { id: guestId };

		const res = await fetch("/api/rsvp", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(response)
		});

		if (res.ok) {
			setIsThankyouMessage(true);
		} else {
			setOtherError(true);
		}
	};

	const isGuestListSearchDisabled = () => {
		// If the term is empty, or shorter than 4 chars
		return search.trim() === "" || search.length <= 3;
	};

	const guestListSearch = () => {
		return (
			<form id="page-rsvp-name-search" onSubmit={handleSearchSubmit}>
				<label id="name-search-label" htmlFor="name-search"></label>
				<input id="name-search" type="text" onChange={handleSearchInput} placeholder="Enter your name" />
				<button className="page-rsvp-name-search-button" type="submit" disabled={isGuestListSearchDisabled()}>
					<MoveRight />
				</button>
			</form>
		);
	};

	const yesNoButtons = (state: boolean, noAction: () => void, yesAction: () => void) => {
		return (
			<div className="yes-no-buttons">
				<button className={!state ? "selected" : ""} onClick={() => noAction()} type="button">
					No
				</button>
				<button className={state ? "selected" : ""} onClick={() => yesAction()} type="button">
					Yes
				</button>
			</div>
		);
	};

	const sectionAttendance = () => {
		return (
			<fieldset className="rsvp-fieldset section-attendance">
				<legend>Will you be attending?</legend>
				{yesNoButtons(
					isAttending,
					() => setIsAttending(false),
					() => setIsAttending(true)
				)}
			</fieldset>
		);
	};

	const sectionDietry = () => {
		return (
			<fieldset className="rsvp-fieldset section-dietry">
				<legend>Do you have any dietry requirements?</legend>
				{yesNoButtons(
					needsDietChange,
					() => setNeedsDietChange(false),
					() => setNeedsDietChange(true)
				)}
			</fieldset>
		);
	};

	const sectionDietrySelections = () => {
		return (
			<fieldset className="rsvp-fieldset section-dietry-selections">
				<legend>Select dietary preferences:</legend>
				<input
					type="checkbox"
					id="vegetarian"
					name="preferences"
					value="vegetarian"
					onChange={(e) => setVegetarian(e.target.checked)}
				/>
				<label htmlFor="vegetarian">Vegetarian</label>
				<br />
				<input
					type="checkbox"
					id="vegan"
					name="preferences"
					value="vegan"
					onChange={(e) => setVegan(e.target.checked)}
				/>
				<label htmlFor="vegan">Vegan</label>
				<br />
				<input
					type="checkbox"
					id="dairy"
					name="preferences"
					value="dairy"
					onChange={(e) => setDairy(e.target.checked)}
				/>
				<label htmlFor="dairy">Dairy</label>
				<br />
				<input
					type="checkbox"
					id="gluten"
					name="preferences"
					value="gluten"
					onChange={(e) => setGluten(e.target.checked)}
				/>
				<label htmlFor="gluten">Gluten</label>
				<br />
				<input
					type="checkbox"
					id="other"
					name="preferences"
					value="other"
					onChange={(e) => setNeedsOtherDietChange(e.target.checked)}
				/>
				<label htmlFor="other">Other</label>
			</fieldset>
		);
	};

	const sectionNeedsOther = () => {
		return (
			<fieldset className="rsvp-fieldset section-other">
				<legend>Specify other dietry requirements.</legend>
				<input
					id="other-dietry-requirements"
					type="text"
					onChange={handleDietryInput}
					placeholder="Enter your requirements"
				/>
			</fieldset>
		);
	};

	const getContent = () => {
		if (searchError) {
			return <div id="page-rsvp-name-search-error">Could not find you. Please try again.</div>;
		} else if (guestAlreadyResponded) {
			return (
				<div id="page-rsvp-name-search-error">
					You have already responded. If this is wrong, please contact the couple.
				</div>
			);
		} else if (otherError) {
			return <div id="page-rsvp-name-search-error">Error saving your RSVP. Please try again later.</div>;
		} else if (isThankyouMessage) {
			return <div>Thank you for responding.</div>;
		} else if (guestFullName) {
			return (
				<>
					<h2 className="page-rsvp-title">Hello {guestFullName}</h2>
					<form className="page-rsvp-form" onSubmit={handleRsvpSubmit}>
						{sectionAttendance()}
						{isAttending ? sectionDietry() : null}
						{isAttending && needsDietChange ? sectionDietrySelections() : null}
						{isAttending && needsDietChange && needsOtherDietChange ? sectionNeedsOther() : null}
						<button type="submit" className="page-rsvp-submit-button">
							Submit
						</button>
					</form>
				</>
			);
		} else {
			return <div>Please search for your name.</div>;
		}
	};

	return (
		<>
			<h1 className="page-title">RSVP</h1>
			<div className="page-rsvp">
				{guestListSearch()}
				{!isLoading ? getContent() : null}
			</div>
		</>
	);
}
