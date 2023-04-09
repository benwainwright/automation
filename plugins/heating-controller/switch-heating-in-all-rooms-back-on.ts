import { Client } from 'ts-automation';
import { entities } from './entities';

export const switchHeatingInAllRoomsBackOn = async (client: Client) => {
  const { gymClimate, bedroomClimate, livingRoomClimate } =
    client.getEntities(entities);

  await bedroomClimate.setHvacMode('heat');
  await livingRoomClimate.setHvacMode('heat');
  await gymClimate.setHvacMode('heat');
};
