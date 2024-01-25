<template>
  <div class="header">
    <div class="config-name">
      <input class="header-input" type="text" v-model="configName" />
    </div>
    <div class="controls">
      <button class="btn" @click="$emit('clear')">Clear</button>
      <button class="btn" @click="$emit('save', configName)">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['clear', 'save'],
  data() {
    return {
      configName: 'Untitled config'
    }
  },
  methods: {}
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

.btn {
  padding: 8px 16px;
  border-radius: var(--border-radius);
  border: 2px solid var(--light-grey);
  background-color: var(--light-grey);
  color: var(--black);
  cursor: pointer;
}
</style>
