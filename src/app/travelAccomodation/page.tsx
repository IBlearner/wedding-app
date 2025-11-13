import "./styles.scss";
import { ExternalLink } from "lucide-react";

export default function TravelAccomodation() {
	return (
		<>
			<h1 className="page-title">Travel and Accomodation</h1>
			<div className="page-t&a">
				<div className="page-t&a-booking">
					You can stay at the hotel for $400 a night. Please visit the below web page to book a room at a
					discounted price.
				</div>
				<div>
					<strong>Location:</strong> 39 Edward St, Brisbane City QLD 4000
				</div>
				<div>
					<strong>Phone:</strong> (07) 3221 1999
				</div>
				<a id="t&a-booking-link" href="https://www.google.com" target="_blank">
					Book here <ExternalLink size="16px" />
				</a>
			</div>
		</>
	);
}
