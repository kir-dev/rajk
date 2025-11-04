import * as migration_20251027_134023_events_rework from './20251027_134023_events_rework';
import * as migration_20251103_192138 from './20251103_192138';

export const migrations = [
  {
    up: migration_20251027_134023_events_rework.up,
    down: migration_20251027_134023_events_rework.down,
    name: '20251027_134023_events_rework',
  },
  {
    up: migration_20251103_192138.up,
    down: migration_20251103_192138.down,
    name: '20251103_192138'
  },
];
