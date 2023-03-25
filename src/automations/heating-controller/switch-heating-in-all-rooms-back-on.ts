import { Client } from "@core";
import { getEntities } from "../get-entities";

export const switchHeatingInAllRoomsBackOn = async (client: Client) => {
  const { bedroomClimate, livingRoomClimate, gymClimate } = getEntities(client);

  await bedroomClimate.setHvacMode("Heat");
  await livingRoomClimate.setHvacMode("Heat");
  await gymClimate.setHvacMode("Heat");
};
