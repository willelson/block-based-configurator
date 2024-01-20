<template>
  <div class="confiurator-container">
    <ConfigArea />
    <OperatorsPanel />
  </div>
</template>

<script>
import ConfigArea from '@/components/configurator/ConfigArea.vue'
import OperatorsPanel from '@/components/configurator/OperatorsPanel.vue'

export default {
  data() {
    return {}
  },
  components: {
    ConfigArea,
    OperatorsPanel
  },
  methods: {}
}
</script>

<style scoped>
.confiurator-container {
  display: flex;
  height: 100%;
}
</style>
