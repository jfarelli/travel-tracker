import { expect } from 'chai';
import TripsRepository from '../src/TripsRepository';
import tripsData from '../dist/sampleData/sampleData-Trips';

describe('Trips Repository', () => {
    let trips1;
    let trips2;
    beforeEach(() => {
        trips1 = new TripsRepository(tripsData);
        trips2 = new TripsRepository(tripsData);
    })
    it('should be a function', () => {
      expect(TripsRepository).to.be.a('function');
    });
    it('should be able to get Trips data by id', () => {
        expect(trips1.getTrips(1)).to.deep.equal({
            "id": 1,
            "userID": 44,
            "destinationID": 49,
            "travelers": 1,
            "date": "2022/09/16",
            "duration": 8,
            "status": "approved",
            "suggestedActivities": []
        });
        expect(trips2.getTrips(2)).to.deep.equal({
            "id": 2,
            "userID": 35,
            "destinationID": 25,
            "travelers": 5,
            "date": "2022/10/04",
            "duration": 18,
            "status": "approved",
            "suggestedActivities": []
        });
    });
});