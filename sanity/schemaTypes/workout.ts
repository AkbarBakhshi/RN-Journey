import { defineField, defineType } from 'sanity'
import dayjs from 'dayjs';

export default defineType({
    name: 'workout',
    title: 'Workout',
    type: 'document',
    fields: [
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
            validation: Rule => Rule.required(),
            options: {
                dateFormat: 'YYYY-MM-DD'
            }
        }),
        defineField({
            name: 'warmup',
            title: 'Warmup',
            type: 'text'
        }),
        defineField({
            name: 'strength',
            title: 'Strength',
            type: 'text'
        }),
        defineField({
            name: 'workout',
            title: 'Final Workout',
            type: 'text',
        }),
        defineField({
            name: 'type',
            title: 'Score type',
            type: 'string',
            options: {
                list: [
                    { title: 'Time', value: 'time' },
                    { title: 'Sets & Reps', value: 'setReps' },
                    { title: 'Number Input (Cals, etc.)', value: 'number' },
                ]
            },
        }),
    ],
    preview: {
        select: {
            date: 'date'
        },
        prepare(selection) {
            const { date } = selection
            console.log(selection)
            return {
                title: `${dayjs(date).format('ddd, MMMM D, YYYY')}`,
            }
        }
    }
})
