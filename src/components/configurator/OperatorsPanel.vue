<template>
  <div class="operator-panel padding-m">
    <div class="operator-section">
      <div class="section-title">Operators</div>
      <div class="block-container small-gap">
        <OperatorBlock :value="LESS_THAN" label="less than" />
        <OperatorBlock :value="EQUAL_TO" label="equal to" />
        <OperatorBlock :value="GREATER_THAN" label="greater than" />
        <OperatorBlock :value="GREATER_THAN_OR_EQUAL_TO" label="greater than or equal to" />
        <OperatorBlock :value="LESS_THAN_OR_EQUAL_TO" label="less than or equal to" />
        <OperatorBlock :value="NOT_EQUAL_TO" label="not equal to" />
      </div>
    </div>
    <div class="operator-section">
      <div class="section-title">Field</div>
      <div class="block-container small-gap">
        <VariableBlock type="field" />
      </div>
    </div>
    <div class="operator-section">
      <div class="section-title">Value types</div>
      <div class="block-container small-gap">
        <VariableBlock type="text" />
        <VariableBlock type="number" />
      </div>
    </div>
  </div>
</template>

<script>
import OperatorBlock from '@/components/configurator/OperatorBlock.vue'
import VariableBlock from '@/components/configurator/VariableBlock.vue'

import {
  GREATER_THAN,
  LESS_THAN,
  GREATER_THAN_OR_EQUAL_TO,
  LESS_THAN_OR_EQUAL_TO,
  EQUAL_TO,
  NOT_EQUAL_TO
} from '@/scripts/constants.js'

export default {
  data() {
    return {
      GREATER_THAN,
      LESS_THAN,
      GREATER_THAN_OR_EQUAL_TO,
      LESS_THAN_OR_EQUAL_TO,
      EQUAL_TO,
      NOT_EQUAL_TO
    }
  },
  components: {
    OperatorBlock,
    VariableBlock
  },
  methods: {}
}
</script>

<style scoped>
.operator-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.block-container {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}

.operator-section {
  display: flex;
  flex-direction: column;
  max-height: 33%;
  padding: 24px;
}

.operator-section .block-container {
  overflow-y: auto;
}

.operator-panel > .operator-section:not(:last-child) {
  border-bottom: 1px solid var(--border-color);
}

.operator-panel > .operator-section:first-of-type {
  padding-top: 0px;
}

.section-title {
  padding-bottom: 8px;
}
</style>
