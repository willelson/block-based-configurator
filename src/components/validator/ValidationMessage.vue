<template>
  <div class="validation-message">
    <div class="message-container">
      <div class="message">{{ state }}</div>
      <button class="btn">validate</button>
    </div>
  </div>
</template>

<script>
const PENDING = 'pending'
const PASSED = 'passed'
const FAILED = 'failed'

export default {
  data() {
    return {
      state: PENDING,
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
