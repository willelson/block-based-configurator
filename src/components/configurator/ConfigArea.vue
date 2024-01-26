<template>
  <div class="config-area">
    <ConfigHeader @clear="clearConfig" @save="saveToFile" @configUploaded="loadConfig" />
    <div class="drag-drop-area padding-m large-gap">
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
  </div>
</template>

<script>
import ConfigRow from '@/components/configurator/ConfigRow.vue'
import DroppableArea from '@/components/configurator/DroppableArea.vue'
import ConfigHeader from '@/components/configurator/Header.vue'

const DEFAULT_CONFIG = [
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
  },
  {
    index: 2,
    block1: {},
    operator: {},
    block2: {}
  },
  {
    index: 3,
    block1: {},
    operator: {},
    block2: {}
  }
]

export default {
  data() {
    return {
      config: DEFAULT_CONFIG
    }
  },
  components: {
    ConfigRow,
    DroppableArea,
    ConfigHeader
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
    },
    clearConfig() {
      this.config = DEFAULT_CONFIG
    },
    saveToFile(name) {
      console.log(`saving "${name}"`)
      const link = document.createElement('a')
      const file = new Blob([JSON.stringify(this.config)], { type: 'text/json' })
      link.href = URL.createObjectURL(file)
      link.download = name + '.json'
      link.click()
      URL.revokeObjectURL(link.href)
    },
    loadConfig(config) {
      this.config = config
    }
  }
}
</script>

<style scoped>
.config-area {
  display: flex;
  flex-direction: column;
  flex: 2;
}
.drag-drop-area {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}

.delete-drop {
  position: absolute;
  top: calc(50% - 26px);
  left: 0;
}

.delete-drop-zone {
  background-color: var(--light-grey);
  border-radius: var(--border-radius);
}
</style>
