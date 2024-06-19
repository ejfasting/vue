<template>
  <h1>The header 5</h1>
  <div class="editor" ref="editorContainer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import customWorker from './custom.worker?worker'
import type { LanguageService } from '@volar/language-service'
import { activateMarkers, activateAutoInsertion, registerProviders } from '@volar/monaco'
import { customLanguage } from './constants'
import { getOrCreateModel } from './utils'
import { getHighlighter } from 'shiki'
import { shikiToMonaco } from '@shikijs/monaco'

export default defineComponent({
  name: 'MonacoEditor',
  setup() {
    const editorContainer = ref<HTMLElement | null>(null)
    let editorInstance: monaco.editor.IStandaloneCodeEditor | null = null
    const modelUri = monaco.Uri.parse('file:///main.' + customLanguage.id)

    onMounted(async () => {
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
        themes: ['andromeeda']
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

      const model = getOrCreateModel(modelUri, customLanguage.id, customLanguage.initialCode)

      if (editorContainer.value) {
        editorInstance = monaco.editor.create(editorContainer.value, {
          //theme: 'vs-dark',
          model: model
        })
      }
    })

    onBeforeUnmount(() => {
      if (editorInstance) {
        editorInstance.dispose()
      }
    })

    return {
      editorContainer
    }
  }
})
</script>

<style>
.editor {
  width: 100%;
  height: 50vh;
}
</style>
