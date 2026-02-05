"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { House, Menu as MenuIcon, X, MessageCircleQuestionMark, CalendarDays, Hotel, MailQuestionMark } from "lucide-react";
import "./styles.scss";
import { useWeddingDateCountdown } from "@/hooks/countdown";
import { Bodoni_Moda, Hachi_Maru_Pop } from "next/font/google";

const HachiPop = Hachi_Maru_Pop({
	weight: ["400"],
});

const Bodoni = Bodoni_Moda({
	weight: ["400"],
});

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
			<div className="menu-mobile-bar">fdsnifsjdn</div>
			<div className="menu-mobile-bar">
				<button className="menu-mobile-button" onClick={() => navigateTo("/")}>
					<House size={32} />
				</button>
				<div className="menu-mobile-countdown">
					<div className={`menu-mobile-countdown-time ${HachiPop.className}`}>
						{timeLeft?.days} • {timeLeft?.hours} • {timeLeft?.minutes} • {timeLeft?.seconds}
					</div>
					<div className={`menu-mobile-countdown-text ${HachiPop.className}`}>days to go</div>
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
					<li onClick={() => navigateTo("/")}>
						<House />
						HOME
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
						SCHEDULE
					</li>
					<li onClick={() => navigateTo("/travelAccomodation")}>
						<Hotel />
						LOCATION
					</li>
				</ul>
			</div>
		</>
	);
}
