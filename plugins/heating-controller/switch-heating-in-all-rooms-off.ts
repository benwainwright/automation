import { Client } from "hass-ts";
import { getEntities } from "./get-entities";

export const switchHeatingInAllRoomsOff = async (client: Client) => {
  const { bedroomClimate, livingRoomClimate, gymClimate } = getEntities(client);

  await bedroomClimate.setHvacMode("off");
  await livingRoomClimate.setHvacMode("off");
  await gymClimate.setHvacMode("off");
};
