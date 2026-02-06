"use client";
import Link from "next/link";
import img1 from "../assets/images/lyingphoto.jpg";
import img2 from "../assets/images/photo5.jpg";
import styles from "./page.module.css";
import "./styles.scss";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<main>
				<Image className={`home-image`} src={img1} alt="picture of couple" fill />
				<Image className={`home-image2`} src={img2} alt="picture of couple" fill />
				<div className="centre_container">
					<div id="home-page-date">11th April 2026</div>
					{/* <Link href="/faq">
                        <button id="home-page-rsvp-button" rel="noopener noreferrer">
                            FAQ
                        </button>
                    </Link> */}
					<Link id="home-page-rsvp" href="/rsvp">
						<button id="home-page-rsvp-button" rel="noopener noreferrer">
							RSVP
						</button>
					</Link>
				</div>
			</main>
			<footer className={styles.footer}></footer>
		</>
	);
}
