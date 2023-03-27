import { Client, Logger } from "hass-ts";
import { getEntities } from "../get-entities";
import { switchHeatingInAllRoomsOff } from "./switch-heating-in-all-rooms-off";
import { switchHeatingInAllRoomsBackOn } from "./switch-heating-in-all-rooms-back-on";
import { getTimeout } from "./get-timeout";

export const initialise = (client: Client, logger: Logger) => {
  let timeout: NodeJS.Timer | undefined;

  const { personalCalendar } = getEntities(client);

  personalCalendar.onStartEvent(async (event) => {
    if (event.location) {
      logger.info(`Event with location detected. Switching HVAC off`);
    }

    await switchHeatingInAllRoomsOff(client);

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      logger.info(`Event ends in 30 minutes. Switching HVAC back on`);
      switchHeatingInAllRoomsBackOn(client);
      timeout = undefined;
    }, getTimeout(event.end, 30));
  });
};
