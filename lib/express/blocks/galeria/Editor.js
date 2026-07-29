'use client'
import BlockEditorForm from '../BlockEditorForm'
import schema from './schema'

export default function GaleriaEditor(props) {
  return <BlockEditorForm schema={schema} {...props} />
}
