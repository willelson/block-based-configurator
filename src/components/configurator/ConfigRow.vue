<template>
  <div class="config-row large-gap">
    <DroppableArea
      class="square"
      :class="leftSideOccupied ? '' : 'dashed-border'"
      @drop="onDrop($event, leftSide)"
    >
      <template #content>
        <ConfigBlock
          v-if="leftSideOccupied"
          :type="config[leftSide].type"
          :value="config[leftSide].value"
          :configIndex="config.index"
          :position="leftSide"
          @update:value="(value) => updateValue(value, leftSide)"
      /></template>
    </DroppableArea>
    <DroppableArea
      class="circle"
      :class="operatorOccupied ? '' : 'dashed-border'"
      @drop="onDrop($event, operator)"
    >
      <template #content>
        <OperatorBlock
          v-if="operatorOccupied"
          :value="config[operator].value"
          :label="config[operator].label"
          :configIndex="config.index"
        />
      </template>
    </DroppableArea>
    <DroppableArea
      class="square"
      :class="rightSideOccupied ? '' : 'dashed-border'"
      @drop="onDrop($event, rightSide)"
    >
      <template #content>
        <ConfigBlock
          v-if="rightSideOccupied"
          :type="config[rightSide].type"
          :value="config[rightSide].value"
          :config-index="config.index"
          :position="rightSide"
          @update:value="(value) => updateValue(value, rightSide)"
        />
      </template>
    </DroppableArea>
  </div>
</template>

<script>
import ConfigBlock from '@/components/configurator/ConfigBlock.vue'
import OperatorBlock from '@/components/configurator/OperatorBlock.vue'
import DroppableArea from '@/components/configurator/DroppableArea.vue'

import { LEFT_SIDE, OPERATOR, RIGHT_SIDE } from '@/scripts/constants'

export default {
  emits: ['update:config', 'block-moved'],
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
    OperatorBlock,
    DroppableArea
  },
  methods: {
    /**
     * Handles blocks dropped onto config row drop zones
     * @param {object} event - event oject from dragged object
     * @param {string} dropZone - row component that draged item was dropped onto - 'block1', 'operator' or 'block2'
     * @returns {undefined}
     *
     * @emits 'update:config' - checks drop is valid with vaidateDrop then sends updated row config to parent confi area
     *
     */
    onDrop(event, dropZone) {
      const data = event.dataTransfer.getData('data')
      if (!data) return

      const block = JSON.parse(data)
      if (!this.validateDrop(dropZone, block.type)) return

      const updatedRow = { ...this.config, [dropZone]: block }
      this.$emit('update:config', updatedRow)
      this.checkPreviousBlockPosition(dropZone, block)
    },
    /**
     * Checks if dragged block is allowed to be dropped on the drop zone targeted
     * @param {string} dropZone - row component that draged item was dropped onto - 'block1', 'operator' or 'block2'
     * @param {string} blockType - type of the dragged block - 'block1', 'operator' or 'block2'
     * @returns {boolean} - whether or not this drop is allowed
     *
     * @example
     * const dropZone = 'operator'
     * const blockType = 'text'
     *
     * validateDrop(dropZone, blockType)
     * >>> false
     */
    validateDrop(dropZone, blockType) {
      let dropValidity = true
      const operatorDroppedOutsideCircle = dropZone !== 'operator' && blockType === 'operator'
      const nonOperatorDroppedInCircle = dropZone === 'operator' && blockType !== 'operator'

      if (operatorDroppedOutsideCircle) dropValidity = false
      if (nonOperatorDroppedInCircle) dropValidity = false

      return dropValidity
    },
    /**
     * Handles the case when a block was moved from another position in the config array
     * @param {string} dropZone - row component that draged item was dropped onto - 'block1', 'operator' or 'block2'
     * @param {object} block - oject representing a component of an expression in the config array
     *
     * @emits 'block-moved' - emitted so the block can be removed from it's previous position in the config array
     */
    checkPreviousBlockPosition(dropZone, block) {
      const blockHasAlreadyBeenPlaced = block.hasOwnProperty('configIndex')
      if (!blockHasAlreadyBeenPlaced) return

      const droppedOnStartingPosition =
        block.position === dropZone && block.configIndex === this.config.index

      if (blockHasAlreadyBeenPlaced && !droppedOnStartingPosition) {
        this.$emit('block-moved', { fromPosition: block.position, fromIndex: block.configIndex })
      }
    },
    updateValue(value, dropZone) {
      const updatedDropZone = { ...this.config[dropZone], value }
      const updatedRow = { ...this.config, [dropZone]: updatedDropZone }
      this.$emit('update:config', updatedRow)
    }
  },
  computed: {
    leftSideOccupied() {
      return Object.keys(this.config.block1).length > 0
    },
    operatorOccupied() {
      return Object.keys(this.config.operator).length > 0
    },
    rightSideOccupied() {
      return Object.keys(this.config.block2).length > 0
    },
    rightSide() {
      return RIGHT_SIDE
    },
    operator() {
      return OPERATOR
    },
    leftSide() {
      return LEFT_SIDE
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
