import { expect } from 'chai';
import TravelersRepository from '../src/TravelersRepository';
import travelersData from '../dist/sampleData/sampleData-Travelers';

describe('Travelers Repository', () => {
    let travelers1;
    let travelers2;
    beforeEach(() => {
        travelers1 = new TravelersRepository(travelersData);
        travelers2 = new TravelersRepository(travelersData);
    })
    it('should be a function', () => {
      expect(TravelersRepository).to.be.a('function');
    });
    it('should be able to get Travelers data by id', () => {
        expect(travelers1.getTravelers(1)).to.deep.equal({
            "id": 1,
            "name": "Ham Leadbeater",
            "travelerType": "relaxer"
            });
        expect(travelers2.getTravelers(2)).to.deep.equal({
            "id": 2,
            "name": "Rachael Vaughten",
            "travelerType": "thrill-seeker"
            });
    });
});