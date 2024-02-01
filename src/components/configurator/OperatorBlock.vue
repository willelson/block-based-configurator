<template>
  <div>
    <DraggableBlock @start-drag="startDrag" class="operator circle">
      <template #content>
        {{ label }}
      </template>
    </DraggableBlock>
  </div>
</template>

<script>
import DraggableBlock from '@/components/configurator/DraggableBlock.vue'
import { OPERATOR } from '@/scripts/constants.js'

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    configIndex: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      type: OPERATOR,
      position: OPERATOR
    }
  },
  components: {
    DraggableBlock
  },
  methods: {
    /**
     * Sets the transfer data for dragging a config block
     * @param {object} event - event object from dragged object
     *
     * data structure
     * {
     *   type: '' // type of the block - 'field' or 'numer'
     *   value: '' // operator to be applied to the expression
     *   label: '' // user friendly representation of the value
     *   configIndex: 0 // index of blocks row in the config array
     *   position: '' // position of the block in the row - left side or right side
     * }
     */
    startDrag(event) {
      const { type, value, label, configIndex, position } = this
      event.dataTransfer.setData(
        'data',
        JSON.stringify({ type, value, label, configIndex, position })
      )
    }
  }
}
</script>

<style src="@/assets/blockStyles.css" scoped></style>
