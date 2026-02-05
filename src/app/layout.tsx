import type { Metadata } from "next";
import Menu from "../components/menu/menu";
import "../assets/stylesheets/globals.scss";
import { Delicious_Handrawn } from "next/font/google";

const defaultFont = Delicious_Handrawn({
    weight: ["400"],
});

export const metadata: Metadata = {
    title: "Kienvi and Samantha's wedding",
    description: "Celebrate this day with us",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={defaultFont.className}>
            <body>
                <Menu />
                <div className="page">{children}</div>
            </body>
        </html>
    );
}
