import { Client } from 'ts-automation';
import { entities } from './entities';

export const switchHeatingInAllRoomsBackOn = async (client: Client) => {
  const { bedroomClimate, livingRoomClimate, gymClimate } = client.getEntities({
    gymClimate: 'climate.gym',
    livingRoomClimate: 'climate.living_room',
    bedroomClimate: 'climate.bedroom',
    personalCalendar: 'calendar.personal_calender'
  });

  await bedroomClimate.setHvacMode('heat');
  await livingRoomClimate.setHvacMode('heat');
  await gymClimate.setHvacMode('heat');
};
