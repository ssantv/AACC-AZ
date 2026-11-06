import {DoubleQuoteIcon} from '@sanity/icons/DoubleQuote'
import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  icon: DoubleQuoteIcon,
  fields: [
    defineField({
      name: 'relationship',
      title: 'Relación con las altas capacidades',
      type: 'string',
      options: {
        list: [
          {title: 'Madre', value: 'madre'},
          {title: 'Padre', value: 'padre'},
          {title: 'Persona con altas capacidades', value: 'persona-aacc'},
          {title: 'Docente', value: 'docente'},
          {title: 'Otro', value: 'otro'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'relationshipDetail',
      title: 'Relación (detalle)',
      type: 'string',
      hidden: ({parent}) => parent?.relationship !== 'otro',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {relationship?: string} | undefined
          if (parent?.relationship === 'otro' && !value) {
            return 'Indica la relación'
          }
          return true
        }),
    }),
    defineField({
      name: 'quote',
      title: 'Frase clave',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: 'story',
      title: 'Historia',
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
    defineField({
      name: 'date',
      title: 'Fecha de publicación',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Fecha, más recientes primero',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'quote', subtitle: 'relationship'},
    prepare({title, subtitle}) {
      const labels: Record<string, string> = {
        madre: 'Madre',
        padre: 'Padre',
        'persona-aacc': 'Persona con altas capacidades',
        docente: 'Docente',
        otro: 'Otro',
      }
      return {title, subtitle: subtitle ? labels[subtitle] || subtitle : undefined}
    },
  },
})