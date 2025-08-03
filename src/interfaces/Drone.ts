import type { Point } from "geojson";

export interface Drone {
  serial_number : string,
  is_dangerous : boolean,
  dangerous_reason : string,
  last_location : Point,
  last_seen: string,
  last_height? : number,
  last_speed? : number
};