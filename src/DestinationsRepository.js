import Destinations from '../src/Destinations';

class DestinationsRepository {
    constructor(data) {
        this.destinations = data.map((userObj) => { return new Destinations(userObj) });
    }

    getDestinations(id){
        const data = this.destinations.find((obj) => {
            if(obj.id === id){
                return obj;
            }
        })
        return data;
    }
}


export default DestinationsRepository;