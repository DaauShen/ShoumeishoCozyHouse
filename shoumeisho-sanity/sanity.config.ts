import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { cloudinaryAssetSourcePlugin, cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary'
import { structureTool } from 'sanity/structure'
import { MyStructure } from './deckStructure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Shoumeisho',

  projectId: 'nctb08jj',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(), 
    cloudinaryAssetSourcePlugin(), 
    cloudinarySchemaPlugin()
  ],

  schema: {
    types: schemaTypes,
  },

  structure: MyStructure,
})
