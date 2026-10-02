import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Evento',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre de la actividad',
      type: 'string',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'date',
      options: {dateFormat: 'DD/MM/YYYY'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Hora',
      type: 'string',
      description: 'Formato 24 horas, por ejemplo 18:30',
      validation: (rule) =>
        rule
          .required()
          .regex(/^([01]\d|2[0-3]):[0-5]\d$/, {name: 'hora', invert: false})
          .error('Usa el formato HH:mm, por ejemplo 18:30'),
    }),
    defineField({
      name: 'location',
      title: 'Lugar',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Detalles',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Enlace para apuntarse',
      type: 'url',
      description: 'Opcional. Por ejemplo, el enlace de un formulario de Google.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
  ],
  orderings: [
    {
      title: 'Fecha, próximas primero',
      name: 'dateAsc',
      by: [
        {field: 'date', direction: 'asc'},
        {field: 'time', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'title', date: 'date', time: 'time'},
    prepare: ({title, date, time}) => ({
      title,
      subtitle: [date, time].filter(Boolean).join(' · '),
    }),
  },
})