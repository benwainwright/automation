import { Client, Entity } from "@core";
import { CalendarEvent, CalendarState } from "@types";

type StartEventCallback = (eventDetails: CalendarEvent) => void;
type FinishEventCallback = () => void;

export class Calendar<I extends `calendar.${string}`> {
  private entity: Entity<I>;

  constructor(private id: I, client: Client) {
    this.entity = new Entity(this.id, client);
  }

  isEventCurrentlyHappening() {
    return this.entity.state.state === "on";
  }

  get state() {
    return this.entity.state;
  }

  private parseAttributes(
    attributes: CalendarState["attributes"]
  ): CalendarEvent {
    return {
      ...attributes,
      start: new Date(attributes.start_time),
      end: new Date(attributes.end_time),
    };
  }

  public onStartEvent(callback: StartEventCallback) {
    this.entity.onStateChanged((oldState, newState) => {
      if (oldState.state === "off" && newState.state === "on") {
        callback(this.parseAttributes(newState.attributes));
      }
    });
  }

  public onFinishEvent(callback: FinishEventCallback) {
    this.entity.onStateChanged((oldState, newState) => {
      if (oldState.state === "on" && newState.state === "off") {
        callback();
      }
    });
  }
}
