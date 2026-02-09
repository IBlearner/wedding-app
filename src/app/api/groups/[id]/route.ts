import { NextResponse } from "next/server";
import { createClient } from "redis";
import { Group } from "@/helpers/types";

const client = await createClient({ url: process.env.DB_REDIS_URL }).connect();

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await context.params;

		const data = await client.lRange("groups", 0, -1);
		const group = data.find((e) => {
			try {
				const group = JSON.parse(e) as Group;
				// If code has matched, group has already provided a response
				return group.code == parseInt(id);
			} catch {
				console.error("Something went wrong checking the group list for a response.");
			}
		});
		// await client.del("groups");

		return NextResponse.json({ message: "Success!" }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Failed to delete group responses." }, { status: 500 });
	}
}
