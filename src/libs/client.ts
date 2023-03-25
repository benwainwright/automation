import { HomeAssistantApi } from "./home-assistant-api";

export class Client {
  private hassApi: HomeAssistantApi;

  public constructor(private host: string, private token: string) {
    this.hassApi = new HomeAssistantApi(this.host, this.token);
  }

  public async init() {
    this.hassApi.init();
  }

  public onStateChanged(callback: (data: unknown) => void) {
    this.hassApi.get.on("state_changed", callback);
  }
}
