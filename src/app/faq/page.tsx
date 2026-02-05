"use client";
import { faqs } from "@/data/constants";
import Accordion from "@/components/accordion/accordion";
import "./styles.scss";
import { Dancing_Script } from "next/font/google";

const DancingScript = Dancing_Script({
    weight: ["400"],
});

export default function FAQ() {
    const faqGroup = () => {
        return (
            <div className="faq-group">
                {faqs.map((faq) => {
                    return <Accordion key={faq.id} question={faq.question} answer={faq.answer} />;
                })}
            </div>
        );
    };

    return (
        <>
            <h1 className={`page-title ${DancingScript.className}`}>Frequently Asked Questions</h1>
            <div className="page-faq">{faqGroup()}</div>
        </>
    );
}
