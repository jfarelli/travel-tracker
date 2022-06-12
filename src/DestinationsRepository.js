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
        // console.log("TOTAL FLIGHT COST: ", totalFlightCost)
       const totalHousingCost = howLongAreWeStaying * destinationData.estimatedLodgingCostPerDay;
       console.log('TOTAL HOUSING: ', totalHousingCost)
       const totalWithAgentFees = ( totalFlightCost + totalHousingCost ) * 1.1;
       return parseFloat(totalWithAgentFees.toFixed(2));
    }

    



   

}


export default DestinationsRepository;