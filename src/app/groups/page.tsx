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

	const mapGroup = () => {
		return groups.map((group) => {
			return (
				<div key={group?.code}>
					{group.groupName} ({group.code}): {group.groupAmt}
				</div>
			);
		});
	};
	return <div>{mapGroup()}</div>;
}
