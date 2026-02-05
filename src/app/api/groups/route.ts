import { NextResponse } from "next/server";
import { createClient } from "redis";

const client = await createClient({ url: process.env.DB_REDIS_URL }).connect();

export async function GET() {
	try {
		// Get the list and parse it to be sent to FE
		const groupList = await client.lRange("groups", 0, -1);
		const groups = groupList.map((g) => JSON.parse(g));

		// RESET THE GROUP LIST. DONT DO THIS ONCE WHEN THE APP IS READY
		// await client.del("groups");

		return NextResponse.json({ message: groups }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Failed to get RSVP details." }, { status: 500 });
	}
}
