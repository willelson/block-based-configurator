<template>
  <div>
    <DraggableBlock @start-drag="startDrag" :type="type">
      <template #content>
        {{ type }}
      </template>
    </DraggableBlock>
  </div>
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
    return {}
  },
  components: {
    DraggableBlock
  },
  methods: {
    startDrag(event) {
      const { type } = this
      event.dataTransfer.setData('data', JSON.stringify({ type }))
    }
  }
}
</script>

<style scoped></style>
