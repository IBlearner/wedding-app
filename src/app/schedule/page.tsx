import "./styles.scss";

export default function Schedule() {
	return (
		<>
			<h1 className="page-title">Schedule</h1>
			<div className="page-schedule">
				<div className="schedule-record">
					<span className="schedule-time">15:30</span>
					<span className="schedule-title">Ceremony commence</span>
				</div>
				<div className="schedule-record">
					<span className="schedule-time">16:00</span>
					<span className="schedule-title">Canopes served</span>
				</div>
				<div className="schedule-record">
					<span className="schedule-time">18:00</span>
					<span className="schedule-title">Entree served</span>
				</div>
				<div className="schedule-record">
					<span className="schedule-time">19:00</span>
					<span className="schedule-title">Main course served</span>
				</div>
				<div className="schedule-record">
					<span className="schedule-time">19:30</span>
					<span className="schedule-title">Dessert served</span>
				</div>
				<div className="schedule-record">
					<span className="schedule-time">20:00</span>
					<span className="schedule-title">Speeches</span>
				</div>
				<div className="schedule-record">
					<span className="schedule-time">21:00</span>
					<span className="schedule-title">Cake cutting</span>
				</div>
				<div className="schedule-record">
					<span className="schedule-time">22:00</span>
					<span className="schedule-title">Dancing</span>
				</div>
			</div>
		</>
	);
}
