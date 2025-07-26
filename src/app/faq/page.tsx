"use client";
import { faqs } from "@/data/constants";
import Accordion from "@/components/accordion/accordion";
import "./styles.scss";

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
			<h1 className="page-title">FAQ</h1>
			<div className="page-faq">{faqGroup()}</div>
		</>
	);
}
