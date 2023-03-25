import hass, { HassApi } from "homeassistant-ws";

export class HomeAssistantApi {
  private hassApi: HassApi | undefined;

  public constructor(
    private host: string,
    private token: string,
    private port: number,
    private path?: string
  ) {}

  public get get() {
    if (!this.hassApi) {
      throw new Error("Hass API has not been initialised. Please call .init()");
    }

    return this.hassApi;
  }

  public close() {
    this.hassApi = undefined;
  }

  public async init() {
    if (!this.hassApi) {
      this.hassApi = await hass({
        host: this.host,
        token: this.token,
        port: this.port,
        path: this.path,
      });
    }
  }
}
