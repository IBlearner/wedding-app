import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const checkUserResponded = (json: any, id: number) => {
	return json.responded.includes(id);
};

export async function POST(request: Request) {
	const data = await request.json();
	const dbPath = path.join(process.cwd(), "src/data/db.json");

	try {
		const file = await fs.readFile(dbPath, "utf-8");
		const json = JSON.parse(file);

		const response = data;
		const userId = data.id;
		// Check the payload received is valid
		if (!response || !JSON.stringify(userId)) throw new Error("Could not get user response.");

		// Check to see if user already responded, and forbid another response
		const hasUserResponded = checkUserResponded(json, userId);
		if (hasUserResponded) {
			return NextResponse.json({ message: "User already responded" }, { status: 409 });
		} else {
			// Add user to the responded array
			json.responded.push(userId);

			// If there is only one key, the id, this means they declined
			if (Object.keys(response).length === 1) {
				json.notAttending.push(response);
			} else {
				json.attending.push(response);
			}

			// Write data to file
			await fs.writeFile(dbPath, JSON.stringify(json, null, 2));

			return NextResponse.json({ message: "RSVP saved" }, { status: 200 });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Failed to save RSVP" }, { status: 500 });
	}
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const idParam = searchParams.get("id");
	const id = Number(idParam);
	const dbPath = path.join(process.cwd(), "src/data/db.json");

	// Validate the ID
	if (!idParam || isNaN(id)) {
		return NextResponse.json({ message: "Missing or invalid ID" }, { status: 400 });
	}

	try {
		const file = await fs.readFile(dbPath, "utf-8");
		const json = JSON.parse(file);

		// Check if the user has responded
		const hasUserResponded = checkUserResponded(json, id);
		if (hasUserResponded) {
			return NextResponse.json({ message: "User already responded", responded: true }, { status: 409 });
		} else {
			return NextResponse.json({ responded: false }, { status: 200 });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Failed to ge RSVP details." }, { status: 500 });
	}
}
