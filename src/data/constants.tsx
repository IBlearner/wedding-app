import dressImage from "../assets/images/dresscode.jpg";

export const groupList = [
    {
        code: 1111,
        groupName: "Lam family",
        groupAmt: 3,
    },
    {
        code: 2222,
        groupName: "Vanbrugh family",
        groupAmt: 3,
    },
    {
        code: 3333,
        groupName: "Test family",
        groupAmt: 3,
    },
    {
        code: 4132,
        groupName: "Mortera Family",
        groupAmt: 3,
    },
    {
        code: 5555,
        groupName: "Mendoza group",
        groupAmt: 3,
    },
    {
        code: 6666,
        groupName: "Salas group",
        groupAmt: 3,
    },
    {
        code: 7777,
        groupName: "Sophie & Fabio",
        groupAmt: 3,
    },
    {
        code: 8888,
        groupName: "Tho family",
        groupAmt: 3,
    },
    {
        code: 1616,
        groupName: "Dinasha DS",
        groupAmt: 1,
    },
];

export const faqs = [
    {
        id: 0,
        question: "What should I wear",
        answer: (
            <div>
                <p>The dress code for our wedding is semi-formal to formal attire. Nude/neutral colours including browns, pinks, creams, golds & greys.</p>

                <img src={dressImage.src} alt="Dress code example" />
            </div>
        ),
    },
    {
        id: 1,
        question: "Can I bring a plus one?",
        answer: (
            <div>
                Unfortunately we do have limited space at our reception venue, we will only be able to accommodate those listed on the invitation. Please contact Samantha if you would like to discuss further. Thank you for understanding!
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
        answer: <div> We kindly ask that you please RVSP by 14th March. Due to venue and catering requirements, anyone who has not responded by this date will unfortunately not be able to attend.</div>,
    },
    {
        id: 5,
        question: "What if I have dietary restrictions?",
        answer: <div> We are happy to accommodate any dietary needs for all our guests. We ask that you please let us know in the RVSP tab or by contacting us directly.</div>,
    },
];
