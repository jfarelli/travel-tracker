import {getData} from './apiCalls';
import './css/styles.css';
import './images/turing-logo.png'

// >>>>>> Gloval Variables <<<<<<
var travelersData;
var tripsData;
var destinationsData;

// >>>>>> Event Listenerts <<<<<<
window.addEventListener('load', loadData);






const loadData = () => {
    Promise.all([getData('travelers'), getData('trips'), getData('destinations')]).then(data => {
        travelersData = data[0].travelersData
        tripsData = data[1].tripsData
        destinationsData = data[2].destinationsData
    });
}