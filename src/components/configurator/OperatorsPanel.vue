<template>
  <div class="operator-panel padding-m">
    operator panel
    <div class="block-container small-gap">
      <OperatorBlock type="field" />
      <OperatorBlock type="string" />
      <OperatorBlock type="integer" />
    </div>
  </div>
</template>

<script>
import OperatorBlock from '@/components/configurator/OperatorBlock.vue'
export default {
  data() {
    return {}
  },
  components: { OperatorBlock },
  methods: {}
}
</script>

<style scoped>
.operator-panel {
  flex: 1;
  border-left: 1px solid var(--border-color);
}

.block-container {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
</style>
