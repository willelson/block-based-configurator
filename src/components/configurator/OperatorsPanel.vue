<template>
  <div class="operator-panel padding-m">
    operator panel
    <div class="operator-section">
      <div class="section-title">Operators</div>
      <div class="block-container small-gap">
        <OperatorBlock type="less_than" />
        <OperatorBlock type="equal_to" />
        <OperatorBlock type="greater_than" />
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
        <VariableBlock type="string" />
        <VariableBlock type="integer" />
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
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.block-container {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}

.operator-section {
  padding: 24px 0;
}

.operator-panel > .operator-section:not(:last-child) {
  border-bottom: 1px solid var(--border-color);
}

.section-title {
  padding: 8px 0;
}
</style>
