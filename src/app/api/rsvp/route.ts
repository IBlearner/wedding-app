import { NextResponse } from "next/server";
import { createClient } from "redis";

const client = await createClient({ url: process.env.DB_REDIS_URL }).connect();

const checkUserResponded = async (userID: string) => {
	if (!client) throw new Error("Redis client not working.");

	let userHasResponded = false;
	// Value of the guests data array
	const data = await client.lRange("guests", 0, -1);
	console.log(data);
	data.some((e) => {
		try {
			const guest = JSON.parse(e);
			// If ID has matched, user has already provided a response
			userHasResponded = guest.id == userID;
		} catch {
			console.error("Something went wrong checking the guest list for a guest response.");
		}
	});
	return userHasResponded;
};

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const response = data;
		const userId = JSON.stringify(data.id); // Needs to be a string for the database

		// Validate the ID
		if (!userId) {
			return NextResponse.json({ message: "Missing or invalid ID" }, { status: 400 });
		}

		// Check the payload received is valid
		if (!response || !userId) throw new Error("Could not get user response.");

		// Check if the user has responded
		const userHasResponded = await checkUserResponded(userId);

		if (userHasResponded) {
			return NextResponse.json({ message: "User already responded", responded: true }, { status: 409 });
		} else {
			// Push user details object into guest list array
			await client.rPush("guests", JSON.stringify(data));
			return NextResponse.json({ message: "RSVP saved" }, { status: 200 });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Failed to get RSVP details." }, { status: 500 });
	}
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	// Validate the ID
	if (!id) {
		return NextResponse.json({ message: "Missing or invalid ID" }, { status: 400 });
	}

	try {
		const userHasResponded = await checkUserResponded(id);
		// Check if the user has responded
		if (userHasResponded) {
			return NextResponse.json({ message: "User already responded", responded: true }, { status: 409 });
		} else {
			return NextResponse.json({ responded: false }, { status: 200 });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Failed to get RSVP details." }, { status: 500 });
	}
}
