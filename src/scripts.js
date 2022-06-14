import './css/styles.css';
// import './css/normalize.css';
import './images/turing-logo.png'
import { getData } from './apiCalls';
import { postData } from './apiCalls';
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
let destinationsData;
let tripsRepository;
let travelersRepository;
let destinationsRepository;
let currentUser;
let postedTripData;
let postTripInputButton;

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
let destinationDropDown = document.getElementById( 'destinationDropDown' );
document.getElementById('pastTripsButton').focus();


postTripInputButton = document.querySelector('.calendar');


// >>>>>> Event Listenerts <<<<<<
window.addEventListener( 'load', loadData );
pastTripsButton.addEventListener( 'click', showPastTripsWindow );
presentTripsButton.addEventListener( 'click', showPresentTripsWindow );
futureTripsButton.addEventListener( 'click', showFutureTripsWindow );
pendingTripsButton.addEventListener( 'click', showPendingTripsWindow);


postTripInputButton.addEventListener( 'submit', getNewTripDataFromPost );


// >>>>>> POST Request <<<<<<
function getPostedTripDataFromForm( event ) {
    // event.preventDefault();
    // console.log(postTripInputButton.value)
    console.log('EVENT: ', event)
    postedTripData = new FormData( event.target ); 
    console.log('EVENT: ', event)
    console.log('POSTEDTRIPDATA: ', postedTripData)
    console.log('EVENT.TARGET: ', event.target)
    let newTrip = {
        id: tripsRepository.trips.length + 1,
        userID: currentUser.id,
        destinationID: parseInt( postedTripData.get( "destination" )),
        duration: parseInt( postedTripData.get( "duration" )),
        travelers: parseInt( postedTripData.get( "travelers" )),
        date: dayjs( postedTripData.get( "select-date" ) ).format( 'YYYY/MM/DD' ),
        status: "pending",  // CHANGED TO 'pending' FROM 'approved'
        suggestedActivities: [],
    };
    event.target.reset();
    // console.log('NEW TRIP: ', newTrip)
    return newTrip
}

function showMeThePostedTrip( newTrip ) {
    let destination = destinationsRepository.getDestinationsbyId( newTrip.destinationID );
    let formatTrip =  newTrip ;
    pendingTripsWindow.innerHTML += 
            `<section class="grid-item grid-item-1">
                <img class= "trip-image" src="${ destination.image }" alt="${ destination.alt }">
                <h3 class="destination-text">${ destination.destination }</h3>
                <p class="duration">Staying ${ newTrip.duration } days</p>
                <p class="travelers">Travelers: ${ newTrip.travelers }</p>
                <p class="trip-status">Status: ${ newTrip.status }</p>
            </section>`
  };
 

//   e.target.reset();
//   postNewTrip(newTrip).then(data => {
//       // console.log(data)
//       dataRepo.trips.trips.push(data.newTrip)
//       populateTravelerTrips()
//       renderTripCost()
//       getUserTotalSpent()


function getNewTripDataFromPost( event ) {
    event.preventDefault();
    let newTrip = getPostedTripDataFromForm( event );
    let promiseMeYouWillPost = postData( newTrip );
    let fetchMeThatPromise = getData( 'trips' );
    Promise.all( [ promiseMeYouWillPost, fetchMeThatPromise ] ).then( response => {
        tripsRepository = new TripsRepository( response[ 1 ].trips );  // Removed the .trips at the end
        // console.log('response[0].newTrip: ', response[1].trips)
      showMeThePostedTrip( response[ 0 ].newTrip );  // Removed the .trips at the end
      console.log('PROMISE RESPONSE: ', response[ 0 ].newTrip)
    })
    .catch( error => console.log( error ) )
  };


function loadData() {
    Promise.all( [ getData( 'trips' ), getData( 'travelers' ), getData( 'destinations' ) ] ).then( data => {
        tripsData = data[ 0 ].trips;
        travelersData = data[ 1 ].travelers;
        destinationsData = data[ 2 ].destinations;
        tripsRepository = new TripsRepository( tripsData );
        travelersRepository = new TravelersRepository( travelersData );
        destinationsRepository = new DestinationsRepository( destinationsData );
        currentUser = getRandomUser( travelersData );
        displayTravelerInfoOnNav();
        displayDestinationsInDropDown();
        showPastTripsOnDashboard();
        showPresentTripsOnDashboard();
        showFutureTripsOnDashboard();
        showPendingTripsOnDashboard();
    });
}

