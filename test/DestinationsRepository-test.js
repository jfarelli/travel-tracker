import { expect } from 'chai';
import destinationsData from '../dist/sampleData/sampleData-Destinations';
import DestinationsRepository from '../src/DestinationsRepository';

describe('Destinations Repository', () => {
    let destinations1 = [];
    let destinations2 = [];
    beforeEach(() => {
        destinations1 = new DestinationsRepository(destinationsData);
        destinations2 = new DestinationsRepository(destinationsData);
    })
    it('should be a function', () => {
      expect(DestinationsRepository).to.be.a('function');
    });
    it('should be able to get Destination data by id', () => {
        expect(destinations1.getDestinationsbyId(1)).to.deep.equal({
            "id": 1,
            "destination": "Lima, Peru",
            "estimatedLodgingCostPerDay": 70,
            "estimatedFlightCostPerPerson": 400,
            "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
            "alt": "overview of city buildings with a clear sky"
            });
        expect(destinations2.getDestinationsbyId(2)).to.deep.equal({
            "id": 2,
            "destination": "Stockholm, Sweden",
            "estimatedLodgingCostPerDay": 100,
            "estimatedFlightCostPerPerson": 780,
            "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            "alt": "city with boats on the water during the day time"
            });
    });
    it('should calculate TOTAL trip cost', () => {
       expect(destinations1.getTripCostTotal(1, 1, 8)).to.equal(1056.00);
       expect(destinations2.getTripCostTotal(2, 3, 4)).to.equal(3014.00);
    });
    
});