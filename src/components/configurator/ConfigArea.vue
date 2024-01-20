<template>
  <div class="config-area padding-m">
    config area
    <ConfigRow
      v-for="row in config"
      :config="row"
      :key="row.index"
      @update:config="(updatedRow) => updateRow(updatedRow, row.index)"
    />
  </div>
</template>

<script>
import ConfigRow from '@/components/configurator/ConfigRow.vue'
export default {
  data() {
    return {
      config: [
        {
          index: 0,
          block1: {},
          operator: {},
          block2: {}
        }
      ]
    }
  },
  components: {
    ConfigRow
  },
  methods: {
    updateRow(row, index) {
      this.config = [...this.config.slice(0, index), row, ...this.config.slice(index + 1)]
    }
  }
}
</script>

<style scoped>
.config-area {
  flex: 2;
}
</style>
