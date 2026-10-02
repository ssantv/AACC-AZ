import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { defineField, defineType } from 'sanity'

export const publication = defineType({
  name: 'publication',
  title: 'Publicación',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'kind',
      title: 'Tipo de publicación',
      type: 'string',
      options: {
        list: [
          { title: 'Noticia', value: 'noticia' },
          { title: 'Artículo', value: 'articulo' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Fecha de publicación',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Resumen',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'cover',
      title: 'Imagen de portada (opcional)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Descripción de la imagen',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Texto',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Descripción de la imagen',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'caption', title: 'Pie de foto', type: 'string'}),
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  orderings: [
    {
      title: 'Fecha, más recientes primero',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'kind' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle === 'articulo' ? 'Artículo' : 'Noticia' }
    },
  },
})
