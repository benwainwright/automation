import { Client } from 'ts-automation';

export const switchHeatingInAllRoomsOff = async (client: Client) => {
  const [bedroomClimate, livingRoomClimate, gymClimate] = client.getEntities(
    'climate.bedroom',
    'climate.living_room',
    'climate.gym'
  );

  await bedroomClimate.setHvacMode('off');
  await livingRoomClimate.setHvacMode('off');
  await gymClimate.setHvacMode('off');
};
