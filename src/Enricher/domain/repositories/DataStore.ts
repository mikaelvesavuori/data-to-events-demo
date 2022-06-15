import { ConcreteDataStore } from '../../interfaces/DataStore';

/**
 * @description Factory function to return new DataStore.
 */
export const createNewDataStore = (dataStore: ConcreteDataStore) => new DataStore(dataStore);

/**
 * @description Contains all events/messages, streamed in as they happen.
 */
export class DataStore {
  /**
   * @description Starting store.
   */
  dataStore: ConcreteDataStore;

  constructor(dataStore: ConcreteDataStore) {
    this.dataStore = dataStore;
  }

  /**
   * @description Add a new item to event store.
   */
  add(item: Record<string, any>) {
    this.dataStore.push(item);
  }

  /**
   * @description Get single item.
   */
  get(itemName: string) {
    return this.dataStore.filter((dataStoreItem: any) => dataStoreItem === itemName);
  }

  /**
   * @description Get all items.
   */
  getAll() {
    return this.dataStore.filter((dataStoreItem: any) => dataStoreItem);
  }
}
