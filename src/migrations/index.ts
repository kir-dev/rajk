import * as migration_20251027_134023_events_rework from './20251027_134023_events_rework';
import * as migration_20251103_192138 from './20251103_192138';
import * as migration_20251201_073702 from './20251201_073702';

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
    up: migration_20251201_073702.up,
    down: migration_20251201_073702.down,
    name: '20251201_073702'
  },
];
