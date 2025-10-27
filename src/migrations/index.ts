import * as migration_20251027_134023_events_rework from './20251027_134023_events_rework';

export const migrations = [
  {
    up: migration_20251027_134023_events_rework.up,
    down: migration_20251027_134023_events_rework.down,
    name: '20251027_134023_events_rework'
  },
];
