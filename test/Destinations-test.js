import chai from 'chai';
const expect = chai.expect;
import Destinations from '../src/Destinations';
import destinationsData from '../dist/sampleData/sampleData-Destinations';

describe('Destinations', () => {
  let newDestinations1;
  let newDestinations2;
  beforeEach(() => {
    newDestinations1 = new Destinations(destinationsData[0]);
    newDestinations2 = new Destinations(destinationsData[1]);
  })
  it('should be a function', () => {
    expect(Destinations).to.be.a('function');
  });
  it('should instanciate a new Destination', () => {
    expect(newDestinations1).to.instanceOf(Destinations);
    expect(newDestinations2).to.instanceOf(Destinations);
  });
  it('should have an id for the Destination', () => {
    expect(newDestinations1.id).to.equal(1);
    expect(newDestinations2.id).to.equal(2);
  });
  it('should have a destination for the Destination', () => {
    expect(newDestinations1.destination).to.equal("Lima, Peru");
    expect(newDestinations2.destination).to.equal("Stockholm, Sweden");
  });
  it('should have an estimatedLodgingCostPerDay for the Destination', () => {
    expect(newDestinations1.estimatedLodgingCostPerDay).to.equal(70);
    expect(newDestinations2.estimatedLodgingCostPerDay).to.equal(100);
  });
  it('should have an estimatedFlightCostPerPerson for the Destination', () => {
    expect(newDestinations1.estimatedFlightCostPerPerson).to.equal(400);
    expect(newDestinations2.estimatedFlightCostPerPerson).to.equal(780);
  });
  it('should have an image of the Destination', () => {
    expect(newDestinations1.image).to.equal("https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80");
    expect(newDestinations2.image).to.equal("https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
  });
  it('should have an alt for each image of the Destination', () => {
    expect(newDestinations1.alt).to.equal("overview of city buildings with a clear sky");
    expect(newDestinations2.alt).to.equal("city with boats on the water during the day time");
  });
});


