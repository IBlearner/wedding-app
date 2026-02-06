"use client";
import Link from "next/link";
import img1 from "../assets/images/homephoto3.jpg";
import img2 from "../assets/images/photo2.jpg";
import img3 from "../assets/images/photo3.jpg";
import styles from "./page.module.css";
import "./styles.scss";
import Image from "next/image";
import { useState, useEffect } from "react";

const images = [img1, img2, img3];

export default function Home() {
    const [activeImg, setActiveImg] = useState(0);

    // useEffect(() => {
    // 	const interval = setInterval(() => {
    // 		setActiveImg((prev) => (prev + 1) % images.length);
    // 	}, 2000);

    // 	return () => clearInterval(interval);
    // }, []);

    return (
        <>
            <main>
                <Image className={`home-image ${true ? "visible" : ""}`} src={images[activeImg]} alt="picture of couple" fill />
                {/* <div className="centre_container"> */}
                {/* <div className="home_image_wrapper"><Image className={`home-image ${true ? "visible" : ""}`} src={images[activeImg]} alt="picture of couple" fill /></div> */}

                {/* <div className={`home_date ${DancingScript.className}`} id="home-page-date">
                        Please join us to celebrate our day
                    </div> */}
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
                {/* </div> */}
            </main>
            <footer className={styles.footer}></footer>
        </>
    );
}
