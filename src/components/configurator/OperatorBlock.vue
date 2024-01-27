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

export default {
  props: {
    type: {
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
    return {}
  },
  components: {
    DraggableBlock
  },
  methods: {
    startDrag(event) {
      const { type, label, configIndex } = this
      event.dataTransfer.setData(
        'data',
        JSON.stringify({ type, label, configIndex, position: 'operator' })
      )
    }
  }
}
</script>

<style src="@/assets/blockStyles.css" scoped></style>
