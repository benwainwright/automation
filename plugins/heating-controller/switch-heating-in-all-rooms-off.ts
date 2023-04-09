import { Client } from 'ts-automation';
import { entities } from './entities';

export const switchHeatingInAllRoomsOff = async (client: Client) => {
  const { gymClimate, bedroomClimate, livingRoomClimate } =
    client.getEntities(entities);

  await bedroomClimate.setHvacMode('off');
  await livingRoomClimate.setHvacMode('off');
  await gymClimate.setHvacMode('off');
};
