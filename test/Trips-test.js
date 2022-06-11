import chai from 'chai';
const expect = chai.expect;
import Trips from '../src/Trips';
import tripsData from '../dist/sampleData/sampleData-Trips';

describe('Trips', () => {
  let newTrips1;
  let newTrips2;
  beforeEach(() => {
    newTrips1 = new Trips(tripsData[0]);
    newTrips2 = new Trips(tripsData[3]);
  })
  it('should be a function', () => {
    expect(Trips).to.be.a('function');
  });
  it('should instanciate a new Trip', () => {
    expect(newTrips1).to.instanceOf(Trips);
    expect(newTrips2).to.instanceOf(Trips);
  });
  it('should have an id for the Trip', () => {
    expect(newTrips1.id).to.equal(1);
    expect(newTrips2.id).to.equal(4);
  });
  it('should have a userID linked to the Trip', () => {
    expect(newTrips1.userID).to.equal(1);
    expect(newTrips2.userID).to.equal(2);
  });
  it('should have a destinationID for the Trip', () => {
    expect(newTrips1.destinationID).to.equal(1);
    expect(newTrips2.destinationID).to.equal(4);
  });
  it('should have a number of Travelers for the Trip', () => {
    expect(newTrips1.travelers).to.equal(1);
    expect(newTrips2.travelers).to.equal(5);
  });
  it('should have a date for the Trip', () => {
    expect(newTrips1.date).to.equal("2022/09/16");
    expect(newTrips2.date).to.equal("2022/10/04");
  });
  it('should have a duration for the Trip', () => {
    expect(newTrips1.duration).to.equal(8);
    expect(newTrips2.duration).to.equal(18);
  });
  it('should have a status for the Trip', () => {
    expect(newTrips1.status).to.equal("approved");
    expect(newTrips2.status).to.equal("approved");
  });
  it('should have a suggestedActivities for the Trip', () => {
    expect(newTrips1.suggestedActivities).to.deep.equal([]);
    expect(newTrips2.suggestedActivities).to.deep.equal([]);
  });
});
