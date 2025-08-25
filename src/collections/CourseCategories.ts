import { CollectionConfig } from 'payload';

export const CourseCategories: CollectionConfig = {
  slug: 'course-categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'color'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'The display name of the category',
      },
    },
    {
      name: 'id',
      type: 'text',
      required: true,
      admin: {
        description: 'Unique identifier for the category (e.g., "arts", "science")',
      },
    },
    {
      name: 'color',
      type: 'text',
      required: true,
      admin: {
          description: 'A color code for the category, e.g. "#ff5733"',
      }
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'A brief description of this course category',
      },
    },
  ],
};

export default CourseCategories;
