# Block Based Script Generator

A drag and drop based application to build configuration scripts and validate them against a JSON object.

![build tab](https://github.com/willelson/block-based-configurator/assets/10315667/221b9ddd-9692-4287-a36a-bd983d232c02)

## Features

- Create a configuration by dragging blocks from the right hand side panel into the configuration are to build a set of expressions.
- Test your configurations against a JSON object in the validate tab.
- Customise the name of the configuration and export it to a file.
- Upload a configuration from a file.


![validate tab](https://github.com/willelson/block-based-configurator/assets/10315667/11de500f-2809-4a2f-9950-4794b6528cc7)

#### What is a configuration script?
A set of expressions. For example, "occupation equal to student" or "age greater than 99".

#### What are they validated against?
Simply a JSON object. Give the examples above, the following JSON obect would pass.
```
{
  "occupation": "student",
  "age": 101
}
```

## Project Setup

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
