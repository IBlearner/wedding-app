"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { House, Menu as MenuIcon, X, MessageCircleQuestionMark, CalendarDays, Hotel, MailQuestionMark } from "lucide-react";
import "./styles.scss";
import { useWeddingDateCountdown } from "@/hooks/countdown";
import { Bodoni_Moda, Oranienbaum } from "next/font/google";

const Bodoni = Bodoni_Moda({
	weight: ["400"],
});

const titleFont = Oranienbaum({
	weight: ["400"],
});

export default function Menu() {
	const router = useRouter();
	const currPage = usePathname();

	const navigateTo = (target: string) => {
		router.push(target);
		setIsOpen(false);
	};
	const timeLeft = useWeddingDateCountdown();

	const [isOpen, setIsOpen] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<>
			<div className={`menu-mobile-bar title ${titleFont.className}`}>
				KIEN VI <span className={`menu-bar-text ${Bodoni.className}`}> & </span> SAMANTHA
			</div>
			<div className="menu-mobile-bar">
				<button className="menu-mobile-button" onClick={() => navigateTo("/")}>
					<House size={32} />
				</button>
				<div className="menu-mobile-countdown">
					<div>
						<span className={`menu-mobile-countdown-time ${titleFont.className}`}>{timeLeft?.days} days | </span>
						<span className={`menu-mobile-countdown-time2 ${titleFont.className}`}>
							{timeLeft?.hours}h • {timeLeft?.minutes}m • {timeLeft?.seconds}s
						</span>
					</div>
					{/* <div className={`menu-mobile-countdown-text ${titleFont.className}`}>days to go</div> */}
				</div>
				<button className="menu-mobile-button" onClick={() => setIsOpen(true)}>
					<MenuIcon size={32} />
				</button>
			</div>
			<div className={`menu-overlay ${isOpen ? "open" : "close"}`} onClick={() => setIsOpen(false)}></div>
			<div className={`menu ${Bodoni.className} ${isOpen ? "open" : "close"}`}>
				<button className="menu-close" onClick={() => setIsOpen(false)}>
					<X />
				</button>
				<ul>
					<li className={currPage === "/" ? "active" : ""} onClick={() => navigateTo("/")}>
						<House />
						HOME
					</li>
					<li className={currPage === "/rsvp" ? "active" : ""} onClick={() => navigateTo("/rsvp")}>
						<MailQuestionMark />
						RSVP
					</li>
					<li className={currPage === "/faq" ? "active" : ""} onClick={() => navigateTo("/faq")}>
						<MessageCircleQuestionMark />
						FAQ
					</li>
					<li className={currPage === "/schedule" ? "active" : ""} onClick={() => navigateTo("/schedule")}>
						<CalendarDays />
						SCHEDULE
					</li>
					<li className={currPage === "/travelAccomodation" ? "active" : ""} onClick={() => navigateTo("/travelAccomodation")}>
						<Hotel />
						LOCATION
					</li>
				</ul>
			</div>
		</>
	);
}
