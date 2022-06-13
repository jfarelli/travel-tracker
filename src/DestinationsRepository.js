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
        const destination = this.getDestinationsbyId( whereAreWeGoing );
        const totalFlightCost = howManyAreGoing * destination.estimatedFlightCostPerPerson;
        const totalHousingCost = howLongAreWeStaying * destination.estimatedLodgingCostPerDay;
        const totalWithAgentFees = parseFloat( ( totalFlightCost + totalHousingCost ) * 1.1 );
        return parseFloat( totalWithAgentFees.toFixed( 2 ) );
    }
}

    



   




export default DestinationsRepository;