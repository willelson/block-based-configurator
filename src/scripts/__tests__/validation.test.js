import {
  GREATER_THAN,
  LESS_THAN,
  GREATER_THAN_OR_EQUAL_TO,
  LESS_THAN_OR_EQUAL_TO,
  EQUAL_TO,
  NOT_EQUAL_TO
} from '@/scripts/constants.js'

import { validateRow, evaluateBlock, validateConfig } from '@/scripts/validation.js'
import { describe, test, expect } from 'vitest'

describe('validateRow', () => {
  test('valid equal to', () => expect(validateRow('Buddha', EQUAL_TO, 'Buddha')).toBe(true))
  test('valid greater than', () => expect(validateRow(100, GREATER_THAN, 99)).toBe(true))
  test('invalid less than', () => expect(validateRow(100, LESS_THAN, 99)).toBe(false))
  test('valid not equal to', () => expect(validateRow('John', NOT_EQUAL_TO, 'Buddha')).toBe(true))
  test('valid greater than or equal to', () =>
    expect(validateRow(50, GREATER_THAN_OR_EQUAL_TO, 50)).toBe(true))
  test('invalid less than or equal to', () =>
    expect(validateRow(101, LESS_THAN_OR_EQUAL_TO, 100)).toBe(false))
})

describe('evaluateBlock', () => {
  const testRow = {
    index: 0,
    block1: { type: 'field', value: 'name' },
    operator: { type: EQUAL_TO, position: 'operator' },
    block2: { type: 'string', value: 'Buddha' }
  }

  const testObject = {
    name: 'testName'
  }

  test('evalutes field value from testObject', () => {
    const value = evaluateBlock(testRow.block1, testObject)
    expect(value).toEqual('testName')
  })
  test('evalutes string value from testRow', () => {
    const value = evaluateBlock(testRow.block2, testObject)
    expect(value).toEqual('Buddha')
  })
  test('evalutes operator value from testRow', () => {
    const value = evaluateBlock(testRow.operator, testObject)
    expect(value).toEqual(EQUAL_TO)
  })
})

describe('validateConfig', () => {
  test('returns true when all conditions pass config', () => {
    const config = [
      {
        index: 0,
        block1: { type: 'field', value: 'name' },
        operator: { type: EQUAL_TO, position: 'operator' },
        block2: { type: 'text', value: 'buddha' }
      },
      {
        index: 1,
        block1: { type: 'text', value: 'employee' },
        operator: { type: EQUAL_TO, position: 'operator' },
        block2: { type: 'field', value: 'status' }
      }
    ]

    const testObject = {
      name: 'buddha',
      status: 'employee'
    }

    expect(validateConfig(config, testObject)).toEqual(true)
  })

  test('returns false if some conditions fail', () => {
    const config = [
      {
        index: 0,
        block1: { type: 'field', value: 'name' },
        operator: { type: EQUAL_TO, position: 'operator' },
        block2: { type: 'text', value: 'buddha' }
      },
      {
        index: 1,
        block1: { type: 'text', value: 'employee' },
        operator: { type: EQUAL_TO, position: 'operator' },
        block2: { type: 'field', value: 'status' }
      }
    ]

    const testObject = {
      age: 99,
      status: 'student'
    }

    expect(validateConfig(config, testObject)).toBe(false)
  })
})
