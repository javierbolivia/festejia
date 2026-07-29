'use client'
import BlockEditorForm from '../BlockEditorForm'
import schema from './schema'

export default function SoloAdultosEditor(props) {
  return <BlockEditorForm schema={schema} {...props} />
}
