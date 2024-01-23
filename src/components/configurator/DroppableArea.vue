<template>
  <div @drop="onDrop($event)" @dragenter.prevent @dragover.prevent>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  emits: ['drop'],
  methods: {
    onDrop(event) {
      this.$emit('drop', event)
    }
  }
}
</script>
