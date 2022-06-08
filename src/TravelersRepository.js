import Travelers from '../src/Travelers';

class TravelersRepository {
    constructor(data) {
        this.travelers = data.map((userObj) => { return new Travelers(userObj) });
    }

    getTravelers(id){
        const data = this.travelers.find((obj) => {
            if(obj.id === id){
                return obj;
            }
        })
        return data;
    }
}


export default TravelersRepository;