"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { House, Menu as MenuIcon, X, MessageCircleQuestionMark, CalendarDays, Hotel, MailQuestionMark } from "lucide-react";
import "./styles.scss";
import { useWeddingDateCountdown } from "@/hooks/countdown";

export default function Menu() {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const navigateTo = (target: string) => {
		router.push(target);
		setIsOpen(false);
	};

	const timeLeft = useWeddingDateCountdown();

	return (
		<>
			{/* <button className="menu-home" onClick={() => navigateTo("/")}>
				<House size={32} />
			</button>
			<button className="menu-button" onClick={() => setIsOpen(true)}>
				<MenuIcon size={32} />
			</button> */}
			<div className="menu-mobile-bar">
				<button className="menu-mobile-button" onClick={() => navigateTo("/")}>
					<House size={32} />
				</button>
				<div className="menu-mobile-countdown">
					<div className="menu-mobile-countdown-time">
						{timeLeft?.days} - {timeLeft?.hours} - {timeLeft?.minutes} - {timeLeft?.seconds}
					</div>
					<div className="menu-mobile-countdown-text">Days to go!</div>
				</div>
				<button className="menu-mobile-button" onClick={() => setIsOpen(true)}>
					<MenuIcon size={32} />
				</button>
			</div>
			<div className={`menu-overlay ${isOpen ? "open" : "close"}`} onClick={() => setIsOpen(false)}></div>
			<div className={`menu ${isOpen ? "open" : "close"}`}>
				<button className="menu-close" onClick={() => setIsOpen(false)}>
					<X />
				</button>
				<ul>
					<li onClick={() => navigateTo("/")}>
						<House />
						Home
					</li>
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
