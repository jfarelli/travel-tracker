import dayjs from 'dayjs';
dayjs().format();

class TripsRepository {
    constructor( data ) {
        this.trips = data;
    }

    getTripsById( id ) {
        const dataById = this.trips.filter( trip => trip.id === id )
        return dataById;
    }

    getTripsByUserId( userID ) {
        const tripByUserId = this.trips.filter( trip => trip.userID === userID )
        return tripByUserId;
    }

    getPastTripsByUserID( userID ) {
        let travelerTripsTaken = this.getTripsByUserId( userID );
        let pastTrips = travelerTripsTaken.filter( trip => dayjs( trip.date ).isBefore( Date.now() ) )
        return pastTrips
    }

    getFutureTripsByUserID( userID ) {
        let travelerTripsTaken = this.getTripsByUserId( userID );
        let futureTrips = travelerTripsTaken.filter( trip => dayjs( trip.date ).isAfter( Date.now() ) )
        return futureTrips
    }

    getPendingTripsByUserID( userID ) {
        let travelerTripsTaken = this.getTripsByUserId( userID );
        let pendingTrips = travelerTripsTaken.filter( trip => {
            return trip.status === 'pending'; 
        }) 
        return pendingTrips
    }

    // present trips => 

   
    getTripCostTotalForAllYear( userID, destinationsRepository ) {
        const trips = this.getTripsByUserId( userID )
        const tripsThisYear = trips.filter( trip => dayjs( trip.date ).isAfter( '2022' ) );
        const tripCostThisYear = tripsThisYear.reduce( ( acc, trip ) => {
            let destination = destinationsRepository.getDestinationsbyId( trip.destinationID )
            acc += ( destination.estimatedFlightCostPerPerson * trip.travelers ) + ( destination.estimatedLodgingCostPerDay * trip.duration * trip.travelers )
            return acc
        }, 0)
        return parseFloat( ( tripCostThisYear  * 1.1 ).toFixed( 2 ) ).toLocaleString( 'en-US' ) ;
        };

    
}


export default TripsRepository;