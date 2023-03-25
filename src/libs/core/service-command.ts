import { Client } from "./client";

interface ServiceCommandMap {
  "climate.set_hvac_mode": {
    entity_id?: string;
    hvac_mode: string;
  };
}

export class ServiceCommand<I extends keyof ServiceCommandMap> {
  constructor(private id: I, private client: Client) {}

  public async call(fields: ServiceCommandMap[I]) {
    const [domain, service] = this.id.split(".");
    await this.client.callService(domain, service, fields);
  }
}
