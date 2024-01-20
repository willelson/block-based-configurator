<template>
  <DraggableBlock @start-drag="startDrag" :type="type">
    <template #content>
      <input :value="value" ref="blockInput" class="config-input" placeholder="Enter a value" />
    </template>
  </DraggableBlock>
</template>

<script>
import DraggableBlock from '@/components/configurator/DraggableBlock.vue'

export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      value: ''
    }
  },
  components: {
    DraggableBlock
  },
  methods: {
    startDrag(event) {
      console.log(event)
      console.log('dragging a config block....')
    }
  },
  mounted() {
    this.$refs.blockInput.focus()
  }
}
</script>

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
