import { SwitchState } from 'hass-ts';

export type SwitchListener = (
  oldState: SwitchState,
  newState: SwitchState
) => void;
