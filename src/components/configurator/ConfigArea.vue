<template>
  <div class="config-area padding-m large-gap">
    <ConfigRow
      v-for="row in config"
      :config="row"
      :key="row.index"
      @update:config="(updatedRow) => updateRow(updatedRow, row.index)"
      @block-moved="deleteBlockFromPreviousPosition"
      class="config-row"
    />

    <div class="delete-drop">
      <DroppableArea @drop="handleDeleteDrop($event)">
        <template #content>
          <div class="delete-drop-zone padding-m">Delete</div>
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
        },
        {
          index: 1,
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
    handleDeleteDrop(event) {
      const data = JSON.parse(event.dataTransfer.getData('data'))
      const index = data?.configIndex
      if (index === null || index < 0) return

      this.deleteBlock(index, data.position)
    },
    deleteBlock(index, position) {
      const updatedRow = { ...this.config[index], [position]: {} }
      this.config = [...this.config.slice(0, index), updatedRow, ...this.config.slice(index + 1)]
    },
    deleteBlockFromPreviousPosition(block) {
      const { fromPosition, fromIndex } = block
      this.deleteBlock(fromIndex, fromPosition)
    }
  }
}
</script>

<style scoped>
.config-area {
  flex: 2;
  position: relative;
  display: flex;
  flex-direction: column;
}

.delete-drop {
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
}

.delete-drop-zone {
  background-color: var(--light-grey);
  border-radius: var(--border-radius);
}
</style>
