"use client";
import { useState } from "react";
import Link from "next/link";
import "./styles.scss";

export default function Menu() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<button className="menu-button" onClick={() => toggleMenu()}>
				=
			</button>
			<div className={`menu-overlay ${isOpen ? "open" : "close"}`}></div>
			<div className={`menu ${isOpen ? "open" : "close"}`}>
				<button className="menu-close" onClick={() => toggleMenu()}>
					X
				</button>
				<ul>
					<li>
						<Link href="/faq" onNavigate={() => toggleMenu()}>
							FAQ
						</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link href="/schedule" onNavigate={() => toggleMenu()}>
							Schedule
						</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link href="/travelAccomodation" onNavigate={() => toggleMenu()}>
							Travel and Accomodation
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
}
