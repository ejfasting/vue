import { customLanguage, themes } from "./constants"
import customWorker from './custom.worker?worker'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { getHighlighter } from 'shiki'
import { shikiToMonaco } from '@shikijs/monaco'
import * as monaco from 'monaco-editor'
import type { LanguageService } from '@volar/language-service'
import { activateMarkers, activateAutoInsertion, registerProviders } from '@volar/monaco'

export async function setupEditor(): Promise<void> {
self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === customLanguage.id) {
        return new customWorker()
      }
      return new editorWorker()
    }
  }

  const highlighter = await getHighlighter({
    langs: ['typescript'],
    langAlias: {
      jsfso: 'typescript'
    },
    themes: themes
  })

  monaco.languages.register({
    id: customLanguage.id,
    extensions: [customLanguage.fileExtension]
  })

  // Register the themes from Shiki, and provide syntax highlighting for Monaco.
  shikiToMonaco(highlighter, monaco)

  monaco.languages.onLanguage(customLanguage.id, () => {
    const worker = monaco.editor.createWebWorker<LanguageService>({
      moduleId: 'vs/language/' + customLanguage.id + '/' + customLanguage.id + 'Worker',
      label: customLanguage.id
    })
    const getSyncUris = () => monaco.editor.getModels().map((model) => model.uri)
    activateMarkers(
      worker,
      [customLanguage.id],
      customLanguage.id + '-markers-owner',
      // sync files
      getSyncUris,
      monaco.editor
    )
    // auto close tags
    activateAutoInsertion(
      worker,
      [customLanguage.id],
      // sync files
      getSyncUris,
      monaco.editor
    )
    registerProviders(worker, [customLanguage.id], getSyncUris, monaco.languages)
  })
}