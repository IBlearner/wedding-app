"use client";
import Link from "next/link";
import img1 from "../assets/images/photo1.jpg";
import img2 from "../assets/images/photo2.jpg";
import img3 from "../assets/images/photo3.jpg";
import styles from "./page.module.css";
import "./styles.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import { DM_Serif_Text, Style_Script } from "next/font/google";

const DMSerifText = DM_Serif_Text({
    weight: ["400"],
});

const LavishlyYours = Style_Script({
    weight: ["400"],
});

const images = [img1, img2, img3];

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
            <h1 className={`name_heading ${DMSerifText.className}`}>
                KIEN VI <span className={`centered-and ${LavishlyYours.className}`}>&</span> SAMANTHA
            </h1>
            <div className="centre_container">
                <div className="home_image_wrapper">
                    <Image
                        className={`home-image ${true ? "visible" : ""}`}
                        src={images[activeImg]}
                        alt="picture of couple"
                        fill
                    />
                </div>

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
