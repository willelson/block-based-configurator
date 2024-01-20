<template>
  <div class="draggable-block square" draggable="true" @dragstart="startDrag($event)" :class="type">
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
}

.string {
  border: 2px solid var(--green);
  color: var(--green);
}

.integer {
  border: 2px solid var(--red);
  color: var(--red);
}

.field {
  border: 2px solid var(--black);
  color: var(--black);
}
</style>
