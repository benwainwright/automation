import { Client, HASS_HOST_ENV, HASS_PORT_ENV, HASS_TOKEN_ENV } from "@core";

import { getEnv } from "./libs/utils/get-env";
import dotEnv from "dotenv";
import { initialise } from "./automations/heating-controller";
import { logger } from "@core";

export const start = async () => {
  dotEnv.config();

  const host = getEnv(HASS_HOST_ENV);
  const token = getEnv(HASS_TOKEN_ENV);
  const port = Number(getEnv(HASS_PORT_ENV));

  const client = new Client(host, token, port, logger);
  await client.init();

  initialise(client, logger);
};

start().catch((error) => console.log(error));
