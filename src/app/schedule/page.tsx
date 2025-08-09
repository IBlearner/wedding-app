import "./styles.scss";

export default function Schedule() {
	return (
		<>
			<h1 className="page-title">Schedule</h1>
			<div className="page-schedule">
				<div className="schedule-record">
					<span className="schedule-time">15:30</span>
					<p className="schedule-text">Ceremony commence</p>
				</div>
				<div className="schedule-record">
					<span className="schedule-time">16:00</span>
					<p className="schedule-text">Canopes served</p>
				</div>
				<div className="schedule-record">
					<span className="schedule-time">18:00</span>
					<p className="schedule-text">Entree served</p>
				</div>
				<div className="schedule-record">
					<span className="schedule-time">19:00</span>
					<p className="schedule-text">Main course served</p>
				</div>
				<div className="schedule-record">
					<span className="schedule-time">19:30</span>
					<p className="schedule-text">Dessert served</p>
				</div>
				<div className="schedule-record">
					<span className="schedule-time">20:00</span>
					<p className="schedule-text">Speeches</p>
				</div>
				<div className="schedule-record">
					<span className="schedule-time">21:00</span>
					<p className="schedule-text">Cake cutting</p>
				</div>
				<div className="schedule-record">
					<span className="schedule-time">22:00</span>
					<p className="schedule-text">Dancing</p>
				</div>
			</div>
		</>
	);
}
