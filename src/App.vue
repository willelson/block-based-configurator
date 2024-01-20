<template>
  <div class="area-container">
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

<style scoped></style>
