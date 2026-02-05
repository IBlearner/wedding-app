import { NextResponse } from "next/server";
import { createClient } from "redis";
import { Group } from "@/helpers/types";

const client = await createClient({ url: process.env.DB_REDIS_URL }).connect();

const checkGroupResponded = async (code: number) => {
	if (!client) throw new Error("Redis client not working.");
	if (!code) throw new Error("Did not receive a proper code.");

	let groupHasResponded = false;
	// Value of the groups data array
	const data = await client.lRange("groups", 0, -1);
	data.some((e) => {
		try {
			const group = JSON.parse(e) as Group;
			// If code has matched, group has already provided a response
			groupHasResponded = group.code == code;
		} catch {
			console.error("Something went wrong checking the group list for a response.");
		}
	});
	return groupHasResponded;
};

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const response = data;
		const groupCode = JSON.stringify(data.code); // Needs to be a string for the database

		// Validate the code
		if (!groupCode) {
			return NextResponse.json({ message: "Missing or invalid code" }, { status: 400 });
		}

		// Check the payload received is valid
		if (!response || !groupCode) throw new Error("Could not get group response.");

		// Check if the group has responded
		const groupHasResponded = await checkGroupResponded(parseInt(groupCode));

		if (groupHasResponded) {
			return NextResponse.json({ message: "Group already responded", responded: true }, { status: 409 });
		} else {
			// Push group details object into group list array
			await client.rPush("groups", JSON.stringify(data));
			return NextResponse.json({ message: "RSVP saved" }, { status: 200 });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Failed to get RSVP details." }, { status: 500 });
	}
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");

	// Validate the code
	if (!code) {
		return NextResponse.json({ message: "Missing or invalid code" }, { status: 400 });
	}

	try {
		const groupHasResponded = await checkGroupResponded(parseInt(code));
		// Check if the group has responded
		if (groupHasResponded) {
			return NextResponse.json({ message: "Group already responded", responded: true }, { status: 409 });
		} else {
			return NextResponse.json({ responded: false }, { status: 200 });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Failed to get RSVP details." }, { status: 500 });
	}
}
