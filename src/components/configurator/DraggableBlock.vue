<template>
  <div class="draggable-block" draggable="true" @dragstart="startDrag($event)">
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  emits: ['start-drag'],
  props: {
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    startDrag(event) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      this.$emit('start-drag', event)
    }
  }
}
</script>

<style scoped>
.draggable-block {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
}

.draggable-block:active {
  cursor: grabbing;
}
</style>
