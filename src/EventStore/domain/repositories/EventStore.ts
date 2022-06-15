import { ConcreteEventStore } from '../../interfaces/EventStore';
import { API } from '../../../Enricher/interfaces/API';
import { EventStoreInput } from '../../interfaces/EventStore';

/**
 * @description Factory function to return new EventStore.
 */

export const createNewEventStore = (eventStoreInput: EventStoreInput) => {
  const { startingData, subscribers } = eventStoreInput;
  return new EventStore(startingData, subscribers);
};

/**
 * @description Contains all events/messages, streamed in as they happen.
 */
export class EventStore {
  /**
   * @description Starting store.
   */
  eventStore: ConcreteEventStore;
  /**
   * @description APIs that subscribe to this event store.
   */
  subscribers: API[];

  constructor(eventStore: ConcreteEventStore, subscribers: any[]) {
    this.eventStore = eventStore;
    this.subscribers = subscribers;
  }

  /**
   * @description Add a new item to event store.
   */
  public add(event: Record<string, any>) {
    this.eventStore.push(event);

    if (this.subscribers && this.subscribers.length > 0) {
      this.subscribers.forEach((subscriber: any) => this.streamEvent(event, subscriber));
    }
  }

  /**
   * @description Get single item.
   */
  public get(eventId: string) {
    return this.eventStore.filter((eventStoreItem: any) => eventStoreItem === eventId);
  }

  /**
   * @description Get all items.
   */
  public getAll() {
    return this.eventStore.filter((eventStoreItem: any) => eventStoreItem);
  }

  /**
   * @description Stream data to consumers. "Pseudo solution" since we don't
   * actually have real infrastructure in place.
   */
  private streamEvent(event: Record<string, any>, subscriber: API) {
    subscriber.stream(event);
  }
}
