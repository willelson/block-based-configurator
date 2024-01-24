<template>
  <div class="config-area padding-m">
    config area
    <ConfigRow
      v-for="row in config"
      :config="row"
      :key="row.index"
      @update:config="(updatedRow) => updateRow(updatedRow, row.index)"
    />

    <div class="delete-drop">
      <DroppableArea @drop="deleteBlock($event)">
        <template #content>
          <div class="delete-drop-zone padding-m">delete</div>
        </template>
      </DroppableArea>
    </div>
  </div>
</template>

<script>
import ConfigRow from '@/components/configurator/ConfigRow.vue'
import DroppableArea from '@/components/configurator/DroppableArea.vue'

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
    ConfigRow,
    DroppableArea
  },
  methods: {
    updateRow(row, index) {
      this.config = [...this.config.slice(0, index), row, ...this.config.slice(index + 1)]
    },
    deleteBlock(event) {
      const data = JSON.parse(event.dataTransfer.getData('data'))
      const index = data?.configIndex
      if (index === null || index < 0) return

      const updatedRow = { ...this.config[index], [data.position]: {} }
      this.config = [...this.config.slice(0, index), updatedRow, ...this.config.slice(index + 1)]
    }
  }
}
</script>

<style scoped>
.config-area {
  flex: 2;
  position: relative;
}

.delete-drop {
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
}

.delete-drop-zone {
  box-shadow: 0 0 12px 0px var(--red);
  border-radius: var(--border-radius);
}
</style>
