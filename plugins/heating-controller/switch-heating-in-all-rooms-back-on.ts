import { Client } from "hass-ts";
import { getEntities } from "./get-entities";

export const switchHeatingInAllRoomsBackOn = async (client: Client) => {
  const { bedroomClimate, livingRoomClimate, gymClimate } = getEntities(client);

  await bedroomClimate.setHvacMode("heat");
  await livingRoomClimate.setHvacMode("heat");
  await gymClimate.setHvacMode("heat");
};
