/**
 * @description Vehicle data aggregate.
 */
export type VehicleData = {
  vehicle: {
    exterior: {
      chassis: Chassis;
      bonding: Bonding;
    };
    internal: {
      ecu: ECU;
    };
  };
};

/**
 * @description Chassis data.
 */
type Chassis = {
  /**
   * @description Data as string or object.
   */
  data: Record<string, any> | string;
};

/**
 * @description Bonding materials data.
 */
type Bonding = {
  /**
   * @description Data as string or object.
   */
  data: Record<string, any> | string;
};

/**
 * @description ECU data.
 */
type ECU = {
  /**
   * @description Data as string or object.
   */
  data: Record<string, any> | string;
};
