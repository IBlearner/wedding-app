import type { Metadata } from "next";
import Menu from "../components/menu/menu";
import "./globals.scss";
import { Cormorant } from "next/font/google";

const dancingScript = Cormorant({});

export const metadata: Metadata = {
	title: "Kienvi and Samantha's wedding",
	description: "Celebrate this day with us"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={dancingScript.className}>
			<body>
				<Menu />
				{children}
			</body>
		</html>
	);
}
