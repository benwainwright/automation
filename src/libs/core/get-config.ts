import { getEnv } from "@utils";
import {
  HASS_HOST_ENV,
  HASS_PORT_ENV,
  HASS_TOKEN_ENV,
  SUPERVISOR_TOKEN_ENV,
} from "./constants";

import dotEnv from "dotenv";

export const getConfig = () => {
  dotEnv.config();
  const host = getEnv(HASS_HOST_ENV);
  const port = process.env[HASS_PORT_ENV];
  const supervisorToken = process.env[SUPERVISOR_TOKEN_ENV];
  const token = supervisorToken || getEnv(HASS_TOKEN_ENV);
  const path = supervisorToken ? `/core/websocket` : undefined;

  return { host, port: port ? Number(port) : undefined, token, path };
};
