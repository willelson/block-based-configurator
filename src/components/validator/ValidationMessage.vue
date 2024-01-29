<template>
  <div class="validation-message">
    <div class="message-container">
      <div class="message">{{ state }}</div>
      <button class="btn" @click="$emit('validate')">validate</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['validate'],
  props: {
    state: {
      type: String
    }
  },
  methods: {}
}
</script>

<style scoped>
.validation-message {
  padding: 24px 0;
}
.message-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.message {
  text-transform: uppercase;
  font-size: 28px;
}

.message-container {
  padding: 48px 0;
}
</style>
