"use client";
import { useEffect, useState } from "react";
import { Group } from "@/helpers/types";

export default function Groups() {
	const [groups, setGroups] = useState<Group[]>([]);

	useEffect(() => {
		const fetchGroupList = async () => {
			try {
				const res = await fetch("/api/groups");
				const data = await res.json();
				setGroups(data.message);
			} catch (err) {
				console.error("Failed to fetch groups list", err);
			}
		};

		fetchGroupList();
	}, []);

	const handleDelete = async (id: string) => {
		console.log(id);

		const res = await fetch(`/api/groups/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			console.log(`Deleted data for ${id}.`);
		} else {
			console.log(`Could not delete data for ${id}.`);
		}
	};

	const handleDeleteAll = async () => {
		const res = await fetch("/api/groups", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			console.log("Deleted all group data.");
		} else {
			console.log("Could not delete all group data.");
		}
	};

	const mapGroup = () => {
		return groups.map((group) => {
			return (
				<div key={group?.code}>
					<div>
						{group.groupName} [{group.code}], {group.groupAmt}, {group.dietryReqs || "No special reqs."}
					</div>
					<button onClick={() => handleDelete(group.code.toString())}>Delete</button>
				</div>
			);
		});
	};

	return (
		<div>
			<div>{mapGroup()}</div>
			<div>
				<button
					onClick={() => {
						handleDeleteAll();
					}}
				>
					Delete all
				</button>
			</div>
		</div>
	);
}
