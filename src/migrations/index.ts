import * as migration_20251027_134023_events_rework from './20251027_134023_events_rework';
import * as migration_20251103_192138 from './20251103_192138';
import * as migration_20251113_183716 from './20251113_183716';
import * as migration_20251125_120736 from './20251125_120736';
import * as migration_20251130_203245_add_additional_awardee_fields from './20251130_203245_add_additional_awardee_fields';
import * as migration_20251130_220014_extend_awardees_with_publications_and_related_content from './20251130_220014_extend_awardees_with_publications_and_related_content';
import * as migration_20251202_213127_add_ceremony_video_to_awardee from './20251202_213127_add_ceremony_video_to_awardee';
import * as migration_20251202_213803_add_lecture_video_to_awardees from './20251202_213803_add_lecture_video_to_awardees';
import * as migration_20251202_215042_add_extended_justification_for_awardees from './20251202_215042_add_extended_justification_for_awardees';
import * as migration_20251202_215433_extended_justification_is_nullable from './20251202_215433_extended_justification_is_nullable';
import * as migration_20251202_220232_group_websites_of_awardees from './20251202_220232_group_websites_of_awardees';
import * as migration_20251204_144742_add_about_en_to_award from './20251204_144742_add_about_en_to_award';
import * as migration_20251206_214500_fix_missing_awards_rels from './20251206_214500_fix_missing_awards_rels';

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
    name: '20251125_120736',
  },
  {
    up: migration_20251130_203245_add_additional_awardee_fields.up,
    down: migration_20251130_203245_add_additional_awardee_fields.down,
    name: '20251130_203245_add_additional_awardee_fields',
  },
  {
    up: migration_20251130_220014_extend_awardees_with_publications_and_related_content.up,
    down: migration_20251130_220014_extend_awardees_with_publications_and_related_content.down,
    name: '20251130_220014_extend_awardees_with_publications_and_related_content',
  },
  {
    up: migration_20251202_213127_add_ceremony_video_to_awardee.up,
    down: migration_20251202_213127_add_ceremony_video_to_awardee.down,
    name: '20251202_213127_add_ceremony_video_to_awardee',
  },
  {
    up: migration_20251202_213803_add_lecture_video_to_awardees.up,
    down: migration_20251202_213803_add_lecture_video_to_awardees.down,
    name: '20251202_213803_add_lecture_video_to_awardees',
  },
  {
    up: migration_20251202_215042_add_extended_justification_for_awardees.up,
    down: migration_20251202_215042_add_extended_justification_for_awardees.down,
    name: '20251202_215042_add_extended_justification_for_awardees',
  },
  {
    up: migration_20251202_215433_extended_justification_is_nullable.up,
    down: migration_20251202_215433_extended_justification_is_nullable.down,
    name: '20251202_215433_extended_justification_is_nullable',
  },
  {
    up: migration_20251202_220232_group_websites_of_awardees.up,
    down: migration_20251202_220232_group_websites_of_awardees.down,
    name: '20251202_220232_group_websites_of_awardees',
  },
  {
    up: migration_20251204_144742_add_about_en_to_award.up,
    down: migration_20251204_144742_add_about_en_to_award.down,
    name: '20251204_144742_add_about_en_to_award',
  },
  {
    up: migration_20251206_214500_fix_missing_awards_rels.up,
    down: migration_20251206_214500_fix_missing_awards_rels.down,
    name: '20251206_214500_fix_missing_awards_rels',
  },
];
