<template>
  <div class="validate-panel padding-m">
    <ValidationMessage style="flex: 2" />
  </div>
</template>

<script>
import ValidationMessage from '@/components/validator/ValidationMessage.vue'

export default {
  components: {
    ValidationMessage,
  }
}
</script>

<style scoped>
.validate-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
