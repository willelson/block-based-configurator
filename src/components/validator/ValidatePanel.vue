<template>
  <div class="validate-panel padding-m">
    <label>Test object</label>
    <JsonEditorVue
      v-model="value"
      mode="text"
      :mainMenuBar="false"
      :navigationBar="false"
      :statusBar="false"
      style="flex: 1"
    />
    <ValidationMessage style="flex: 1" :state="state" @validate="validateTestObject" />
  </div>
</template>

<script>
import JsonEditorVue from 'json-editor-vue'
import ValidationMessage from '@/components/validator/ValidationMessage.vue'
import { validateConfig } from '@/scripts/validation.js'

import { mapState } from 'pinia'
import { useStore } from '@/stores/config.js'

const PENDING = 'pending'
const PASSED = 'passed'
const FAILED = 'failed'

export default {
  data() {
    return {
      value: '',
      state: PENDING
    }
  },
  methods: {
    validateTestObject() {
      const value = JSON.parse(this.value)
      const validationResult = validateConfig(this.config, value)
      if (validationResult) this.state = PASSED
      else this.state = FAILED
    }
  },
  components: {
    JsonEditorVue,
    ValidationMessage
  },
  computed: {
    ...mapState(useStore, ['config'])
  }
}
</script>

<style scoped>
.json-editor {
  flex: 2;
}

.validation-message {
  flex: 2;
}
.validate-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
