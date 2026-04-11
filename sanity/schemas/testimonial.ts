export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
    },
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Author Title/Company',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Author Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'author',
    },
    prepare(selection: any) {
      return {
        title: selection.author,
        subtitle: selection.quote.substring(0, 50) + '...',
      }
    },
  },
}
