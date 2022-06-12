import tripsData from "../dist/sampleData/sampleData-Trips";
import Trips from "./Trips";
import TripsRepository from "./TripsRepository";
import dayjs from 'dayjs';
dayjs().format();

class DestinationsRepository {
    constructor( data ) {
        this.destinations = data;
    }

    getDestinationsbyId( id ) {
        // console.log(this.destinations.find( destination => destination.id === id ))
        return this.destinations.find( destination => destination.id === id )
    }

    getTripCostTotal( whereAreWeGoing , howManyAreGoing , howLongAreWeStaying ) {
        const destinationData = this.getDestinationsbyId( whereAreWeGoing );
        // console.log('TRIP ID: ', whereAreWeGoing)
        // console.log('PEOPLE GOING: ', howManyAreGoing)
        // console.log('DURATION: ', howLongAreWeStaying)
        const totalFlightCost = howManyAreGoing * destinationData.estimatedFlightCostPerPerson;
        // console.log('DESTINATION DATA: ', destinationData)
        // console.log("TOTAL FLIGHT COST: ", totalFlightCost)
        // console.log( 'FLIGHT COST: ', destinationData.estimatedFlightCostPerPerson )
       const totalHousingCost = howLongAreWeStaying * destinationData.estimatedLodgingCostPerDay;
    //  console.log('TOTAL LODGING: ', totalHousingCost)
        // console.log('LODGING COST: ', destinationData.estimatedLodgingCostPerDay)
       const totalWithAgentFees = ( totalFlightCost + totalHousingCost ) * 1.1;
       return parseFloat( totalWithAgentFees.toFixed( 2 ) );
    }

    getTripCostTotalForAllYear( userID ) {
        let newTrip = new TripsRepository( tripsData );
        const trips = newTrip.getTripsByUserId( userID )
        const tripsThisYear = trips.filter(trip => dayjs(trip.date).isAfter('2021'));
        const tripCostThisYear = tripsThisYear.reduce((acc, trip) => {
            let destination = this.getDestinationsbyId(trip.destinationID)
            acc += (destination.estimatedFlightCostPerPerson * trip.travelers) + (destination.estimatedLodgingCostPerDay * trip.duration * trip.travelers)
            return acc
        }, 0)
        return parseFloat( ( tripCostThisYear  * 1.1 ).toFixed( 2 ) );
        };
        

    }

    



   




export default DestinationsRepository;