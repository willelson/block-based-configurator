import {
  GREATER_THAN,
  LESS_THAN,
  GREATER_THAN_OR_EQUAL_TO,
  LESS_THAN_OR_EQUAL_TO,
  EQUAL_TO,
  NOT_EQUAL_TO
} from '@/scripts/constants.js'

import { STRING_TYPE, NUMBER_TYPE, FIELD_TYPE } from '@/scripts/constants.js'

import { LEFT_SIDE, OPERATOR, RIGHT_SIDE } from '@/scripts/constants.js'

import {
  validateRow,
  evaluateBlock,
  validateConfig,
  removeEmptyRows
} from '@/scripts/validation.js'
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
    [LEFT_SIDE]: { type: FIELD_TYPE, value: 'name' },
    [OPERATOR]: { type: OPERATOR, value: EQUAL_TO },
    [RIGHT_SIDE]: { type: STRING_TYPE, value: 'Buddha' }
  }

  const testObject = {
    name: 'testName'
  }

  test('evalutes field value from testObject', () => {
    const value = evaluateBlock(testRow[LEFT_SIDE], testObject)
    expect(value).toEqual('testName')
  })
  test('evalutes string value from testRow', () => {
    const value = evaluateBlock(testRow[RIGHT_SIDE], testObject)
    expect(value).toEqual('Buddha')
  })
  test('evalutes operator value from testRow', () => {
    const value = evaluateBlock(testRow[OPERATOR], testObject)
    expect(value).toEqual(EQUAL_TO)
  })
  test('evalutes number type as number', () => {
    const testRow = {
      index: 0,
      [LEFT_SIDE]: { type: FIELD_TYPE, value: 'age' },
      [OPERATOR]: { type: OPERATOR, value: EQUAL_TO },
      [RIGHT_SIDE]: { type: NUMBER_TYPE, value: '42' }
    }

    const value = evaluateBlock(testRow[RIGHT_SIDE], testObject)
    expect(value).toEqual(42)
    expect(typeof value).toEqual('number')
  })

  test('does not evalute string type as number', () => {
    const testRow = {
      index: 0,
      [LEFT_SIDE]: { type: FIELD_TYPE, value: 'age' },
      [OPERATOR]: { type: OPERATOR, value: EQUAL_TO },
      [RIGHT_SIDE]: { type: STRING_TYPE, value: '42' }
    }

    const value = evaluateBlock(testRow[RIGHT_SIDE], testObject)
    expect(value).toEqual('42')
    expect(typeof value).toEqual('string')
  })
})

describe('validateConfig', () => {
  test('returns true when all conditions pass config', () => {
    const config = [
      {
        index: 0,
        [LEFT_SIDE]: { type: FIELD_TYPE, value: 'name' },
        [OPERATOR]: { type: OPERATOR, value: EQUAL_TO },
        [RIGHT_SIDE]: { type: STRING_TYPE, value: 'buddha' }
      },
      {
        index: 1,
        [LEFT_SIDE]: { type: STRING_TYPE, value: 'employee' },
        [OPERATOR]: { type: OPERATOR, value: EQUAL_TO },
        [RIGHT_SIDE]: { type: FIELD_TYPE, value: 'status' }
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
        [LEFT_SIDE]: { type: FIELD_TYPE, value: 'name' },
        [OPERATOR]: { type: OPERATOR, value: EQUAL_TO },
        [RIGHT_SIDE]: { type: STRING_TYPE, value: 'buddha' }
      },
      {
        index: 1,
        [LEFT_SIDE]: { type: STRING_TYPE, value: 'employee' },
        [OPERATOR]: { type: OPERATOR, value: EQUAL_TO },
        [RIGHT_SIDE]: { type: FIELD_TYPE, value: 'status' }
      }
    ]

    const testObject = {
      age: 99,
      status: 'student'
    }

    expect(validateConfig(config, testObject)).toBe(false)
  })
})

describe('removeEmptyRows', () => {
  test('empty rows are removed', () => {
    const config = [
      {
        index: 0,
        [LEFT_SIDE]: { type: FIELD_TYPE, value: 'name' },
        [OPERATOR]: { type: 'equal_to', label: 'equal to', position: OPERATOR },
        [RIGHT_SIDE]: { type: STRING_TYPE, value: 'buddha' }
      },
      { index: 1, [LEFT_SIDE]: {}, operator: {}, [RIGHT_SIDE]: {} },
      { index: 2, [LEFT_SIDE]: {}, operator: {}, [RIGHT_SIDE]: {} },
      { index: 3, [LEFT_SIDE]: {}, operator: {}, [RIGHT_SIDE]: {} }
    ]

    const result = removeEmptyRows(config)
    expect(result.length).toBe(1)
  })
  test('partially empty rows are removed', () => {
    const config = [
      {
        index: 0,
        [LEFT_SIDE]: { type: FIELD_TYPE, value: 'name' },
        [OPERATOR]: { type: 'equal_to', label: 'equal to', position: OPERATOR },
        [RIGHT_SIDE]: { type: STRING_TYPE, value: 'buddha' }
      },
      { index: 1, [LEFT_SIDE]: {}, operator: {}, [RIGHT_SIDE]: {} },
      {
        index: 2,
        [LEFT_SIDE]: {},
        [OPERATOR]: {},
        [RIGHT_SIDE]: { type: STRING_TYPE, value: 'second buddha' }
      },
      { index: 3, [LEFT_SIDE]: {}, [OPERATOR]: {}, [RIGHT_SIDE]: {} }
    ]

    const result = removeEmptyRows(config)
    expect(result.length).toBe(2)
  })
})
