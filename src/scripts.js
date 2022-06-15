import './css/styles.css';
import { getData } from './apiCalls';
import { postData } from './apiCalls';
import DestinationsRepository from './DestinationsRepository';
import Travelers from './Travelers';
import TravelersRepository from './TravelersRepository';
import TripsRepository from './TripsRepository';
import dayjs from 'dayjs';
dayjs( ).format( );


// >>>>>> Gloval Variables <<<<<<
let currentUser;
let destinationsData;
let destinationsRepository;
let postTripInputButton;
let postedTripData;
let travelersRepository;
let tripsRepository;
let userLoginInfo;
let travelersData = [ ];
let tripsData = [ ];


// >>>>>> Query Selectors <<<<<<
let destinationDropDown = document.getElementById( 'destinationDropDown' );
let futureTripsButton = document.getElementById( 'futureTripsButton');
let futureTripsWindow = document.getElementById( 'futureTripsWindow');
let gridContainer = document.querySelector( '.grid-container' );
let loginForm = document.getElementById( 'login-form' );
let loginWindow = document.getElementById( 'main-holder' );
let pastTripsButton = document.getElementById( 'pastTripsButton');
let pastTripsWindow = document.getElementById( 'pastTripsWindow');
let pendingTripsButton = document.getElementById( 'pendingTripsButton' );
let pendingTripsWindow = document.getElementById( 'pendingTripsWindow' );
let presentTripsButton = document.getElementById( 'presentTripsButton' );
let presentTripsWindow = document.getElementById( 'presentTripsWindow' );
let totalTripCostDisplay = document.querySelector( ".total-trip-cost" );
let travelerTypeDisplay = document.querySelector( ".traveler-type" );
let welcomeMessageDisplay = document.querySelector( ".welcome-message" );
postTripInputButton = document.querySelector( '.calendar' );
document.getElementById( 'pastTripsButton' ).focus( );


// >>>>>> Event Listenerts <<<<<<
futureTripsButton.addEventListener( 'click', showFutureTripsWindow );
loginForm.addEventListener( 'submit', checkUserIsValidOnLogin );
pastTripsButton.addEventListener( 'click', showPastTripsWindow );
pendingTripsButton.addEventListener( 'click', showPendingTripsWindow );
postTripInputButton.addEventListener( 'submit', getNewTripDataFromPost );
presentTripsButton.addEventListener( 'click', showPresentTripsWindow );


function getPostedTripDataFromForm( event ) {
    postedTripData = new FormData( event.target ); 
    let newTrip = {
        id: tripsRepository.trips.length + 1,
        userID: currentUser.id,
        destinationID: parseInt( postedTripData.get( "destination" )),
        duration: parseInt( postedTripData.get( "duration" )),
        travelers: parseInt( postedTripData.get( "travelers" )),
        date: dayjs( postedTripData.get( "select-date" ) ).format( 'YYYY/MM/DD' ),
        status: "pending",
        suggestedActivities: [ ],
    };
    event.target.reset( );
    return newTrip
}

function showMeThePostedTrip( newTrip ) {
    let destination = destinationsRepository.getDestinationsbyId( newTrip.destinationID );
    if ( pendingTripsWindow.innerHTML = '<p class="no-trip">NO PENDING TRIPS!!!</p>' ) {
        pendingTripsWindow.innerHTML = '';
    } else {
        '<p class="no-trip">NO PENDING TRIPS!!!</p>'
    }
    pendingTripsWindow.innerHTML += 
            `<section class="grid-item grid-item-1">
                <img class= "trip-image" src="${ destination.image }" alt="${ destination.alt }">
                <h3 class="destination-text">${ destination.destination }</h3>
                <p class="duration">Staying ${ newTrip.duration } days</p>
                <p class="travelers">Travelers: ${ newTrip.travelers }</p>
                <p class="trip-status">Status: ${ newTrip.status }</p>
                <p class="trip-total">Total Cost: $${destinationsRepository.getTripCostTotal( newTrip.destinationID, newTrip.travelers, newTrip.duration )}</p>
            </section>`
}

function getNewTripDataFromPost( event ) {
    event.preventDefault( );
    let newTrip = getPostedTripDataFromForm( event );
    let promiseMeYouWillPost = postData( newTrip );
    let fetchMeThatPromise = getData( 'trips' );
    Promise.all( [ promiseMeYouWillPost, fetchMeThatPromise ] ).then( response => {
        tripsRepository = new TripsRepository( response[ 1 ].trips );
        showMeThePostedTrip( response[ 0 ].newTrip );
    } )
        .catch( error => console.log( error ) )
};

