import Trips from '../src/Trips';

class TripsRepository {
    constructor(data) {
        this.trips = data.map( obj => new Trips(obj) );
        console.log('THIS.TRIPS: ', this.trips)
    }

    getTrips(id){
        const data = this.trips.find(trip => {
            if(trip.id === id){
                return trip;
            }
        })
        return data;
    }
}


export default TripsRepository;