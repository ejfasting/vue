<template>
  <div class="editor-container">
    <h2 style="text-align: center">Monaco editor</h2>
    <div class="editor" ref="editorContainer">
      <nav class="editor-toolbar">
        <div class="toolbar-left">
          <label for="theme-select">Theme:</label>
          <select id="theme-select" v-model="selectedTheme" @change="changeTheme">
            <option v-for="theme in themes" :key="theme" :value="theme">{{ theme }}</option>
          </select>
        </div>
      </nav>
      <button id="btn-screen-mode" title="Toggle fullscreen" class="enter-fullscreen" @click="toggleFullscreen"></button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import * as monaco from 'monaco-editor';
import { customLanguage, themes } from './constants';
import { setupEditor } from './editorSetup';
import { getOrCreateModel } from './utils';
//import { setupYjs } from './yjsSteup';

export default defineComponent({
  name: 'MonacoEditor',
  async setup() {
    const editorContainer = ref<HTMLElement | null>(null);
    const selectedTheme = ref(themes[0]); // Default to the first theme
    let editorInstance: monaco.editor.IStandaloneCodeEditor | null = null;
    const modelUri = monaco.Uri.parse('file:///main.' + customLanguage.id);
    let fullscreen = false;

    const handleResize = () => {
      if (editorInstance) {
        editorInstance.layout();
      }
    };

    const changeTheme = () => {
      if (editorInstance) {
        monaco.editor.setTheme(selectedTheme.value);
      }
    };

    const toggleFullscreen = () => {
      const element = document.querySelector(".editor-container");
      const btn = document.getElementById("btn-screen-mode");
      if(!element || !btn) return console.error("Element not found");
      if(!fullscreen){
        if (element.requestFullscreen) {
            element.requestFullscreen().catch(err => {
              console.log(err);
            });
            btn.classList.remove("enter-fullscreen");
            btn.classList.add("exit-fullscreen");
            fullscreen = true;
          }
          else {
            console.log("Fullscreen not supported in this browser");
            return;
          }
      }
      else
      {
        document.exitFullscreen();
        fullscreen = false;
        btn.classList.remove("exit-fullscreen");
        btn.classList.add("enter-fullscreen");
      }
    };

    onMounted(async () => {
      await setupEditor();
      const model = getOrCreateModel(modelUri, customLanguage.id, customLanguage.initialCode);
      if (editorContainer.value) {
        editorInstance = monaco.editor.create(editorContainer.value, {
          model: model,
          language: customLanguage.id,
          theme: selectedTheme.value,
        });
        //setupYjs(editorInstance, customLanguage.initialCode);
        window.addEventListener('resize', handleResize);
      }
    });

    onBeforeUnmount(() => {
      if (editorInstance) {
        editorInstance.dispose();
      }
      window.removeEventListener('resize', handleResize);
    });

    return {
      editorContainer,
      selectedTheme,
      changeTheme,
      themes,
      toggleFullscreen,
    };
  },
});
</script>

<style>
.editor-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh; /* Full height to utilize entire viewport */
}

.editor-toolbar {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f3f3f3;
  border-bottom: 1px solid #ccc;
  justify-content: space-between; /* Space out items, pushing the button to the right */
}

.toolbar-left {
  display: flex;
  align-items: center; /* Vertically center the items in this div */
}

.editor-toolbar label {
  margin-right: 10px;
  color: black;
  transition: color 0.5s, background-color 0.5s;
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.editor-toolbar select {
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
}

.editor {
  flex-grow: 1;
  width: 100%;
  position: relative; /* Make the editor position relative to place the button absolutely inside it */
}

#btn-screen-mode {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 0;
  background-size: cover;
  cursor: pointer;
}

.enter-fullscreen {
  background-image: url(https://cdn.icon-icons.com/icons2/1674/PNG/512/expand_111060.png);
}
.exit-fullscreen {
  background-image: url(https://cdn.icon-icons.com/icons2/1674/PNG/512/collapse_111129.png);
}

</style>
