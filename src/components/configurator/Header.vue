<template>
  <div class="header">
    <div class="config-name">
      <input class="header-input" type="text" v-model="configName" />
    </div>
    <div class="controls">
      <UploadButton @upload="handleUpload" />
      <button class="btn" @click="clearConfig">Clear</button>
      <button class="btn" @click="$emit('save', configName)">Save</button>
    </div>
  </div>
</template>

<script>
import UploadButton from '@/components/configurator/UploadButton.vue'

const DEFAULT_CONFIG_NAME = 'Untitled config'

export default {
  emits: ['clear', 'save', 'config-uploaded'],
  data() {
    return {
      configName: DEFAULT_CONFIG_NAME
    }
  },
  components: {
    UploadButton
  },
  methods: {
    handleUpload(file) {
      let { config, filename } = file
      if (filename.endsWith('.json')) {
        filename = filename.slice(0, filename.length - 5)
      }
      this.configName = filename
      this.$emit('config-uploaded', config)
    },
    clearConfig() {
      this.configName = DEFAULT_CONFIG_NAME
      this.$emit('clear')
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
