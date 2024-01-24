<template>
  <div class="config-row large-gap">
    <div
      class="square"
      :class="firstBlockOccupied ? '' : 'dashed-border'"
      @drop="onDrop($event, 'block1')"
      @dragenter.prevent
      @dragover.prevent
    >
      <ConfigBlock
        v-if="firstBlockOccupied"
        :type="config.block1.type"
        :value="config.block1.value"
        :configIndex="config.index"
        position="block1"
        @update:value="(value) => updateValue(value, 'block1')"
      />
    </div>
    <div
      class="circle"
      :class="operatorOccupied ? '' : 'dashed-border'"
      @drop="onDrop($event, 'operator')"
      @dragenter.prevent
      @dragover.prevent
    >
      <OperatorBlock
        v-if="operatorOccupied"
        :type="config.operator.type"
        :configIndex="config.index"
      />
    </div>
    <div
      class="square"
      :class="secondBlockOccupied ? '' : 'dashed-border'"
      @drop="onDrop($event, 'block2')"
      @dragenter.prevent
      @dragover.prevent
    >
      <ConfigBlock
        v-if="secondBlockOccupied"
        :type="config.block2.type"
        :value="config.block2.value"
        :config-index="config.index"
        position="block2"
        @update:value="(value) => updateValue(value, 'block2')"
      />
    </div>
  </div>
</template>

<script>
import ConfigBlock from '@/components/configurator/ConfigBlock.vue'
import OperatorBlock from '@/components/configurator/OperatorBlock.vue'

export default {
  emits: ['update:config'],
  props: {
    config: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  data() {
    return {}
  },
  components: {
    ConfigBlock,
    OperatorBlock
  },
  methods: {
    onDrop(event, dropZone) {
      const data = event.dataTransfer.getData('data')
      if (!data) return

      const block = JSON.parse(data)
      if (dropZone === 'operator' && !block.position === 'operator') return
      if (dropZone !== 'operator' && block.position === 'operator') return

      const updatedRow = { ...this.config, [dropZone]: block }
      this.$emit('update:config', updatedRow)
    },
    updateValue(value, dropZone) {
      const updatedDropZone = { ...this.config[dropZone], value }
      const updatedRow = { ...this.config, [dropZone]: updatedDropZone }
      this.$emit('update:config', updatedRow)
    }
  },
  computed: {
    firstBlockOccupied() {
      return Object.keys(this.config.block1).length > 0
    },
    operatorOccupied() {
      return Object.keys(this.config.operator).length > 0
    },
    secondBlockOccupied() {
      return Object.keys(this.config.block2).length > 0
    }
  }
}
</script>

<style scoped>
.config-row {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
