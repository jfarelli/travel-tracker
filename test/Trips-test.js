import chai from 'chai';
const expect = chai.expect;
import Trips from '../src/Trips';
import tripsData from '../dist/sampleData/sampleData-Trips';

describe('Trips', () => {
  let newTrips1;
  let newTrips2;
  beforeEach(() => {
    newTrips1 = new Trips(tripsData[0]);
    newTrips2 = new Trips(tripsData[1]);
  })
  it('should be a function', () => {
    expect(Trips).to.be.a('function');
  });
  it('should instanciate a new Trip', () => {
    expect(newTrips1).to.instanceOf(Trips);
    expect(newTrips2).to.instanceOf(Trips);
  });
  it('should have an id', () => {
    expect(newTrips1.id).to.equal(1);
    expect(newTrips2.id).to.equal(2);
  });
  it('should have a userID linked to the Trip', () => {
    expect(newTrips1.userID).to.equal(44);
    expect(newTrips2.userID).to.equal(35);
  });
  it('should have a userID linked to the Trip', () => {
    expect(newTrips1.userID).to.equal(44);
    expect(newTrips2.userID).to.equal(35);
  });
});
