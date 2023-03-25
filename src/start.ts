import {
  Client,
  Entity,
  HASS_HOST_ENV,
  HASS_PORT_ENV,
  HASS_TOKEN_ENV,
  Logger,
} from "@core";

import { getEnv } from "./libs/utils/get-env";
import dotEnv from "dotenv";

export const start = async () => {
  dotEnv.config();
  const logger = new Logger();
  const host = getEnv(HASS_HOST_ENV);
  const token = getEnv(HASS_TOKEN_ENV);
  const port = Number(getEnv(HASS_PORT_ENV));

  const client = new Client(host, token, port, logger);
  await client.init();

  const entity = new Entity("calendar.personal_calendar", client);
};

start().catch((error) => console.log(error));
