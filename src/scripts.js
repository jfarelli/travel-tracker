import './css/styles.css';
import './images/turing-logo.png'
import {getData} from './apiCalls';
import TripsRepository from './TripsRepository';
import Travelers from './Travelers';
import TravelersRepository from './TravelersRepository';
import DestinationsRepository from './DestinationsRepository';
import dayjs from 'dayjs';
import Trips from './Trips';
dayjs().format();
// const dayjs = require('dayjs')
// dayjs().format()


// >>>>>> Gloval Variables <<<<<<
var tripsData = [];
var travelersData = [];
var destinationsData = [];
var tripsRepository;
var travelersRepository;
var destinationsRepository;

// >>>>>> Event Listenerts <<<<<<
window.addEventListener('load', loadData);




function loadData() {
    Promise.all( [getData('trips'), getData('travelers'), getData('destinations')] ).then( data => {
        tripsData = data[ 0 ].trips;
        travelersData = data[ 1 ].travelers;
        destinationsData = data[ 2 ].destinations;
        tripsRepository = new TripsRepository( tripsData );
        travelersRepository = new TravelersRepository( travelersData );
        destinationsRepository = new DestinationsRepository( destinationsData );
        console.log(displayTripsOnDashboard())
    });
}

function getRandomUser( traveler ) {
    const randomUserIndex = Math.floor( Math.random() * traveler.length )
    console.log(traveler[ randomUserIndex ])
    return traveler[ randomUserIndex ]
}
  
  function displayTripsOnDashboard() {
    let randomUser = getRandomUser(travelersData);
    let showUserTrips = new TripsRepository(tripsData);
    return showUserTrips.getTripsByUserId(randomUser.id)
}