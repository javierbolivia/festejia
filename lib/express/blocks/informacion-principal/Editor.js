'use client'
import BlockEditorForm from '../BlockEditorForm'
import schema from './schema'

export default function InformacionPrincipalEditor(props) {
  return <BlockEditorForm schema={schema} {...props} />
}