function getRandomUser( traveler ) {
    const randomUserIndex = Math.floor( Math.random() * traveler.length )
    return traveler[ randomUserIndex ]
}
  
function displayTravelerInfoOnNav(  ) {
    let newTrip = new TripsRepository( tripsData )
        welcomeMessageDisplay.innerText = `Welcome, ${ currentUser.name }!`
        travelerTypeDisplay.innerText = `"${ currentUser.travelerType.toUpperCase() }"`
        totalTripCostDisplay.innerText += `Total Spent on Travel this Year  : $${ newTrip.getTripCostTotalForAllYear( currentUser.id, destinationsRepository ) }`
}

function displayPastTrips( ) {
    let newTrip = new TripsRepository( tripsData );
    let destinations = new DestinationsRepository( destinationsData );
    let pastTrips = newTrip.getPastTripsByUserID( currentUser.id );
    const formatTrips = pastTrips.map( trip => {
        const destination = destinations.getDestinationsbyId( trip.destinationID );
        return `<section class="grid-item grid-item-1">
                        <img class= "trip-image" src="${ destination.image }" alt="${ destination.alt }">
                        <h3 class="destination-text">${ destination.destination }</h3>
                        <p class="duration">Stayed ${ trip.duration } days</p>
                </section>`;
      });
      return formatTrips;
}

function showPastTripsOnDashboard() {
    let pastTrips = displayPastTrips( )
    if (pastTrips.length === 0) {
        pastTripsWindow.innerHTML = '<p class="no-trip">NO PAST TRIPS!!!</p>'
    } else {
        pastTrips.forEach( trip => {
            return pastTripsWindow.innerHTML += trip;
    })
}
}

function displayFutureTrips( ) {
    let futureTrip = new TripsRepository( tripsData );
    let destinations = new DestinationsRepository( destinationsData );
    let futureTrips = futureTrip.getFutureTripsByUserID( currentUser.id );
    const formatTrips = futureTrips.map( trip => {
        const destination = destinations.getDestinationsbyId( trip.destinationID );
        return `<section class="grid-item grid-item-1">
                        <img class= "trip-image" src="${ destination.image }" alt="${ destination.alt }">
                        <h3 class="destination-text">${ destination.destination }</h3>
                        <p class="duration">Stayed ${ trip.duration } days</p>
                </section>`;
        });
        return formatTrips;
}

function showFutureTripsOnDashboard() {
    let futureTrips = displayFutureTrips( )
    if (futureTrips.length === 0) {
        futureTripsWindow.innerHTML = '<p class="no-trip">NO FUTURE TRIPS!!!</p>'
    } else {
        futureTrips.forEach( trip => {
            return futureTripsWindow.innerHTML += trip;
        })
    }
}

function showPresentTripsOnDashboard() {
    // let presentTrips = displayPresentTrips( )
    // if (presentTrips.length === 0) {
        presentTripsWindow.innerHTML = '<p class="no-trip">NO PRESENT TRIPS!!!</p>'
    // } 
    // else {
    //     presentTrips.forEach( trip => {
    //         return presentTripsWindow.innerHTML += trip;
    //     })
    // }
}

function displayPendingTrips( ) {
    let pendingTrip = new TripsRepository( tripsData );
    let destinations = new DestinationsRepository( destinationsData );
    let pendingTrips = pendingTrip.getPendingTripsByUserID( currentUser.id );
    const formatTrips = pendingTrips.map( trip => {
        const destination = destinations.getDestinationsbyId( trip.destinationID );
        return `<section class="grid-item grid-item-1">
                        <img class= "trip-image" src="${ destination.image }" alt="${ destination.alt }">
                        <h3 class="destination-text">${ destination.destination }</h3>
                        <p class="duration">Staying ${ trip.duration } days</p>
                        <p class="travelers">Travelers: ${ trip.travelers }</p>
                        <p class="trip-status">Status: ${ trip.status }</p>
                </section>`;
        });
        return formatTrips;
}

function showPendingTripsOnDashboard() {
    let pendingTrips = displayPendingTrips( )
    if (pendingTrips.length === 0) {
        pendingTripsWindow.innerHTML = '<p class="no-trip">NO PENDING TRIPS!!!</p>'
    } 
    else {
        pendingTrips.forEach( trip => {
            return pendingTripsWindow.innerHTML += trip;
        })
    }
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

function displayDestinationsInDropDown() {
    destinationsRepository.destinations.forEach( destination => {
        destinationDropDown.innerHTML += `<option name='destination' value="${destination.id}">${destination.destination}</option>`
    })
}