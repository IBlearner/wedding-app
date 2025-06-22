"use client";
import { useState } from "react";
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
		<>
			<button className="accordion" onClick={() => toggleAccordion()}>
				<span className="accordion-title">{question}</span>
			</button>
			<div className={`accordion-answer ${isOpen ? "open" : "close"}`}>{answer}</div>
		</>
	);
}
