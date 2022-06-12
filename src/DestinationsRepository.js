import tripsData from "../dist/sampleData/sampleData-Trips";
import TripsRepository from "./TripsRepository";
import dayjs from 'dayjs';
dayjs().format();

class DestinationsRepository {
    constructor( data ) {
        this.destinations = data;
    }

    getDestinationsbyId( id ) {
        return this.destinations.find( destination => destination.id === id )
    }

    getTripCostTotal( whereAreWeGoing , howManyAreGoing , howLongAreWeStaying ) {
        const destinationData = this.getDestinationsbyId( whereAreWeGoing );
        const totalFlightCost = howManyAreGoing * destinationData.estimatedFlightCostPerPerson;
        const totalHousingCost = howLongAreWeStaying * destinationData.estimatedLodgingCostPerDay;
        const totalWithAgentFees = ( totalFlightCost + totalHousingCost ) * 1.1;
        return parseFloat( totalWithAgentFees.toFixed( 2 ) );
    }

    // getTripCostTotalForAllYear( userID ) {
    //     let newTrip = new TripsRepository( tripsData );
    //     const trips = newTrip.getTripsByUserId( userID )
    //     const tripsThisYear = trips.filter(trip => dayjs(trip.date).isAfter('2022'));
    //     const tripCostThisYear = tripsThisYear.reduce((acc, trip) => {
    //         let destination = this.getDestinationsbyId(trip.destinationID)
    //         acc += (destination.estimatedFlightCostPerPerson * trip.travelers) + (destination.estimatedLodgingCostPerDay * trip.duration * trip.travelers)
    //         return acc
    //     }, 0)
    //     return parseFloat( ( tripCostThisYear  * 1.1 ).toFixed( 2 ) );
    //     };
    }

    



   




export default DestinationsRepository;