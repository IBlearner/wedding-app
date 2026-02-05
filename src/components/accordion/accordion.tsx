"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./styles.scss";
import { ReactNode } from "react";
import { Dancing_Script, Oranienbaum } from "next/font/google";

const answerFont = Oranienbaum({
    weight: ["400"],
});

const qFont = Dancing_Script({
    weight: ["700"],
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
            <button className={`accordion-question `}>
                <span className={`faq-question ${qFont.className}`}>{question}</span>
                <ChevronDown />
            </button>
            <div className={`accordion-answer ${answerFont.className}`}>{answer}</div>
        </div>
    );
}
