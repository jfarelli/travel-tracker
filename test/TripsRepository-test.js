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
        expect(trips1.getTripsById(1)).to.deep.equal
        ([
            {
                "id": 1,
                "userID": 1,
                "destinationID": 1,
                "travelers": 1,
                "date": "2022/09/16",
                "duration": 8,
                "status": "approved",
                "suggestedActivities": []
            }
        ]);
        expect(trips2.getTripsById(4)).to.deep.equal
        ([
            {
                "id": 4,
                "userID": 2,
                "destinationID": 4,
                "travelers": 5,
                "date": "2022/10/04",
                "duration": 18,
                "status": "approved",
                "suggestedActivities": []
            }
        ]);
    });
    it('should be able to get Trips data by UserID', () => {
        expect(trips1.getTripsByUserId(1)).to.deep.equal
        ([
            {
                "id": 1,
                "userID": 1,
                "destinationID": 1,
                "travelers": 1,
                "date": "2022/09/16",
                "duration": 8,
                "status": "approved",
                "suggestedActivities": []
            },
            {
                "id": 2,
                "userID": 1,
                "destinationID": 2,
                "travelers": 3,
                "date": "2019/08/30",
                "duration": 4,
                "status": "approved",
                "suggestedActivities": []
            },
            {
                "id": 3,
                "userID": 1,
                "destinationID": 3,
                "travelers": 1,
                "date": "2021/07/17",
                "duration": 5,
                "status": "approved",
                "suggestedActivities": []
            }
        ]);
        expect(trips2.getTripsByUserId(2)).to.deep.equal
        ([
            {
                "id": 4,
                "userID": 2,
                "destinationID": 4,
                "travelers": 5,
                "date": "2022/10/04",
                "duration": 18,
                "status": "approved",
                "suggestedActivities": []
            },
            {
                "id": 5,
                "userID": 2,
                "destinationID": 5,
                "travelers": 3,
                "date": "2021/06/29",
                "duration": 9,
                "status": "approved",
                "suggestedActivities": []
            },
            {
                "id": 6,
                "userID": 2,
                "destinationID": 6,
                "travelers": 5,
                "date": "2022/5/28",
                "duration": 20,
                "status": "approved",
                "suggestedActivities": []
            }
        ]);
    });
    it('should be able to get PAST Trips data by user ID', () => {
        expect(trips1.getPastTripsByUserID(1)).to.deep.equal
        ([
            {
                "id": 2,
                "userID": 1,
                "destinationID": 2,
                "travelers": 3,
                "date": "2019/08/30",
                "duration": 4,
                "status": "approved",
                "suggestedActivities": []
            },
            {
                "id": 3,
                "userID": 1,
                "destinationID": 3,
                "travelers": 1,
                "date": "2021/07/17",
                "duration": 5,
                "status": "approved",
                "suggestedActivities": []
            }
        ]);
        expect(trips2.getPastTripsByUserID(2)).to.deep.equal
        ([
            {
                "id": 5,
                "userID": 2,
                "destinationID": 5,
                "travelers": 3,
                "date": "2021/06/29",
                "duration": 9,
                "status": "approved",
                "suggestedActivities": []
            },
            {
                "id": 6,
                "userID": 2,
                "destinationID": 6,
                "travelers": 5,
                "date": "2022/5/28",
                "duration": 20,
                "status": "approved",
                "suggestedActivities": []
            } 
        ]);
    });
    
    it('should be able to get future Trips data', () => {
        expect(trips1.getFutureTripsByUserID(1)).to.deep.equal
        ([
            {
                "id": 1,
                "userID": 1,
                "destinationID": 1,
                "travelers": 1,
                "date": "2022/09/16",
                "duration": 8,
                "status": "approved",
                "suggestedActivities": []
            } 
        ]);
        expect(trips2.getFutureTripsByUserID(2)).to.deep.equal
        ([
            {
                "id": 4,
                "userID": 2,
                "destinationID": 4,
                "travelers": 5,
                "date": "2022/10/04",
                "duration": 18,
                "status": "approved",
                "suggestedActivities": []
                } 
        ]);
    });
    it('should calculate YEARLY TOTAL trip cost', () => {
        expect(trips1.getTripCostTotalForAllYear(1)).to.equal(1056);
        expect(trips2.getTripCostTotalForAllYear(2)).to.equal(20955);
     });
});