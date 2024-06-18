<template>
    <div class="editor" ref="editorContainer"></div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { editor } from 'monaco-editor';
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
    import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
    import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
    import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
    import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
    import jsfsoWorker from './jsfso.worker?worker'

  export default defineComponent({
    name: 'MonacoEditor',
    setup() {
      const editorContainer = ref(document.createElement('div'));
      onMounted(async () => {
        self.MonacoEnvironment = {
            getWorker(_, label) {
                if (label === 'json') {
                return new jsonWorker()
                }
                if (label === 'css' || label === 'scss' || label === 'less') {
                return new cssWorker()
                }
                if (label === 'html' || label === 'handlebars' || label === 'razor') {
                return new htmlWorker()
                }
                if (label === 'typescript' || label === 'javascript') {
                return new tsWorker()
                }
                if(label === 'jsfso') {
                    return new jsfsoWorker()
                }
                return new editorWorker()
            }
            }

        return editor.create(editorContainer.value, {
            value: "function hello() {\n\talert('Hello world!');\n}",
            language: 'jsfso'
        });
      });
      return {
        editorContainer
      };
    },

  });

  </script>
  
  <style>
  .editor {
    width: 100%;
    height: 50vh;
  }
  </style>