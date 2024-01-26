<template>
  <div class="confiurator-container">
    <ConfigArea />
    <SidePanel />
  </div>
</template>

<script>
import ConfigArea from '@/components/configurator/ConfigArea.vue'
import SidePanel from '@/components/SidePanel.vue'

export default {
  components: {
    ConfigArea,
    // OperatorsPanel,
    SidePanel
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
