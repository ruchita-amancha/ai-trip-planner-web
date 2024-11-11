export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'Explore the world with your partner',
        icon: '🥂',
        people: '2',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Create memories with your loved ones',
        icon: '🏡',
        people: '3+',
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'Adventure with your best pals',
        icon: '⛵',
        people: '2+',
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸'
    }
]


export const AI_PROMPT="Generate Travel Plan for Location : {location} , for {totalDays} Days for {traveler} with a {budget} budget, Give me Hotels options list with hotel name,hotel address, price,hotel image url,geo-coordinates,rating,descriptions and suggest itinerary with placename,place details, place image url,geo-coordinates,ticket pricing,rating,time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format"

export const ai_demo="Generate a {totalDays}-day travel plan for a {traveler} visiting {location} on a {budget} budget. Provide the following details:\n1. Hotel options list with: hotel name, address, price per night, image URL, geo-coordinates, rating, description.\n2. A {totalDays}-day itinerary with for each day:\n- Place name\n- Place details\n- Place image URL (give me such an image url that i can use in my code to display it)\n- Geo-coordinates\n- Ticket pricing\n- Rating\n- Estimated time travel between locations\nProvide the entire response in JSON format."


