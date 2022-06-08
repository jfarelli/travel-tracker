import {getData} from './apiCalls';
import './css/styles.css';
import './images/turing-logo.png'

// import Trips from './Trips';
// import Travelers from './Travelers';
// import Destinations from './Destinations';
import TripsRepository from './TripsRepository';

// >>>>>> Gloval Variables <<<<<<
var tripsData;
var travelersData;
var destinationsData;

var tripsRepository;

// >>>>>> Event Listenerts <<<<<<
window.addEventListener('load', loadData);






const loadData = () => {
    Promise.all([getData('trips'), getData('travelers'), getData('destinations')]).then(data => {
        tripsData = data[0].tripsData;
        travelersData = data[1].travelersData;
        destinationsData = data[2].destinationsData;
        tripsRepository = new TripsRepository(tripsData);

        
    });
}