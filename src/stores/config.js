import { defineStore } from 'pinia'

const DEFAULT_CONFIG = [
  {
    index: 0,
    block1: {},
    operator: {},
    block2: {}
  },
  {
    index: 1,
    block1: {},
    operator: {},
    block2: {}
  },
  {
    index: 2,
    block1: {},
    operator: {},
    block2: {}
  },
  {
    index: 3,
    block1: {},
    operator: {},
    block2: {}
  }
]

export const useStore = defineStore('config', {
  state: () => ({ config: DEFAULT_CONFIG })
})
