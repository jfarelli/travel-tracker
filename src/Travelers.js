class Travelers {
    constructor( travelersData ) {
        this.id = travelersData.id;
        this.name = travelersData.name;
        this.travelerType = travelersData.travelerType
    }

    returnFirstName( ) {
        return this.name.split(' ')[ 0 ];
    }
}



export default Travelers;