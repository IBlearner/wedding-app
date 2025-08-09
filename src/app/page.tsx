import Link from "next/link";
import myImage from "../assets/images/photo1.jpg";
import styles from "./page.module.css";
import "./styles.scss";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<div className="centre_container">
				<Image className="home_image" src={myImage} width={300} height={400} alt="home_picture" />
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
