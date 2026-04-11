export default {
  name: 'proofPoint',
  title: 'Proof Point',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g., "300+", "87.5%"',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'What the stat represents',
    },
    {
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: ['industryStats', 'ourNumbers'],
      },
      description: 'Which section this stat appears in',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
}
