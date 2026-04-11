export default {
  name: 'pillar',
  title: 'SPM Pillar',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Pillar Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'icon',
      title: 'Icon Name (from lucide-react)',
      type: 'string',
      description: 'e.g., BarChart3, Target, Users',
    },
    {
      name: 'color',
      title: 'Icon Color',
      type: 'string',
      options: {
        list: ['red', 'blue'],
      },
      initialValue: 'red',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
}
