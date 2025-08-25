import { CollectionConfig } from 'payload';

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'position'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The name of the course',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'A brief description of the course',
      },
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'Link to the course details',
      },
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Book Open', value: 'BookOpen' },
        { label: 'Calculator', value: 'Calculator' },
        { label: 'Globe', value: 'Globe' },
        { label: 'Palette', value: 'Palette' },
        { label: 'Code', value: 'Code' },
        { label: 'Users', value: 'Users' },
        { label: 'Trending Up', value: 'TrendingUp' },
        { label: 'Lightbulb', value: 'Lightbulb' },
        { label: 'Target', value: 'Target' },
        { label: 'Database', value: 'Database' },
        { label: 'Settings', value: 'Settings' },
        { label: 'Puzzle', value: 'Puzzle' },
        { label: 'Monitor', value: 'Monitor' },
        { label: 'File Text', value: 'FileText' },
        { label: 'Search', value: 'Search' },
        { label: 'Bar Chart', value: 'BarChart' },
        { label: 'Download', value: 'Download' },
        { label: 'Message Circle', value: 'MessageCircle' },
        { label: 'Pen Tool', value: 'PenTool' },
        { label: 'Layers', value: 'Layers' },
      ],
      defaultValue: 'BookOpen',
      admin: {
        description: 'Icon to represent the course',
      },
    },
    {
      name: 'position',
      type: 'group',
      admin: {
        description: 'Position on the course map',
      },
      fields: [
        {
          name: 'top',
          type: 'text',
          required: true,
          defaultValue: '50%',
          admin: {
            description: 'Top position (e.g., "50%")',
          },
        },
        {
          name: 'left',
          type: 'text',
          required: true,
          defaultValue: '50%',
          admin: {
            description: 'Left position (e.g., "50%")',
          },
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'course-categories',
      required: true,
      admin: {
        description: 'The category this course belongs to',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: {
        description: 'Controls the order in which courses appear (lower numbers appear first)',
      },
    },
  ],
};

export default Courses;
