"use client";
import React, { useEffect, useState } from "react";
import { guestList } from "@/data/constants";
import { capitaliseString } from "@/helpers/stringUtils";
import "./styles.scss";

export default function RSVP() {
	const [search, setSearch] = useState<string>("");
	const [guestId, setGuestId] = useState<number>(0);
	const [guestFullName, setGuestFullName] = useState<string>("mark mendoza"); // Only used to display their name
	const [error, setError] = useState<boolean>(false);
	const [isAttending, setIsAttending] = useState<boolean>(false);
	const [needsDietChange, setNeedsDietChange] = useState<boolean>(false);
	const [vegetarian, setVegetarian] = useState<boolean>(false);
	const [vegan, setVegan] = useState<boolean>(false);
	const [dairy, setDairy] = useState<boolean>(false);
	const [gluten, setGluten] = useState<boolean>(false);
	const [needsOtherDietChange, setNeedsOtherDietChange] = useState<boolean>(false);
	const [other, setOther] = useState<string>("");

	useEffect(() => {
		if (!needsDietChange) {
			setVegetarian(false);
			setVegan(false);
			setDairy(false);
			setGluten(false);
			setNeedsOtherDietChange(false);
			setOther("");
		}
	}, [needsDietChange]);

	const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const handleSearchSubmit = (event: React.FormEvent<HTMLElement>) => {
		event.preventDefault();

		const guest = guestList.find((guest) => {
			const guestFullName = `${guest.fName} ${guest.lName}`;
			return guestFullName.includes(search);
		});

		if (guest) {
			setGuestId(guest.id);
			setGuestFullName(`${capitaliseString(guest.fName)} ${capitaliseString(guest.lName)}`);
			setError(false);
		} else {
			setGuestId(0);
			setGuestFullName("");
			setError(true);
		}
	};

	const handleDietryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		setOther(event.target.value);
	};

	const handleRsvpSubmit = (event: React.FormEvent<HTMLElement>) => {
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
			: {};
		console.log(response);
	};

	const isGuestListSearchDisabled = () => {
		// If the term is empty, or shorter than 4 chars
		return search.trim() === "" || search.length <= 3;
	};

	const guestListSearch = () => {
		return (
			<form className="page-rsvp-name-search" onSubmit={handleSearchSubmit}>
				<label htmlFor="guestlist-search"></label>
				<input id="guestlist-search" type="text" onChange={handleSearchInput} placeholder="Enter your name" />
				<button type="submit" disabled={isGuestListSearchDisabled()}>
					Search
				</button>
				<div>{error ? "Could not find you. Please try again." : null}</div>
			</form>
		);
	};

	const yesNoButtons = (state: boolean, noAction: () => void, yesAction: () => void) => {
		return (
			<div className="yes-no-buttons">
				<button className={!state ? "selected" : ""} onClick={() => noAction()}>
					No
				</button>
				<button className={state ? "selected" : ""} onClick={() => yesAction()}>
					Yes
				</button>
			</div>
		);
	};

	const sectionAttendance = () => {
		return (
			<fieldset className="attendance-fieldset">
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
			<fieldset>
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
			<fieldset className="section-dietry-selections">
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
			<fieldset>
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

	return (
		<div className="page-rsvp">
			<h1 className="page-rsvp-title">RSVP</h1>
			{guestListSearch()}
			{guestFullName ? (
				<>
					<h2 className="page-rsvp-title">Hello {guestFullName}</h2>
					<form className="page-rsvp-form" onSubmit={handleRsvpSubmit}>
						{sectionAttendance()}
						{isAttending ? (
							sectionDietry()
						) : (
							<div>We are sorry you won&apos;t be able to join us on this day.</div>
						)}
						{isAttending && needsDietChange ? sectionDietrySelections() : null}
						{isAttending && needsDietChange && needsOtherDietChange ? sectionNeedsOther() : null}
						<button type="submit" className="page-rsvp-submit-button">
							Submit
						</button>
					</form>
				</>
			) : null}
		</div>
	);
}
