import { Client } from "@core";
import { Calendar, Climate } from "@entities";

export const getEntities = (client: Client) => ({
  personalCalendar: new Calendar(`calendar.personal_calendar`, client),
  bedroomClimate: new Climate(`climate.bedroom`, client),
  livingRoomClimate: new Climate(`climate.living_room`, client),
  gymClimate: new Climate(`climate.gym`, client),
});
