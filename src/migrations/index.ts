import * as migration_20251115_001140_starter_schema from './20251115_001140_starter_schema';

export const migrations = [
  {
    up: migration_20251115_001140_starter_schema.up,
    down: migration_20251115_001140_starter_schema.down,
    name: '20251115_001140_starter_schema'
  },
];
