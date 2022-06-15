import { createNewEnricherAPI } from './src/Enricher/application/api/EnricherAPI';
import { createNewEventStore } from './src/EventStore/domain/repositories/EventStore';

// Setup
const emptyDataSet1 = JSON.parse(JSON.stringify([]));
const emptyDataSet2 = JSON.parse(JSON.stringify([]));
const enricherApi = createNewEnricherAPI(emptyDataSet1);
const eventStore = createNewEventStore({ startingData: emptyDataSet2, subscribers: [enricherApi] });

/**
 * @description Create some demo data that is (faked) streamed in.
 */
function streamInDemoData() {
  eventStore.add({ name: 'oaihdp98h2', data: 123 });
  eventStore.add({ name: 'jk1hr89a', data: 123 });
  eventStore.add({ name: 'ChassisData', data: 'some chassis data' });
  eventStore.add({ name: 'oaihdp98h2', data: 123 });
  eventStore.add({ name: 'jk1hr89a', data: 123 });
  eventStore.add({ name: 'oaihdp98h2', data: 123 });
  eventStore.add({ name: 'BondingMaterials', data: 'some bonding materials' });
  eventStore.add({ name: 'jk1hr89a', data: 123 });
  eventStore.add({ name: 'ECU', data: { modelNumber: 'abc123', assemblyId: 'asdf-1234-cn' } });

  // Get vehicle data from the API that consumed some of the demo events.
  const vehicleData = enricherApi.getVehicleData();
  console.log(JSON.stringify(vehicleData));
}

/**
 * @description Orchestrate the running of the application.
 */
function main() {
  streamInDemoData();
}

// Run
main();
