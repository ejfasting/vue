import { Uri, editor } from 'monaco-editor'

export function getOrCreateModel(uri: Uri, lang: string | undefined, value: string) {
  let model = editor.getModel(uri)
  if (!model) {
    model = editor.createModel(value, lang, uri)
  }
  return model
}
