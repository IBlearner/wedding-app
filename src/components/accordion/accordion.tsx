"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./styles.scss";
import { ReactNode } from "react";
import { Klee_One, Courgette } from "next/font/google";

const KleeOne = Klee_One({
	weight: ["400"],
});

const Courgettes = Courgette({
	weight: ["400"],
});

interface AccordionProps {
	question: string;
	answer: ReactNode;
}

export default function Accordion({ question, answer }: AccordionProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={`accordion ${isOpen ? "open" : "close"}`} onClick={() => toggleAccordion()}>
			<button className={`accordion-question ${Courgettes.className}`}>
				<span>{question}</span>
				<ChevronDown />
			</button>
			<div className={`accordion-answer ${KleeOne.className}`}>{answer}</div>
		</div>
	);
}
