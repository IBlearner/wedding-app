"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./styles.scss";

interface AccordionProps {
	question: string;
	answer: string;
}

export default function Accordion({ question, answer }: AccordionProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={`accordion ${isOpen ? "open" : "close"}`}>
			<button className="accordion-question" onClick={() => toggleAccordion()}>
				<span>{question}</span>
				<ChevronDown />
			</button>
			<div className={`accordion-answer ${isOpen ? "open" : "close"}`}>{answer}</div>
		</div>
	);
}
