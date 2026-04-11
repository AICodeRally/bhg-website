export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'Homepage',
    },
    {
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          initialValue: 'Modern SPM Intelligence',
        },
        {
          name: 'mainHeading',
          title: 'Main Heading',
          type: 'string',
          initialValue: 'The SPM Specialist Firm',
        },
        {
          name: 'highlightText',
          title: 'Highlighted Text in Heading',
          type: 'string',
          initialValue: 'SPM Specialist',
          description: 'Text that will be shown in gradient color',
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          initialValue: 'Built for Business Reinvention, Not Just Software Configuration',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'SPM implementations fail when treated as software projects. We scope what others miss, integrate what others break, and stay with you long after go-live.',
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Talk to a Specialist',
        },
        {
          name: 'secondaryCtaText',
          title: 'Secondary Button Text',
          type: 'string',
          initialValue: 'See How We Work',
        },
      ],
    },
    {
      name: 'stats',
      title: 'Hero Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Stat Number',
              type: 'string',
            },
            {
              name: 'label',
              title: 'Stat Label',
              type: 'string',
            },
          ],
        },
      ],
      initialValue: [
        { number: '300+', label: 'ICM Implementations' },
        { number: '200+', label: 'Years Combined Expertise' },
        { number: '8/8', label: 'Implementation Elements' },
      ],
    },
  ],
}
