import { defineStore } from 'pinia'
import { DEFAULT_CONFIG } from '@/scripts/constants.js'

export const useStore = defineStore('config', {
  state: () => ({ config: DEFAULT_CONFIG })
})
