# Demo: Conceptual demo of (faked) in-going data being transformed and emitted as events to consumer systems

This demonstration project illustrates a local pseudo example of an architecture that:

- Takes in data continuously
- Stores data in a central resource
- Streams the data out into downstream subscribers
- Enables downstream systems to expose public endpoints to access data aggregates using their local data

## Structure

The application is composed of the systems: The `EventStore` that takes in data and the `Enricher` that subscribes to relevant data streams.

### EventStore

The `EventStore` is the component that gets called when data flows into our imaginary system. All data should be stored here, and then streamed as an event (using the method `streamEvent()`) into any subscribing downstream systems.

- `src/EventStore/domain/repositories/`: Repository implementation
- `src/EventStore/interfaces/`: Interfaces for various things

### Enricher

The `Enricher` is a system/API that subscribes to events emitted by the `EventStore`. It will store data locally and expose a public endpoint, `/getVehicleData`, to return a `VehicleData` aggregate.

- `src/Enricher/application/api/`: API implementation
- `src/Enricher/domain/repositories/`: Repository implementation
- `src/Enricher/interfaces/`: Interfaces for various things

### Other

- `testdata/`: Test data (actually just empty but anyway)
- `index.ts`: Main function to orchestrate the running of the demo
