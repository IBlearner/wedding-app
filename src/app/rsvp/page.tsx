"use client";
import React, { useState } from "react";
import { groupList } from "@/data/constants";
import "./styles.scss";
import { MoveRight, LoaderCircle, Minus, Plus } from "lucide-react";
import { Group } from "@/helpers/types";
import { Dancing_Script, Bodoni_Moda } from "next/font/google";

const DancingScript = Dancing_Script({
	weight: ["400"],
});

const Bodoni = Bodoni_Moda({
	weight: ["400", "700"],
});

export default function RSVP() {
	// Raw input value
	const [search, setSearch] = useState<string>("");
	// Group data
	const [groupCode, setGroupCode] = useState<number>(0);
	const [groupName, setGroupName] = useState<string>(""); // Only used to display their name
	// Group details
	// const [numAttending, setIsAttending] = useState<boolean>(false);
	const [groupSizeAttending, setGroupSizeAttending] = useState<number>(0);
	const [groupSize, setGroupSize] = useState<number>(0);
	const [dietryReqs, setDietryReqs] = useState<string>("");
	const [isPerforming, setIsPerforming] = useState<boolean>(false);
	// Error triggers
	const [groupAlreadyResponded, setGroupAlreadyResponded] = useState<boolean>(false);
	const [searchError, setSearchError] = useState<boolean>(false);
	const [otherError, setOtherError] = useState<boolean>(false);
	// Page state
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isThankyouMessage, setIsThankyouMessage] = useState<boolean>(false);

	// Reset group
	const resetGroup = () => {
		setGroupCode(0);
		setGroupName("");
	};

	// Reset group details
	const resetGroupDetails = () => {
		setGroupSizeAttending(0);
		setDietryReqs("");
		setIsPerforming(false);
	};

	// Reset errors
	const resetErrors = () => {
		setSearchError(false);
		setGroupAlreadyResponded(false);
		setOtherError(false);
	};

	// Reset page states
	const resetPageStates = () => {
		setIsLoading(false);
		setIsThankyouMessage(false);
	};

	const resetAllData = () => {
		// Reset group
		resetGroup();
		// Reset group details
		resetGroupDetails();
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

		const group = groupList.find((group) => {
			// Handle groups that have been assigned a number with 0
			const searchValue = search[0] === "0" ? "1" + search : search;
			const userSearch = parseInt(searchValue.toLowerCase().trim());
			return group.code === userSearch;
		});

		// If group is found, initialise everything to default values
		if (group) {
			setGroupCode(group.code);
			setGroupName(group.groupName);
			setGroupSize(group.groupAmt);

			// Check if user has already responded
			const res = await fetch(`/api/rsvp?code=${group.code}`);
			const data = await res.json();

			// If they have, show blocked content
			if (data.responded) {
				setGroupAlreadyResponded(true);
			}
		} else {
			setGroupCode(0);
			setGroupName("");
			setSearchError(true);
		}

		setIsLoading(false);
	};

	const handleRsvpSubmit = async (event: React.FormEvent<HTMLElement>) => {
		event.preventDefault();

		const response: Group = {
			code: groupCode,
			groupName: groupName,
			groupAmt: groupSizeAttending,
			dietryReqs: dietryReqs,
		};

		const res = await fetch("/api/rsvp", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(response),
		});

		if (res.ok) {
			setIsThankyouMessage(true);
		} else {
			setOtherError(true);
		}

		// Give focus to page title to get user to "thanks" message
		const titleElement = document.querySelector(".page-title") as HTMLElement;

		if (titleElement) {
			titleElement.scrollIntoView({ behavior: "smooth", block: "center" });
			titleElement.focus();
		}
	};

	const isGroupSearchDisabled = () => {
		// If the term is empty, or shorter than 4 chars
		return search.trim() === "" || search.length <= 3;
	};

	const groupListSearch = () => {
		return (
			<form id="page-rsvp-name-search" onSubmit={handleSearchSubmit}>
				<label id="name-search-label" htmlFor="name-search"></label>
				<input id="name-search" type="text" onChange={handleSearchInput} placeholder="Enter your 4 digit code" maxLength={4} />
				<button className="page-rsvp-name-search-button" type="submit" disabled={isGroupSearchDisabled()}>
					<MoveRight />
				</button>
			</form>
		);
	};

	const sectionAttendance = () => {
		if (groupSize === 1) {
			return (
				<fieldset className="rsvp-fieldset fieldset-attendance">
					<legend>Will you be attending?</legend>
					<div className="rsvp-fieldset-options">
						<label htmlFor="attendance">
							<span>Yes</span>
							<input type="radio" name="attendance" value="yes" checked={groupSizeAttending === 1} onChange={() => setGroupSizeAttending(1)} />
						</label>
						<label htmlFor="attendance">
							<span>No</span>
							<input type="radio" name="attendance" value="no" checked={groupSizeAttending === 0} onChange={() => setGroupSizeAttending(0)} />
						</label>
					</div>
				</fieldset>
			);
		} else {
			return (
				<fieldset className="rsvp-fieldset fieldset-attendance">
					<legend>How many of your group will be attending?</legend>
					<div className="rsvp-fieldset-up-down">
						<button type="button" className="rsvp-fieldset-up-down-buttons" onClick={() => setGroupSizeAttending(groupSizeAttending - 1)} disabled={groupSizeAttending < 1}>
							<Minus color="white" />
						</button>
						<div>{groupSizeAttending}</div>
						<button type="button" className="rsvp-fieldset-up-down-buttons" onClick={() => setGroupSizeAttending(groupSizeAttending + 1)} disabled={groupSizeAttending >= groupSize}>
							<Plus color="white" />
						</button>
					</div>
				</fieldset>
			);
		}
	};

	const sectionDietryReqs = () => {
		return (
			<fieldset className="rsvp-fieldset fieldset-dietry-reqs">
				<legend>{groupSize === 1 ? "Please specify your dietry requirements" : "Please specify any dietry requirements for your group"}</legend>
				<label htmlFor="dietry-reqs">
					<input type="text" placeholder="Enter requirements" name="dietry-reqs" value={dietryReqs} onChange={(e) => setDietryReqs(e.target.value)} />
				</label>
			</fieldset>
		);
	};

	const sectionPerformance = () => {
		return (
			<fieldset className="rsvp-fieldset fieldset-performance">
				<legend>{groupSize === 1 ? "Would you like to contribute a performance?" : "Would you or any in your group like to contribute a performance?"}</legend>
				<div className="rsvp-fieldset-options">
					<label htmlFor="performing">
						<span>Yes</span>
						<input type="radio" name="performing" value="yes" checked={isPerforming} onChange={() => setIsPerforming(true)} />
					</label>
					<label htmlFor="performing">
						<span>No</span>
						<input type="radio" name="performing" value="no" checked={!isPerforming} onChange={() => setIsPerforming(false)} />
					</label>
				</div>
			</fieldset>
		);
	};

	const getContent = () => {
		if (searchError) {
			return <div id={`page-rsvp-name-search-error ${Bodoni.className}`}>Could not find your group. Please try your code again.</div>;
		} else if (groupAlreadyResponded) {
			return <div id={`page-rsvp-name-search-error ${Bodoni.className}`}>We have already received a response from your group. If you wish to amend your response, please contact the couple.</div>;
		} else if (otherError) {
			return <div id={`page-rsvp-name-search-error ${Bodoni.className}`}>Error saving this RSVP. Please try again later.</div>;
		} else if (groupName) {
			return (
				<>
					<h2 className={`page-rsvp-title ${Bodoni.className}`}>{groupName}</h2>
					<form className="page-rsvp-form" onSubmit={handleRsvpSubmit}>
						{sectionAttendance()}
						{groupSizeAttending ? sectionDietryReqs() : null}
						{groupSizeAttending ? sectionPerformance() : null}
						{isPerforming ? <div>Fantastic! Samantha will reach out to organise any performances.</div> : null}
						<button type="submit" className={`page-rsvp-submit-button ${Bodoni.className}`}>
							Submit
						</button>
					</form>
				</>
			);
		} else {
			return <div className={`page-text ${Bodoni.className}`}>Please enter the code you receieved on the wedding invitation.</div>;
		}
	};

	return (
		<>
			<h1 className={`page-title ${DancingScript.className}`} tabIndex={0}>
				Kindly RVSP
			</h1>
			<div className={`page-rsvp ${isThankyouMessage ? "hidden" : ""}`}>
				{groupListSearch()}
				{!isLoading ? (
					getContent()
				) : (
					<div>
						<LoaderCircle className="page-rsvp-loader" size="48px" color="var(--mocha)" />
					</div>
				)}
			</div>
			<div className={`page-rsvp page-rsvp-thankyou ${Bodoni.className} ${isThankyouMessage ? "visible" : ""}`}>Thank you for responding.</div>
		</>
	);
}
