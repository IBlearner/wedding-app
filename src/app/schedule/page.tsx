import "./styles.scss";
import { Dancing_Script } from "next/font/google";

import { Gem, ChefHat, Martini, HandPlatter, PartyPopper, CakeSlice, Beef, Flower2, Guitar, HandHeart } from "lucide-react";

const DancingScript = Dancing_Script({
    weight: ["400"],
});

export default function Schedule() {
    return (
        <>
            <h1 className={`page-title ${DancingScript.className}`}>Schedule</h1>
            <div className="page-schedule">
                <div className="schedule-record">
                    <span className="schedule-time">15:00</span>
                    <p className="schedule-text">
                        WE DO!
                        <Gem />
                    </p>
                    <p className="schedule-text2">
                        Please arrive around 2:30pm for a 3pm ceremony start in the <b>Stamford Plaza</b> Main Garden. This will be followed by <b>Group Photos</b> before making your way to the Pre-Reception area for canapes.
                    </p>
                </div>
                <div className="schedule-record">
                    <span className="schedule-time">16:30</span>
                    <p className="schedule-text">
                        Canopes Served
                        <ChefHat />
                    </p>
                    <p className="schedule-text2">Canapes will commence at 4:30pm. At this time any drinks will be self-service until the reception begins.</p>
                </div>
                <div className="schedule-record">
                    <span className="schedule-time">17:45</span>
                    <p className="schedule-text">
                        Reception Opens
                        <Martini />
                    </p>
                    <p className="schedule-text2">
                        Reception will be held in the <b>River Room</b> at the Stamford Plaza. Bar tab and Photo Booth will also commence at this time. Please enjoy the selection of drinks available, any drinks not on the list will be
                        self-funded. When using the Photo Booth, please ensure you paste a photo of yourselves into our Guest Book!
                    </p>
                </div>
                <div className="schedule-record">
                    <span className="schedule-time">18:15</span>
                    <p className="schedule-text">
                        Entrees Served
                        <HandPlatter />
                    </p>
                    <p className="schedule-text2">Entrees will be served as alternate-drop. Our current choices include a Vegetarian Burrata option and a Smoked Duck Breast. Please let us know if you have any dietary requirements!</p>
                </div>
                <div className="schedule-record">
                    <span className="schedule-time">19:00</span>
                    <p className="schedule-text">
                        Entertainment Commences
                        <PartyPopper />
                    </p>
                    <p className="schedule-text2">Entertainment will include a number of speeches, performances and traditions. Please enjoy and take part where you can!</p>
                </div>
                <div className="schedule-record">
                    <span className="schedule-time">19:15</span>
                    <p className="schedule-text">
                        Mains Served <Beef />
                    </p>
                    <p className="schedule-text2">Mains will be served as alternate-drop. Our current choices include a Beef and Fish option. Please let us know if you have any dietary requirements!</p>
                </div>
                <div className="schedule-record">
                    <span className="schedule-time">20:00</span>
                    <p className="schedule-text">
                        Entertainment Continues
                        <Guitar />
                    </p>
                    <p className="schedule-text2">Entertainment will continue with the bouquet toss, first dance, father-daughter dance and a traditional filipino money dance! Please do not feel obliged to take part.</p>
                </div>
                <div className="schedule-record">
                    <span className="schedule-time">20:30</span>
                    <p className="schedule-text">
                        Cake Served
                        <CakeSlice />
                    </p>
                    <p className="schedule-text2">Cutting of the cake will commence at this time. We hope you enjoy!</p>
                </div>

                <div className="schedule-record">
                    <span className="schedule-time">21:00</span>
                    <p className="schedule-text">
                        LET'S DANCE
                        <Flower2 />
                    </p>
                    <p className="schedule-text2">The end of all the formal parts of the reception. This time is to dance, relax and have fun!</p>
                </div>
                <div className="schedule-record">
                    <span className="schedule-time">21:45</span>
                    <p className="schedule-text">
                        Bar Tab & Photo Booth Close <HandHeart />
                    </p>
                    <p className="schedule-text2">Please get all your drinks and pictures in before the end of the night!</p>
                </div>
            </div>
        </>
    );
}
