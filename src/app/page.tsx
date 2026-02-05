"use client";
import Link from "next/link";
import img1 from "../assets/images/photo1.jpg";
import styles from "./page.module.css";
import "./styles.scss";
import Image from "next/image";
import { useState, useEffect } from "react";

const images = [img1, img1, img1];

export default function Home() {
	const [activeImg, setActiveImg] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveImg((prev) => (prev + 1) % images.length);
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<div className="centre_container">
				<Image className={`home-image ${true ? "visible" : ""}`} src={images[activeImg]} width={300} height={400} alt="Wedding couple posing" />
				<h1 className="name_heading">
					Kien Vi
					<br /> <span className="centered-and">and</span>
					Samantha
				</h1>
				<main>
					<div>
						<Link href="/rsvp">
							<button id="home-page-rsvp-button" rel="noopener noreferrer">
								RSVP
							</button>
						</Link>
					</div>
				</main>
				<footer className={styles.footer}></footer>
			</div>
		</>
	);
}