function loadData( ) {
    Promise.all( [ getData( 'trips' ), getData( 'travelers' ), getData( 'destinations' ) ] ).then( data => {
        loginWindow.classList.add( 'hidden' );
        gridContainer.classList.remove( 'hidden' );
        pastTripsWindow.classList.remove( 'hidden' );
        presentTripsWindow.classList.add( 'hidden' );
        futureTripsWindow.classList.add( 'hidden' );
        pendingTripsWindow.classList.add( 'hidden' );
        tripsData = data[ 0 ].trips;
        travelersData = data[ 1 ].travelers;
        destinationsData = data[ 2 ].destinations;
        tripsRepository = new TripsRepository( tripsData );
        travelersRepository = new TravelersRepository( travelersData );
        destinationsRepository = new DestinationsRepository( destinationsData );
        displayTravelerInfoOnNav( );
        displayDestinationsInDropDown( );
        showPastTripsOnDashboard( );
        showPresentTripsOnDashboard( );
        showFutureTripsOnDashboard( );
        showPendingTripsOnDashboard( );
    } );
}

function checkUserIsValidOnLogin( event ) {
    event.preventDefault( );
    userLoginInfo = new FormData( event.target ); 
    if ( checkUserIsValid( userLoginInfo.get( 'username' ) ) && userLoginInfo.get( 'password' ) === 'travel' ) {
        fetch( `http://localhost:3001/api/v1/travelers/${ checkUserIsValid( userLoginInfo.get( 'username' ) ) }` )
        .then( response => response.json() )
        .then( response => {
            whosTheUser( response ) 
            loadData( response ) 
            currentUser = new Travelers( response );
        } )
        .catch( error => console.log( error ) )
    }
}

function checkUserIsValid( userName ) {
    let traveler = userName.substring( 0, 8 );
    let travelerID = userName.substring( 8 );
        if ( traveler === 'traveler' && parseInt( travelerID ) < 51 ) {
            return travelerID
        } else {
            return false
        };
}

function whosTheUser( travelersData ) {
    return new Travelers( travelersData );
}
  
function displayTravelerInfoOnNav(  ) {
    let newTrip = new TripsRepository( tripsData );
        welcomeMessageDisplay.innerText = `Welcome, ${ currentUser.name }!`;
        travelerTypeDisplay.innerText = `"${ currentUser.travelerType.toUpperCase( ) }"`;
        totalTripCostDisplay.innerText += `Total Spent on Travel this Year  : $${ newTrip.getTripCostTotalForAllYear( currentUser.id, destinationsRepository ) }`;
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
      } );
      return formatTrips;
}

function showPastTripsOnDashboard( ) {
    let pastTrips = displayPastTrips( )
    if ( pastTrips.length === 0 ) {
        pastTripsWindow.innerHTML = '<p class="no-trip">NO PAST TRIPS!!!</p>'
    } else {
        pastTrips.forEach( trip => {
            return pastTripsWindow.innerHTML += trip;
        } );
    };
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
        } );
        return formatTrips;
}

function showFutureTripsOnDashboard( ) {
    let futureTrips = displayFutureTrips( );
    if ( futureTrips.length === 0 ) {
        futureTripsWindow.innerHTML = '<p class="no-trip">NO FUTURE TRIPS!!!</p>'
    } else {
        futureTrips.forEach( trip => {
            return futureTripsWindow.innerHTML += trip;
        } );
    };
}

function showPresentTripsOnDashboard( ) {
    presentTripsWindow.innerHTML = '<p class="no-trip">NO PRESENT TRIPS!!!</p>'
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
                        <p class="trip-total">Total Cost: $${destinationsRepository.getTripCostTotal( trip.destinationID, trip.travelers, trip.duration )}</p>
                </section>`;
        } );
        return formatTrips;
}

function showPendingTripsOnDashboard( ) {
    let pendingTrips = displayPendingTrips( );
    if ( pendingTrips.length === 0 ) {
        pendingTripsWindow.innerHTML = '<p class="no-trip">NO PENDING TRIPS!!!</p>'
    } 
    else {
        pendingTrips.forEach( trip => {
            return pendingTripsWindow.innerHTML += trip;
        } )
    };
}

function showPastTripsWindow( ) {
    pastTripsWindow.classList.remove( 'hidden' );
    presentTripsWindow.classList.add( 'hidden' );
    futureTripsWindow.classList.add( 'hidden' );
    pendingTripsWindow.classList.add( 'hidden' );
}

function showPresentTripsWindow( ) {
    pastTripsWindow.classList.add( 'hidden' );
    presentTripsWindow.classList.remove( 'hidden' );
    futureTripsWindow.classList.add( 'hidden' );
    pendingTripsWindow.classList.add( 'hidden' );
}

function showFutureTripsWindow( ) {
    pastTripsWindow.classList.add( 'hidden' );
    presentTripsWindow.classList.add( 'hidden' );
    futureTripsWindow.classList.remove( 'hidden' );
    pendingTripsWindow.classList.add( 'hidden' );
}

function showPendingTripsWindow( ) {
    pastTripsWindow.classList.add( 'hidden' );
    presentTripsWindow.classList.add( 'hidden' );
    futureTripsWindow.classList.add( 'hidden' );
    pendingTripsWindow.classList.remove( 'hidden' );
}

function displayDestinationsInDropDown( ) {
    destinationsRepository.destinations.forEach( destination => {
        destinationDropDown.innerHTML += `<option name='destination' value="${ destination.id }">${ destination.destination }</option>`
    } );
}