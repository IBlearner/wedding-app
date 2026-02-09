import dressImage from "../assets/images/dresscode.jpg";

export const groupList = [
	{
		code: 7736,
		groupName: "Mortera Family",
		groupAmt: 5,
	},
	{
		code: 9276,
		groupName: "Nguyen Family",
		groupAmt: 2,
	},
	{
		code: 5396,
		groupName: "Meditation",
		groupAmt: 2,
	},
	{
		code: 8308,
		groupName: "Sophie & Fabio",
		groupAmt: 2,
	},
	{
		code: 3890,
		groupName: "Mark & Rachel",
		groupAmt: 2,
	},
	{
		code: 2821,
		groupName: "Kyra Salas",
		groupAmt: 1,
	},
	{
		code: 8985,
		groupName: "Dinasha De Silva",
		groupAmt: 1,
	},
	{
		code: 2998,
		groupName: "Van-Brugh & Cosgrove Family",
		groupAmt: 5,
	},
	{
		code: 4031,
		groupName: "Loretta White",
		groupAmt: 1,
	},
	{
		code: 5478,
		groupName: "Kathleen Gurr",
		groupAmt: 1,
	},
	{
		code: 7278,
		groupName: "Trinh Tran",
		groupAmt: 2,
	},
	{
		code: 2205,
		groupName: "",
		groupAmt: 2,
	},
	{
		code: 10133,
		groupName: "",
		groupAmt: 2,
	},
	{
		code: 8813,
		groupName: "",
		groupAmt: 2,
	},
	{
		code: 4571,
		groupName: "Angie Houslander",
		groupAmt: 1,
	},
	{
		code: 1608,
		groupName: "Emma Groves",
		groupAmt: 1,
	},
	{
		code: 6215,
		groupName: "Perla Felizardo",
		groupAmt: 1,
	},
	{
		code: 3571,
		groupName: "Theresa Tabaculdet",
		groupAmt: 1,
	},
	{
		code: 2857,
		groupName: "Yenny Barker",
		groupAmt: 1,
	},
	{
		code: 1982,
		groupName: "Tamayo Family",
		groupAmt: 4,
	},
	{
		code: 10745,
		groupName: "Criddle Family",
		groupAmt: 4,
	},
	{
		code: 8813,
		groupName: "Quiblado Family",
		groupAmt: 4,
	},
	{
		code: 1030,
		groupName: "Connie & Wilson Quiblado",
		groupAmt: 2,
	},
	{
		code: 10037,
		groupName: "Cubilla Family",
		groupAmt: 5,
	},
	{
		code: 8224,
		groupName: "Jessica Moore & Family",
		groupAmt: 3,
	},
	{
		code: 6261,
		groupName: "Jonathon, Tuoi Moore & Family",
		groupAmt: 4,
	},
	{
		code: 9499,
		groupName: "Allan & Kirsty Thomas",
		groupAmt: 2,
	},
	{
		code: 1533,
		groupName: "Ben & Kaz McDevitt",
		groupAmt: 2,
	},
	{
		code: 2886,
		groupName: "Arthur & Lyn Willemse",
		groupAmt: 2,
	},
	{
		code: 2448,
		groupName: "Manny",
		groupAmt: 2,
	},
	{
		code: 1123,
		groupName: "Rose Ann Mortera",
		groupAmt: 1,
	},
	{
		code: 9870,
		groupName: "Justin Mortera",
		groupAmt: 1,
	},
	{
		code: 10001,
		groupName: "test 1",
		groupAmt: 1,
	},
	{
		code: 10002,
		groupName: "test 1",
		groupAmt: 1,
	},
	{
		code: 10003,
		groupName: "test 1",
		groupAmt: 1,
	},
	{
		code: 10004,
		groupName: "test 1",
		groupAmt: 1,
	},
	{
		code: 10005,
		groupName: "test 1",
		groupAmt: 1,
	},
	{
		code: 1001,
		groupName: "test 6",
		groupAmt: 1,
	},
	{
		code: 2002,
		groupName: "test 7",
		groupAmt: 1,
	},
	{
		code: 3003,
		groupName: "test 8",
		groupAmt: 1,
	},
	{
		code: 4004,
		groupName: "test 9",
		groupAmt: 1,
	},
	{
		code: 5005,
		groupName: "test 10",
		groupAmt: 1,
	},
];

export const faqs = [
	{
		id: 0,
		question: "What should I wear?",
		answer: (
			<div>
				<p>
					The dress code for our wedding is <b>semi-formal to formal</b> attire. Nude/neutral colours including browns, pinks, creams, golds & greys. Please <u>avoid</u> wearing jeans and sneakers if you can.
				</p>

				<img src={dressImage.src} alt="Dress code example" />
			</div>
		),
	},
	{
		id: 1,
		question: "Can I bring a plus one?",
		answer: (
			<div>
				Unfortunately we do have limited space at our reception venue, we will only be able to accommodate those <u>listed on the invitation</u>. Please contact Samantha if you would like to discuss further. This also goes for
				children that are not listed. Thank you for understanding!
				<br />
				<a href="mailto:svanbrugh@outlook.com">svanbrugh@outlook.com</a>
			</div>
		),
	},
	{
		id: 2,
		question: "What can I give as a gift?",
		answer: (
			<div>
				Your presence with us in celebration is the greatest present, although greeting cards are always appreciated. We do not have a registry because we have all we need at our home. If you choose to make a gift, we kindly ask for
				a contribution to help us continue our life together.
			</div>
		),
	},
	{
		id: 3,
		question: "Is there parking available?",
		answer: (
			<div>
				As it is a Brisbane city based location parking is quite limited. There are a number of parks available at the Stamford, however it is limited and a bit expensive. There is a public parking closeby at 53 Albert St for $15 on
				weekends, however is also subject to availability. We recommend guests Uber or stay at the hotel as this will guarantee you a car space on the night.
			</div>
		),
	},
	{
		id: 4,
		question: "When should I RVSP?",
		answer: (
			<div>
				We kindly ask that you please <b>RVSP by 14th March</b>. Due to venue and catering requirements, anyone who has not responded by this date will unfortunately not be able to attend.
			</div>
		),
	},
	{
		id: 5,
		question: "What if I have dietary restrictions?",
		answer: <div> We are happy to accommodate any dietary needs for all our guests. We ask that you please let us know in the RVSP tab or by contacting us directly.</div>,
	},
	{
		id: 6,
		question: "Is there accommodation available?",
		answer: (
			<div>
				Yes! There is discounted rates at the Stamford Plaza if required. Please use discount code: <b>SFPROMO9</b> when booking on the website to receive this discount. It includes a dedicated car space and buffet breakfast the
				next morning. Otherwise, Brisbane CBD has numerous accommodation options if you fancy!
			</div>
		),
	},
];
