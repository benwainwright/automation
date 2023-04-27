import { InputBooleanState } from 'hass-ts';

export type SwitchListener = (
  oldState: InputBooleanState,
  newState: InputBooleanState
) => void;
