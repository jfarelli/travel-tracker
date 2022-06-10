import Destinations from '../src/Destinations';

class DestinationsRepository {
    constructor(data) {
        this.destinations = data.map(obj => { return new Destinations(obj) });
    }

    getDestinations(id){
        const data = this.destinations.find((destination) => {
            if(destination.id === id){
                return destination;
            }
        })
        return data;
    }
}


export default DestinationsRepository;