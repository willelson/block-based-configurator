<template>
  <DraggableBlock @start-drag="startDrag" :class="type" class="square">
    <template #content>
      <input
        :value="value"
        :type="inputType"
        ref="blockInput"
        class="config-input"
        placeholder="Enter a value"
        @input="userInput"
        @keyDown="checkInput"
        v-on:keyup.enter="blurInput"
      />
    </template>
  </DraggableBlock>
</template>

<script>
import DraggableBlock from '@/components/configurator/DraggableBlock.vue'

export default {
  emits: ['update:value'],
  props: {
    type: {
      type: String,
      required: true
    },
    value: {
      type: String
    },
    configIndex: {
      type: Number,
      required: true
    },
    position: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
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
     *   value: ''
     *   configIndex: 0 // index of blocks row in the config array
     *   position: '' // position of the block in the row - left side or right side
     * }
     */
    startDrag(event) {
      const { type, value, configIndex, position } = this
      event.dataTransfer.setData('data', JSON.stringify({ type, value, configIndex, position }))
    },
    userInput(event) {
      this.$emit('update:value', event.target.value)
    },
    blurInput() {
      this.$refs.blockInput.blur()
    },
    checkInput(e) {
      if (this.inputType === 'number' && ['e', 'E', '+'].includes(e.key)) {
        e.preventDefault()
      }
    }
  },
  computed: {
    inputType() {
      if (this.type === 'number') {
        return 'number'
      } else {
        return 'text'
      }
    }
  },
  mounted() {
    if (!this.value) {
      this.$refs.blockInput.focus()
    }
  }
}
</script>

<style src="@/assets/blockStyles.css" scoped></style>
<style scoped>
.config-input {
  text-align: center;
  color: inherit;
  outline: none;
  border: none;
  background-color: transparent;
  font-weight: 500;
}

.config-input:focus::placeholder {
  opacity: 0;
}
</style>
