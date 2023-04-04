import { BaseEntity } from 'hass-ts';

export type Entity = keyof (typeof BaseEntity)['prototype'];
