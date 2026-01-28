"use client";
import React, { useEffect, useState } from "react";
import { guestList } from "@/data/constants";
import { capitaliseString } from "@/helpers/stringUtils";
import "./styles.scss";
import { MoveRight, LoaderCircle } from "lucide-react";

export default function RSVP() {
	// Raw input value
	const [search, setSearch] = useState<string>("");
	// Guest data
	const [guestId, setGuestId] = useState<number>(0);
	const [guestFullName, setGuestFullName] = useState<string>(""); // Only used to display their name
	// Guest details
	const [isAttending, setIsAttending] = useState<boolean>(false);
	const [dietryReqs, setDietryReqs] = useState<string>("");
	const [isPerforming, setIsPerforming] = useState<boolean>(false);
	// Error triggers
	const [guestAlreadyResponded, setGuestAlreadyResponded] = useState<boolean>(false);
	const [searchError, setSearchError] = useState<boolean>(false);
	const [otherError, setOtherError] = useState<boolean>(false);
	// Page state
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isThankyouMessage, setIsThankyouMessage] = useState<boolean>(false);

	// Reset input data on attendance switch
	useEffect(() => {
		setDietryReqs("");
		setIsPerforming(false);
	}, [isAttending]);

	// Reset guest
	const resetGuest = () => {
		setGuestId(0);
		setGuestFullName("");
	};

	// Reset guest details
	const resetGuestDetails = () => {
		setIsAttending(false);
		setDietryReqs("");
		setIsPerforming(false);
	};

	// Reset errors
	const resetErrors = () => {
		setSearchError(false);
		setGuestAlreadyResponded(false);
		setOtherError(false);
	};

	// Reset page states
	const resetPageStates = () => {
		setIsLoading(false);
		setIsThankyouMessage(false);
	};

	const resetAllData = () => {
		// Reset guest
		resetGuest();
		// Reset guest details
		resetGuestDetails();
		// Reset errors
		resetErrors();
		// Reset page states
		resetPageStates();
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

			console.log(data);

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

	const handleRsvpSubmit = async (event: React.FormEvent<HTMLElement>) => {
		event.preventDefault();

		const response = {
			id: guestId,
			isAttending: isAttending,
			dietryReqs: dietryReqs,
			isPerforming: isPerforming
		};

		const res = await fetch("/api/rsvp", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(response)
		});
		console.log(response);

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

	// const yesNoButtons = (state: boolean, noAction: () => void, yesAction: () => void) => {
	// 	return (
	// 		<div className="yes-no-buttons">
	// 			<button className={!state ? "selected" : ""} onClick={() => noAction()} type="button">
	// 				No
	// 			</button>
	// 			<button className={state ? "selected" : ""} onClick={() => yesAction()} type="button">
	// 				Yes
	// 			</button>
	// 		</div>
	// 	);
	// };

	const sectionAttendance = () => {
		return (
			<fieldset className="rsvp-fieldset fieldset-attendance">
				<legend>Will you be attending the wedding?</legend>
				<div className="rsvp-fieldset-options">
					<label htmlFor="attendance">
						<span>Yes</span>
						<input
							type="radio"
							name="attendance"
							value="yes"
							checked={isAttending}
							onChange={() => setIsAttending(true)}
						/>
					</label>
					<label htmlFor="attendance">
						<span>No</span>
						<input
							type="radio"
							name="attendance"
							value="no"
							checked={!isAttending}
							onChange={() => setIsAttending(false)}
						/>
					</label>
				</div>
			</fieldset>
		);
	};

	const sectionDietryReqs = () => {
		return (
			<fieldset className="rsvp-fieldset fieldset-attendance">
				<legend>Please specify any dietry requirements.</legend>
				<label htmlFor="dietry-reqs">
					<input
						type="text"
						placeholder="Please let us know what you cannot consume."
						name="dietry-reqs"
						value={dietryReqs}
						onChange={(e) => setDietryReqs(e.target.value)}
					/>
				</label>
			</fieldset>
		);
	};

	const sectionPerformance = () => {
		return (
			<fieldset className="rsvp-fieldset fieldset-performance">
				<legend>Would you like to contribute a performance?</legend>
				<div className="rsvp-fieldset-options">
					<label htmlFor="performing">
						<span>Yes</span>
						<input
							type="radio"
							name="performing"
							value="yes"
							checked={isPerforming}
							onChange={() => setIsPerforming(true)}
						/>
					</label>
					<label htmlFor="performing">
						<span>No</span>
						<input
							type="radio"
							name="performing"
							value="no"
							checked={!isPerforming}
							onChange={() => setIsPerforming(false)}
						/>
					</label>
				</div>
			</fieldset>
		);
	};

	const getContent = () => {
		if (searchError) {
			return <div id="page-rsvp-name-search-error">Could not find you. Please try again.</div>;
		} else if (guestAlreadyResponded) {
			return (
				<div id="page-rsvp-name-search-error">
					You have already responded. If you wish to amend your response, please contact the couple.
				</div>
			);
		} else if (otherError) {
			return <div id="page-rsvp-name-search-error">Error saving your RSVP. Please try again later.</div>;
		} else if (guestFullName) {
			return (
				<>
					<h2 className="page-rsvp-title">Hello {guestFullName}</h2>
					<form className="page-rsvp-form" onSubmit={handleRsvpSubmit}>
						{sectionAttendance()}
						{isAttending ? sectionDietryReqs() : null}
						{isAttending ? sectionPerformance() : null}
						{isPerforming ? (
							<div>Fantastic! Please reach out to Samantha to organise your performance.</div>
						) : null}
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
			<div className={`page-rsvp ${isThankyouMessage ? "hidden" : ""}`}>
				{guestListSearch()}
				{!isLoading ? (
					getContent()
				) : (
					<div>
						<LoaderCircle className="page-rsvp-loader" size="48px" color="var(--mocha)" />
					</div>
				)}
			</div>
			<div className={`page-rsvp page-rsvp-thankyou ${isThankyouMessage ? "visible" : ""}`}>
				Thank you for responding.
			</div>
		</>
	);
}
