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
       return parseFloat(totalWithAgentFees.toFixed(2));
    }

    



   

}


export default DestinationsRepository;