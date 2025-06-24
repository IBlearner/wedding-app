import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Menu from "../components/menu/menu";
import "./globals.scss";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

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
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Menu />
				{children}
			</body>
		</html>
	);
}
