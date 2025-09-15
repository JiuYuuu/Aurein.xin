import { defineNotesConfig } from 'vuepress-theme-plume'
import read from './read'
import daily from './daily'

export default defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [
        read,
        daily
    ]
})