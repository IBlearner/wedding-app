"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	House,
	Menu as MenuIcon,
	X,
	MessageCircleQuestionMark,
	CalendarDays,
	Hotel,
	MailQuestionMark
} from "lucide-react";
import "./styles.scss";

export default function Menu() {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const navigateTo = (target: string) => {
		router.push(target);
		setIsOpen(false);
	};

	return (
		<>
			<button className="menu-home" onClick={() => navigateTo("/")}>
				<House />
			</button>

			<button className="menu-button" onClick={() => setIsOpen(true)}>
				<MenuIcon />
			</button>
			<div className={`menu-overlay ${isOpen ? "open" : "close"}`} onClick={() => setIsOpen(false)}></div>
			<div className={`menu ${isOpen ? "open" : "close"}`}>
				<button className="menu-close" onClick={() => setIsOpen(false)}>
					<X />
				</button>
				<ul>
					<li onClick={() => navigateTo("/rsvp")}>
						<MailQuestionMark />
						RSVP
					</li>
					<li onClick={() => navigateTo("/faq")}>
						<MessageCircleQuestionMark />
						FAQ
					</li>
					<li onClick={() => navigateTo("/schedule")}>
						<CalendarDays />
						Schedule
					</li>
					<li onClick={() => navigateTo("/travelAccomodation")}>
						<Hotel />
						Travel and Accomodation
					</li>
				</ul>
			</div>
		</>
	);
}
