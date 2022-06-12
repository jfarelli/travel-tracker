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
   
    // present trips => 
    // pending trips =>
    
}


export default TripsRepository;