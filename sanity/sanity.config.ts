import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'sanity',

  projectId: 'your-project-id',
  dataset: 'your-dataset-name',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
