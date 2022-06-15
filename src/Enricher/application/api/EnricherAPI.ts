import { API } from '../../interfaces/API';
import { ConcreteDataStore } from '../../interfaces/DataStore';
import { VehicleData } from '../../interfaces/VehicleData';

/**
 * @description Factory function to produce a new Enricher API.
 */
export const createNewEnricherAPI = (dataStore: ConcreteDataStore) => new EnricherAPI(dataStore);

/**
 * @description The EnricherAPI is a demo of how an API could work,
 * using streamed-in data and project it in a custom, meaningful
 * aggregate shape (the `VehicleData`).
 */
class EnricherAPI implements API {
  dataStore: ConcreteDataStore;

  constructor(dataStore: ConcreteDataStore) {
    this.dataStore = dataStore;
  }

  /**
   * @description Add new event to data store.
   */
  private add(event: Record<string, any>): void {
    this.dataStore.push(event);
  }

  /**
   * @description Get record by `itemName` from data store.
   */
  private get(itemName: string): Record<string, any>[] {
    return this.dataStore.filter((item: any) => item.name === itemName);
  }

  /**
   * @description Return cleaned item from data store.
   */
  private getCleanedItem(itemName: string): Record<string, any> {
    const item = (this.get(itemName) && this.get(itemName)[0]) || {};
    if (item) delete item['name'];
    return item;
  }

  /**
   * @description Stream in event. Add pertinent matched events to our data store.
   */
  public stream(event: Record<string, any>): void {
    const matchedEvents = ['ChassisData', 'BondingMaterials', 'ECU'];
    if (matchedEvents.includes(event.name)) this.add(event);
  }

  /**
   * @description Public method to return `VehicleData` aggregate.
   */
  public getVehicleData(): VehicleData {
    const chassis: any = this.getCleanedItem('ChassisData');
    const bonding: any = this.getCleanedItem('BondingMaterials');
    const ecu: any = this.getCleanedItem('ECU');

    return {
      vehicle: {
        exterior: {
          chassis,
          bonding
        },
        internal: {
          ecu
        }
      }
    };
  }
}
