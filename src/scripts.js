// import './css/normalize.css';
import './css/styles.css';
import './images/turing-logo.png'
import { getData } from './apiCalls';
import Trips from './Trips';
import TripsRepository from './TripsRepository';
import Travelers from './Travelers';
import TravelersRepository from './TravelersRepository';
import DestinationsRepository from './DestinationsRepository';
import dayjs from 'dayjs';
dayjs().format();
// const dayjs = require('dayjs')
// dayjs().format()


// >>>>>> Gloval Variables <<<<<<
let tripsData = [];
let travelersData = [];
let destinationsData = [];
let tripsRepository;
let travelersRepository;
let destinationsRepository;


// >>>>>> Query Selectors <<<<<<
let welcomeMessageDisplay = document.querySelector( ".welcome-message" );
let travelerTypeDisplay = document.querySelector( ".traveler-type" );
let totalTripCostDisplay = document.querySelector( ".total-trip-cost" );
let pastTripsButton = document.getElementById( 'pastTripsButton');
let presentTripsButton = document.getElementById( 'presentTripsButton' );
let futureTripsButton = document.getElementById( 'futureTripsButton') ;
let pendingTripsButton = document.getElementById( 'pendingTripsButton' );
let pastTripsWindow = document.getElementById( 'pastTripsWindow');
let presentTripsWindow = document.getElementById( 'presentTripsWindow' );
let futureTripsWindow = document.getElementById( 'futureTripsWindow') ;
let pendingTripsWindow = document.getElementById( 'pendingTripsWindow' );

// >>>>>> Event Listenerts <<<<<<
window.addEventListener( 'load', loadData );
pastTripsButton.addEventListener( 'click', showPastTripsWindow );
presentTripsButton.addEventListener( 'click', showPresentTripsWindow );
futureTripsButton.addEventListener( 'click', showFutureTripsWindow );
pendingTripsButton.addEventListener( 'click', showPendingTripsWindow) ;




function loadData() {
    Promise.all( [ getData( 'trips' ), getData( 'travelers' ), getData( 'destinations' ) ] ).then( data => {
        tripsData = data[ 0 ].trips;
        travelersData = data[ 1 ].travelers;
        destinationsData = data[ 2 ].destinations;
        tripsRepository = new TripsRepository( tripsData );
        travelersRepository = new TravelersRepository( travelersData );
        destinationsRepository = new DestinationsRepository( destinationsData );
        displayTravelerInfoOnNav()
        displayPastTrips()
    });
}

function getRandomUser( traveler ) {
    const randomUserIndex = Math.floor( Math.random() * traveler.length )
    return traveler[ randomUserIndex ]
}
  
function displayTravelerInfoOnNav(  ) {
    let newTrip = new TripsRepository( tripsData )
    let randomUser = getRandomUser( travelersData );
    welcomeMessageDisplay.innerText = `Welcome, ${ randomUser.name }!`
    travelerTypeDisplay.innerText = `"${ randomUser.travelerType.toUpperCase() }"`
    totalTripCostDisplay.innerText += `Total Spent on Travel this Year  : $${ newTrip.getTripCostTotalForAllYear( randomUser.id, destinationsRepository ) }`
    // console.log('destinationsRepository: ', destinationsRepository)
}


function displayPastTrips( whereAreWeGoing , howManyAreGoing , howLongAreWeStaying ) {
    let newTrip = new TripsRepository( tripsData );
    let destinations = new DestinationsRepository( destinationsData );
    const pastTrips = newTrip.getPastTripsByUserID( 7 );  // HARD-CODED TO SEE RESULTS IN CONSOLE
    console.log('PASTTRIPS: ', pastTrips)
      const formatTrips = pastTrips.map(trip => {
        const destination = destinations.getDestinationsbyId(trip.destinationID);
        // console.log('DESTINATION: ', destination)
        // console.log('DESTINATION.IMAGE: ', destination.image)
        // console.log('DESTINATION.ALT: ', destination.alt)
        // console.log('DESTINATION.TEXT: ', destination.destination)
        // console.log('PASTTRIPS.DURATION: ', trip.duration)
        console.log('DESTINATIONS.getTripTotalCost: ', destinations.getTripCostTotal( whereAreWeGoing , howManyAreGoing , howLongAreWeStaying ))
        return `<div class="bottom-grid">
          <div class="grid-item grid-item-1">
            <img class= "trip-image" src="${destination.image}" alt="${destination.alt}">
              <h3 class="destination-text">${destination.destination}</h3>
              <p class="duration">${trip.duration} days</p>
              <p class="total-cost">$${destinations.getTripCostTotal( whereAreWeGoing , howManyAreGoing , howLongAreWeStaying )}</p>
          </div>`;
      });
      return formatTrips;
    }

function showPastTripsWindow() {
    pastTripsWindow.classList.remove( 'hidden' )
    presentTripsWindow.classList.add( 'hidden' );
    futureTripsWindow.classList.add( 'hidden' );
    pendingTripsWindow.classList.add( 'hidden' );
}

function showPresentTripsWindow() {
    pastTripsWindow.classList.add( 'hidden' )
    presentTripsWindow.classList.remove( 'hidden' );
    futureTripsWindow.classList.add( 'hidden' );
    pendingTripsWindow.classList.add( 'hidden' );
}

function showFutureTripsWindow() {
    pastTripsWindow.classList.add( 'hidden' )
    presentTripsWindow.classList.add( 'hidden' );
    futureTripsWindow.classList.remove( 'hidden' );
    pendingTripsWindow.classList.add( 'hidden' );
}

function showPendingTripsWindow() {
    pastTripsWindow.classList.add( 'hidden' )
    presentTripsWindow.classList.add( 'hidden' );
    futureTripsWindow.classList.add( 'hidden' );
    pendingTripsWindow.classList.remove( 'hidden' );
}