import {
  GREATER_THAN,
  LESS_THAN,
  GREATER_THAN_OR_EQUAL_TO,
  LESS_THAN_OR_EQUAL_TO,
  EQUAL_TO,
  NOT_EQUAL_TO
} from '@/scripts/constants.js'

export const evaluateBlock = (block, testObject) => {
  // Takes a block object from a config row and returns a value
  // if block type is field return value from testObject
  // if block type is operator return operator type
  // else return block value

  const { type, value } = block

  if (type === 'field') {
    return testObject[value]
  } else if (block.position === 'operator') {
    return type
  } else return value
}

export const validateRow = (block1Value, operator, block2Value) => {
  // Takes both values from a config row and applies the operator

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

export const validateConfig = (config, testOject) => {
  // Validate entire config against a test object
  let valid = true

  const testConfig = removeEmptyRows(config)
  testConfig.forEach((row) => {
    const block1Value = evaluateBlock(row.block1, testOject)
    const operator = evaluateBlock(row.operator, testOject)
    const block2Value = evaluateBlock(row.block2, testOject)

    if (!validateRow(block1Value, operator, block2Value)) valid = false
  })

  return valid
}

const allBlocksEmpty = (row) => {
  const keys = ['block1', 'operator', 'block2']
  return keys.every((key) => Object.keys(row[key]).length === 0)
}

export const removeEmptyRows = (config) => {
  return config.filter((row) => !allBlocksEmpty(row))
}
