<template>
  <DraggableBlock @start-drag="startDrag" :class="type" class="square">
    <template #content>
      <input
        :value="value"
        ref="blockInput"
        class="config-input"
        placeholder="Enter a value"
        @input="userInput"
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
    startDrag(event) {
      const { type, value, configIndex, position } = this
      event.dataTransfer.setData('data', JSON.stringify({ type, value, configIndex, position }))
    },
    userInput(event) {
      this.$emit('update:value', event.target.value)
    },
    blurInput() {
      this.$refs.blockInput.blur()
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
}

.config-input:focus::placeholder {
  opacity: 0;
}
</style>
