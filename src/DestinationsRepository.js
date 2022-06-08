import Destinations from '../src/Destinations';

class DestinationsRepository {
    constructor(data) {
        this.destination = data.map((userObj) => { return new Destinations(userObj) });
    }

    getDestinations(id){
        const data = this.destination.find((obj) => {
            if(obj.id === id){
                return obj;
            }
        })
        return data;
    }
}


export default DestinationsRepository;