/**
 * @description Concrete implementation of an event store (data storage).
 */
export type ConcreteEventStore = any[];

/**
 * @description Input when instantiating a new EventStore.
 */
export type EventStoreInput = {
  startingData: ConcreteEventStore;
  subscribers: any[];
};
