<template>
  <div class="draggable-block" draggable="true" @dragstart="startDrag($event)">
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  emits: ['start-drag'],
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
  font-weight: 500;
}

.draggable-block:active {
  cursor: grabbing;
}
</style>
