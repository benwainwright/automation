import { Client } from "./libs/client";
import { HASS_HOST_ENV, HASS_TOKEN_ENV } from "./libs/constants";
import { getEnv } from "./libs/get-env";

export const start = async () => {
  const host = getEnv(HASS_HOST_ENV);
  const token = getEnv(HASS_TOKEN_ENV);

  const client = new Client(host, token);
  await client.init();

  client.onStateChanged((data) => {
    console.log(data);
  });
};

start().catch((error) => console.log(error));
