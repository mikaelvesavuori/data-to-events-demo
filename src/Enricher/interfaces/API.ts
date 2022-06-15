/**
 * @description Interface to APIs.
 */
export interface API {
  stream(event: Record<string, any>): void;
}
