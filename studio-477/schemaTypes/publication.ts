import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

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
          {title: 'Noticia', value: 'noticia'},
          {title: 'Artículo', value: 'articulo'},
          {title: 'Entrevista', value: 'entrevista'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'interviewee',
      title: 'Persona entrevistada',
      type: 'string',
      hidden: ({parent}) => parent?.kind !== 'entrevista',
    }),
    defineField({
      name: 'interviewer',
      title: 'Entrevistador/a',
      type: 'string',
      hidden: ({parent}) => parent?.kind !== 'entrevista',
    }),
    defineField({
      name: 'series',
      title: 'Serie',
      type: 'string',
      options: {
        list: [
          {title: 'Ninguna', value: 'none'},
          {title: 'Tomando un café con', value: 'cafe'},
        ],
        layout: 'radio',
      },
      initialValue: 'none',
      hidden: ({parent}) => parent?.kind !== 'entrevista',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      hidden: ({parent}) => parent?.series === 'cafe',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {series?: string} | undefined
          if (parent?.series === 'cafe') return true
          if (!value) return 'El título es obligatorio'
          if (value.length > 160) return 'Máximo 160 caracteres'
          return true
        }),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: {
        source: (doc: any) =>
          doc?.series === 'cafe'
            ? `tomando-un-cafe-con-${doc?.interviewee || 'entrevista'}`
            : doc?.title,
        maxLength: 96,
      },
      hidden: ({parent}) => parent?.series === 'cafe',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {series?: string} | undefined
          if (parent?.series === 'cafe') return true
          if (!value?.current) return 'La URL es obligatoria'
          return true
        }),
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
      options: {hotspot: true},
      hidden: ({parent}) => parent?.series === 'cafe',
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
          type: 'object',
          name: 'interviewQA',
          title: 'Pregunta y respuesta',
          fields: [
            defineField({
              name: 'question',
              title: 'Pregunta',
              type: 'text',
              rows: 2,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Respuesta',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'question'},
            prepare({title}) {
              return {title: title || 'Pregunta y respuesta'}
            },
          },
        },
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
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'kind', interviewee: 'interviewee', series: 'series'},
    prepare({title, subtitle, interviewee, series}) {
      const labels: Record<string, string> = {
        noticia: 'Noticia',
        articulo: 'Artículo',
        entrevista:
          series === 'cafe'
            ? `Tomando un café con ${interviewee || ''}`.trim()
            : interviewee
              ? `Entrevista a ${interviewee}`
              : 'Entrevista',
      }
      return {title: series === 'cafe' ? (title || `Tomando un café con ${interviewee || ''}`.trim()) : title, subtitle: labels[subtitle] || subtitle}
    },
  },
})