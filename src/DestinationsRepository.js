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
        const totalWithAgentFees = ( ( totalFlightCost + totalHousingCost ) * 1.1 ).toFixed( 2 );
        return parseFloat( totalWithAgentFees.toLocaleString( 'en-US' ) );
    }
}

export default DestinationsRepository;