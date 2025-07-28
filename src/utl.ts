import { point } from "@turf/turf";
import type { Drone } from "./contexts/DronesContext";

export const updateDroneFromMessage = (topic: string, message: Buffer) => {
  const data = JSON.parse(message.toString());
  const serial = topic.split('/')[2];
  const newLocation = point([data.longitude, data.latitude]).geometry;
  const high =  data.height > 500;
  const fast =  data.horizontal_speed > 10;
  let reason = '';
  if (high && fast)
    reason = 'Flying higher than 500 meters and Moving faster than 10 m/s';
  else if (high)
    reason = 'Flying higher than 500 meters';
  else if (fast)
    reason = 'Moving faster than 10 m/s';

  const isDangerous = reason.length > 0;
  const now = new Date().toISOString();

  
  const drone : Drone = {
    last_location: newLocation,
    is_dangerous: isDangerous,
    dangerous_reason: reason,
    serial_number: serial,
    last_seen: now
  }

  return drone;
}