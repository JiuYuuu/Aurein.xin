import { defineNotesConfig } from 'vuepress-theme-plume'
import read from './read'
import daily from './daily'
import CS61B from './CS61B'
import TV from './TV'

export default defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [
        read,
        daily,
        CS61B,
        TV
    ]
})