import './css/styles.css';
import './images/turing-logo.png'
import {getData} from './apiCalls';


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



const loadData = () => {
    Promise.all([getData('trips'), getData('travelers'), getData('destinations')]).then(data => {
        tripsData = data[0].tripsData;

        console.log(tripsData)

        travelersData = data[1].travelersData;
        destinationsData = data[2].destinationsData;
        tripsRepository = new TripsRepository(tripsData);
        travelersRepository = new TravelersRepository(travelersData);
        destinationsRepository = new DestinationsRepository(destinationsData);
    });
}