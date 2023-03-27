import { Client } from "hass-ts";

import { initialise } from "./automations/heating-controller";
import { logger } from "@core";

export const start = async () => {

  const client = await Client.start(logger);

  initialise(client, logger);
};

start().catch((error) => console.log(error));
