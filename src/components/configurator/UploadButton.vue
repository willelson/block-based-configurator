<template>
  <div>
    <button class="btn" @click="openUpload">Upload</button>
    <input ref="file" type="file" accept=".json" @change="readFile" style="display: none" />
  </div>
</template>

<script>
export default {
  methods: {
    openUpload() {
      this.$refs.file.click()
    },
    async readFile(event) {
      const [file] = event.target.files
      if (!file) {
        // TODO: add an alert or some validation here
        return
      }
      const data = await file.text()
      this.$emit('upload', { config: JSON.parse(data), filename: file.name })
    }
  }
}
</script>

<style></style>
