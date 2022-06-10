import './css/styles.css';
import './images/turing-logo.png'
// import {getData} from './apiCalls';


import TripsRepository from './TripsRepository';
import TravelersRepository from './TravelersRepository';
import DestinationsRepository from './DestinationsRepository';


// >>>>>> Gloval Variables <<<<<<
var tripsData;
var travelersData;
var destinationsData;

var tripsRepository;
var travelersRepository;
var destinationsRepository;


// >>>>>> Event Listenerts <<<<<<
window.addEventListener('load', loadData);



// >>>>>> GET Data <<<<<<
const getData = (dataType) => {
    console.log(dataType)
    return fetch(`http://localhost:3001/api/v1/${dataType}`)
        .then(response => response.json())
        .catch(error => console.log(error));
}



function loadData() {
    Promise.all([getData('trips'), getData('travelers'), getData('destinations')]).then(data => {
        tripsData = data[0].trips;

        
        travelersData = data[1].travelers;
        console.log(travelersData)
        destinationsData = data[2].destinations;
        
        tripsRepository = new TripsRepository(trips);
        travelersRepository = new TravelersRepository(travelersData);
        destinationsRepository = new DestinationsRepository(destinationsData);
    });
}