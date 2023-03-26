import { Client, getConfig } from "@core";

import { initialise } from "./automations/heating-controller";
import { logger } from "@core";

export const start = async () => {
  logger.info(`Starting Ben's automation runner`);
  const { host, token, port, path } = getConfig();

  const client = new Client(host, token, logger, port, path);

  await client.init();

  initialise(client, logger);
};

start().catch((error) => console.log(error));
