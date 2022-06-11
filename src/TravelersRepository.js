class TravelersRepository {
    constructor( data ) {
        this.travelers = data;
    }

    getTravelers( id ) {
        const data = this.travelers.find( traveler => traveler.id === id )
        return data;
    }
}


export default TravelersRepository;