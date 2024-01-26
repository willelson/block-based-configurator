<template>
  <div class="sidepanel">
    <div class="sidepanel-tabs">
      <div
        class="tab"
        :class="selectedTab === 'operators' && 'selected'"
        @click="selectedTab = 'operators'"
      >
        Build
      </div>
      <div
        class="tab"
        :class="selectedTab === 'validator' && 'selected'"
        @click="selectedTab = 'validator'"
      >
        Validate
      </div>
    </div>
    <OperatorsPanel v-show="selectedTab === 'operators'" />
    <ValidatePanel v-show="selectedTab === 'validator'" />
  </div>
</template>

<script>
import OperatorsPanel from '@/components/configurator/OperatorsPanel.vue'
import ValidatePanel from '@/components/validator/ValidatePanel.vue'

export default {
  data() {
    return {
      selectedTab: 'operators'
    }
  },
  components: {
    OperatorsPanel,
    ValidatePanel
  },
  methods: {}
}
</script>

<style scoped>
.sidepanel {
  display: flex;
  flex-direction: column;
  flex: 1;

  border-left: 1px solid var(--border-color);
}
.sidepanel-tabs {
  display: flex;
  padding: 8px 16px;
  gap: 24px;
}

.tab {
  padding: 8px 0;
  cursor: pointer;
}

.tab.selected {
  color: purple;
  border-bottom: 2px solid purple;
}
</style>
