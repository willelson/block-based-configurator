<template>
  <div class="header">
    <div class="config-name">
      <input class="header-input" type="text" v-model="configName" />
    </div>
    <div class="controls">
      <UploadButton @upload="handleUpload" />
      <button class="btn" @click="$emit('clear')">Clear</button>
      <button class="btn" @click="$emit('save', configName)">Save</button>
    </div>
  </div>
</template>

<script>
import UploadButton from '@/components/configurator/UploadButton.vue'

export default {
  emits: ['clear', 'save', 'config-uploaded'],
  data() {
    return {
      configName: 'Untitled config'
    }
  },
  components: {
    UploadButton
  },
  methods: {
    handleUpload(file) {
  methods: {}
      const { config, filename } = file
      this.configName = filename
      this.$emit('config-uploaded', config)
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 16px;
}
.header-input {
  border: none;
  padding: 8px 16px;
  border-radius: var(--border-radius);
}

.header-input:focus {
  outline: 2px solid var(--black);
}
</style>
