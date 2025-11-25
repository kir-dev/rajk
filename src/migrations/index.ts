import * as migration_20251027_134023_events_rework from './20251027_134023_events_rework';
import * as migration_20251103_192138 from './20251103_192138';
import * as migration_20251113_183716 from './20251113_183716';
import * as migration_20251125_120736 from './20251125_120736';

export const migrations = [
  {
    up: migration_20251027_134023_events_rework.up,
    down: migration_20251027_134023_events_rework.down,
    name: '20251027_134023_events_rework',
  },
  {
    up: migration_20251103_192138.up,
    down: migration_20251103_192138.down,
    name: '20251103_192138',
  },
  {
    up: migration_20251113_183716.up,
    down: migration_20251113_183716.down,
    name: '20251113_183716',
  },
  {
    up: migration_20251125_120736.up,
    down: migration_20251125_120736.down,
    name: '20251125_120736'
  },
];
