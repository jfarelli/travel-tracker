import Trips from '../src/Trips';

class TripsRepository {
    constructor(data) {
        this.trips = data.map((userObj) => { return new Trips(userObj) });
    }

    getTrips(id){
        const data = this.trips.find((obj) => {
            if(obj.id === id){
                return obj;
            }
        })
        return data;
    }
}


export default TripsRepository;