<template>
  <div class="config-row large-gap">
    <DroppableArea
      class="square"
      :class="leftSideOccupied ? '' : 'dashed-border'"
      @drop="onDrop($event, LEFT_SIDE)"
    >
      <template #content>
        <ConfigBlock
          v-if="leftSideOccupied"
          :type="config[LEFT_SIDE].type"
          :value="config[LEFT_SIDE].value"
          :configIndex="config.index"
          :position="LEFT_SIDE"
          @update:value="(value) => updateValue(value, LEFT_SIDE)"
      /></template>
    </DroppableArea>
    <DroppableArea
      class="circle"
      :class="operatorOccupied ? '' : 'dashed-border'"
      @drop="onDrop($event, OPERATOR)"
    >
      <template #content>
        <OperatorBlock
          v-if="operatorOccupied"
          :value="config[OPERATOR].value"
          :label="config[OPERATOR].label"
          :configIndex="config.index"
        />
      </template>
    </DroppableArea>
    <DroppableArea
      class="square"
      :class="rightSideOccupied ? '' : 'dashed-border'"
      @drop="onDrop($event, RIGHT_SIDE)"
    >
      <template #content>
        <ConfigBlock
          v-if="rightSideOccupied"
          :type="config[RIGHT_SIDE].type"
          :value="config[RIGHT_SIDE].value"
          :config-index="config.index"
          :position="RIGHT_SIDE"
          @update:value="(value) => updateValue(value, RIGHT_SIDE)"
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
    return {
      LEFT_SIDE,
      OPERATOR,
      RIGHT_SIDE
    }
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
      return Object.keys(this.config[LEFT_SIDE]).length > 0
    },
    operatorOccupied() {
      return Object.keys(this.config[OPERATOR]).length > 0
    },
    rightSideOccupied() {
      return Object.keys(this.config[RIGHT_SIDE]).length > 0
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
