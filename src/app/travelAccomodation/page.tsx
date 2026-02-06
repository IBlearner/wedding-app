import "./styles.scss";
import { ExternalLink } from "lucide-react";

export default function TravelAccomodation() {
    return (
        <>
            <h1 className="page-title">Travel and Accomodation</h1>
            <div className="page-t&a">
                <div className="page-t&a-booking">
                    You can stay at the hotel for a discounted rate. Please visit the below web page to book a room at a discounted price. Promo code should already be applied, if not please use code: <b>SFPROMO9</b>.
                </div>
                <div>
                    <strong>Location:</strong> 39 Edward St, Brisbane City QLD 4000
                </div>
                <div>
                    <strong>Phone:</strong> (07) 3221 1999
                </div>
                <a
                    id="t&a-booking-link"
                    href="https://be.synxis.com/?adult=1&arrive=2026-02-06&chain=21125&child=0&currency=AUD&depart=2026-02-07&hotel=3674&level=hotel&locale=en-US&productcurrency=AUD&promo=SFPROMO9&rate=NP09&rooms=1"
                    target="_blank"
                >
                    Book here <ExternalLink size="16px" />
                </a>
            </div>
        </>
    );
}
