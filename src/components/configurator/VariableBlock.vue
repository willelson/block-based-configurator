<template>
  <div>
    <DraggableBlock @start-drag="startDrag" :class="type" class="square">
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

<style src="@/assets/blockStyles.css" scoped></style>
