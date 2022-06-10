import Travelers from '../src/Travelers';

class TravelersRepository {
    constructor(data) {
        this.travelers = data.map(obj => { return new Travelers(obj) });
    }

    getTravelers(id){
        const data = this.travelers.find((traveler) => {
            if(traveler.id === id){
                return traveler;
            }
        })
        return data;
    }
}


export default TravelersRepository;