<template>
  <div class="operator-panel padding-m">
    <div class="operator-section">
      <div class="section-title">Operators</div>
      <div class="block-container small-gap">
        <OperatorBlock type="less than" />
        <OperatorBlock type="equal to" />
        <OperatorBlock type="greater than" />
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

export default {
  data() {
    return {}
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
