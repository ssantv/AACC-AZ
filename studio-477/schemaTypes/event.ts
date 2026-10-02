import { CalendarIcon } from '@sanity/icons/Calendar'
import { defineField, defineType } from 'sanity'

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
      name: 'datetime',
      title: 'Hora',
      type: 'datetime',
      options: {
        timeFormat: 'HH:mm',
        displayTimeZone: 'Europe/Madrid',
      },
    }),

    defineField({
      name: 'summary',
      title: 'Detalles',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'location',
      title: 'Lugar',
      type: 'string',
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Enlace para apuntarse',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: 'Fecha, próximas primero',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'date' },
  },
})