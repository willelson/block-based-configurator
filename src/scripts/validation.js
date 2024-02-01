import {
  GREATER_THAN,
  LESS_THAN,
  GREATER_THAN_OR_EQUAL_TO,
  LESS_THAN_OR_EQUAL_TO,
  EQUAL_TO,
  NOT_EQUAL_TO
} from '@/scripts/constants.js'

import { STRING_TYPE, NUMBER_TYPE } from '@/scripts/constants.js'

import { LEFT_SIDE, OPERATOR, RIGHT_SIDE } from '@/scripts/constants.js'

/**
 * Takes a block from an expression in the config array and returns a value based on it's type
 * @param {object} block - a block from an expression
 * @param {object} testObject - user input object the config array is tested against
 * @returns {string|number} a value based on the block type
 *
 * @example
 * const block = { type: 'string', value: 'name' };
 * const testObject = { name: 'Buddha', ... }
 *
 * const result = evaluateBlock(block, testObject)
 * result >>> 'Buddha'
 *
 * @example
 * const block = { type: 'greater_than', position: 'operator' };
 * const testObject = { ... }
 *
 * const result = evaluateBlock(block, testObject)
 * result >>> 'greater_than'
 */
export const evaluateBlock = (block, testObject) => {
  const { type, value } = block

  if (type === 'field') {
    return testObject[value]
  } else if (block.position === 'operator') {
    return type
  } else if (type === STRING_TYPE) {
    return String(value)
  } else if (type === NUMBER_TYPE) {
    return Number(value)
  }
}

/**
 * Evaluates an expression (a row in the config array) and returns a boolean representing the outcome of the expression
 * @param {string|number} block1Value - value from the left hand side of the expression
 * @param {string} operator - the operator to be applied to the values
 * @param {string|number} block2Value - value from the right hand side of the expression
 * @returns {boolean} - the outcome of the expression
 *
 * @example
 * const block1Value = 'Buddha';
 * const operator = 'equal_to'
 * const block2Value = 'Buddha';
 *
 * const result = validateRow(block1Value, operator, block2Value)
 * result >>> true
 */
export const validateRow = (block1Value, operator, block2Value) => {
  switch (operator) {
    case EQUAL_TO:
      return block1Value === block2Value
    case GREATER_THAN:
      return block1Value > block2Value
    case LESS_THAN:
      return block1Value < block2Value
    case GREATER_THAN_OR_EQUAL_TO:
      return block1Value >= block2Value
    case LESS_THAN_OR_EQUAL_TO:
      return block1Value <= block2Value
    case NOT_EQUAL_TO:
      return block1Value !== block2Value
    default:
      return false
  }
}

/**
 * Evaluates all expressions in the config array and returns whether or not all have passed
 * @param {array[object]} config - an array of objects representing expressions
 * @param {object} testObject - user input object the config array is tested against
 * @returns {boolean} - if all expressions in the config array pass when validated against the test object
 *
 * @example
 * const config = [{
 *   index: 0,
 *   block1: {type: 'field', value: 'age'},
 *   operator: {type: 'greater_than'},
 *   block2: {type: 'number', value: 100}
 * }];
 * const testObject = {age: 21}
 *
 * const result = validateConfig(config, testOject)
 * result >>> false
 */
export const validateConfig = (config, testOject) => {
  let valid = true

  const testConfig = removeEmptyRows(config)
  testConfig.forEach((row) => {
    const block1Value = evaluateBlock(row[LEFT_SIDE], testOject)
    const operator = evaluateBlock(row[OPERATOR], testOject)
    const block2Value = evaluateBlock(row[RIGHT_SIDE], testOject)

    if (!validateRow(block1Value, operator, block2Value)) valid = false
  })

  return valid
}

/**
 * Evaluates whether or not block1, operator and block2 are all empty objects
 * @param {object} row - an expression from the config array
 * @returns {boolean} - whether or not all blocks (or components of the expression) are empty
 *
 * @example
 * const row = {
 *   index: 0,
 *   block1: {type: 'field', value: 'age'},
 *   operator: {},
 *   block2: {type: 'number', value: 100}
 * }
 *
 * const result = allBlocksEmpty(row)
 * result >>> false
 *
 * @example
 * const row = {index: 0, block1: {}, operator: {}, block2: {}}
 *
 * const result = allBlocksEmpty(row)
 * result >>> true
 */
const allBlocksEmpty = (row) => {
  const keys = [LEFT_SIDE, OPERATOR, RIGHT_SIDE]
  return keys.every((key) => Object.keys(row[key]).length === 0)
}

/**
 * Removes any empty rows from the config array
 * @param {array[object]} config - an array of objects representing expressions
 * @returns {array[object]} config array without any empty rows
 *
 * @example
 * const config = [
 *   {
 *     index: 0,
 *     block1: {type: 'field', value: 'age'},
 *     operator: {},
 *     block2: {type: 'number', value: 100}
 *   },
 *   {index: 0, block1: {}, operator: {}, block2: {}}
 * ]
 *
 * const result = removeEmptyRows(config)
 * result >>>
 * [
 *   {
 *     index: 0,
 *     block1: {type: 'field', value: 'age'},
 *     operator: {},
 *     block2: {type: 'number', value: 100}
 *   },
 * ]
 *
 * */
export const removeEmptyRows = (config) => {
  return config.filter((row) => !allBlocksEmpty(row))
}
