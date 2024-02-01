# Block Based Script Generator

A drag and drop based application to build configuration scripts and validate them against a JSON object.

![build](https://github.com/willelson/block-based-configurator/assets/10315667/d2b44c98-d177-4c30-9678-c3ff6e2c461c)

## Features

- Create a configuration by dragging blocks from the right hand side panel into the configuration are to build a set of expressions.
- Test your configurations against a JSON object in the validate tab.
- Customise the name of the configuration and export it to a file.
- Upload a configuration from a file.

![validate](https://github.com/willelson/block-based-configurator/assets/10315667/af055cdc-50fc-4c52-852a-299d630ba4af)

#### What is a configuration script?
A set of expressions. For example, "occupation equal to student" or "age greater than 99".

#### What are they validated against?
A JSON object. Given the examples above, the following JSON obect would pass.
```
{
  "occupation": "student",
  "age": 101
}
```

#### How is a confguration script built?
Blocks are dragged from the right hand side panel onto the configuration area, where they can be dropped into the boxes with dashed lines to create expressions. An expression is made up of 3 types of blocks:
1. Operators - determine how the components of the expression are evaluated - greater than, equal to etc. These can be dropped into the middle of the row
2. Fields - these represent a key from the test input object, for example “Name” or “Age”
3. Value types - these are used to define a value to test against, for example “Buddha” or “99”

An expression should be built using a block of each type, for example: `Field - Operator - Value`, and not `Field - Operator - Field`.

## Project Setup

Clone the repository and install the dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
