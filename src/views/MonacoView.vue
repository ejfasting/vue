<script setup lang="ts">
import MonacoEditor from '../components/monaco/MonacoEditor.vue'
</script>

<template>
  <div class="monaco">
    <MonacoEditor />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .monaco {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
