import { Client, Entity } from "@core";
import { ClimateState } from "../types/climate-state";
import { ServiceCommand } from "../core/service-command";

type StateChangeCallback = (
  oldState: ClimateState,
  newState: ClimateState
) => void;

export class Climate<I extends `climate.${string}`> {
  private entity: Entity<I>;
  private setHvacModeCommand: ServiceCommand<"climate.set_hvac_mode">;

  constructor(private id: I, client: Client) {
    this.entity = new Entity(this.id, client);
    this.setHvacModeCommand = new ServiceCommand(
      "climate.set_hvac_mode",
      client
    );
  }

  public async setHvacMode(mode: string) {
    this.setHvacModeCommand.call({
      entity_id: this.id,
      hvac_mode: mode,
    });
  }

  public onStateChange(callback: StateChangeCallback) {
    this.entity.onStateChanged((oldState, newState) => {
      if (oldState.entity_id === this.id && newState.entity_id === this.id) {
        callback(oldState, newState);
      }
    });
  }
}
