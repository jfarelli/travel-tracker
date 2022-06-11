import chai from 'chai';
const expect = chai.expect;
import Travelers from '../src/Travelers';
import travelersData from '../dist/sampleData/sampleData-Travelers';

describe('Travelers', () => {
  let newTravelers1;
  let newTravelers2;
  beforeEach(() => {
    newTravelers1 = new Travelers(travelersData[0]);
    newTravelers2 = new Travelers(travelersData[1]);
  })
  it('should be a function', () => {
    expect(Travelers).to.be.a('function');
  });
  it('should instanciate a new Traveler', () => {
    expect(newTravelers1).to.instanceOf(Travelers);
    expect(newTravelers2).to.instanceOf(Travelers);
  });
  it('should have an id', () => {
    expect(newTravelers1.id).to.equal(1);
    expect(newTravelers2.id).to.equal(2);
  });
  it('should have a name', () => {
    expect(newTravelers1.name).to.equal('Ham Leadbeater');
    expect(newTravelers2.name).to.equal('Rachael Vaughten');
  });
  it('should have a travelersType', () => {
    expect(newTravelers1.travelerType).to.equal('relaxer');
    expect(newTravelers2.travelerType).to.equal('thrill-seeker');
  });
  it('should be able to return a Traveler\'s first name', () => {
    expect(newTravelers1.returnFirstName()).to.equal('Ham');
    expect(newTravelers2.returnFirstName()).to.equal('Rachael');
  });
});
