# TypeScript Node Service Template
Based on [TypeScript-Node-Starter](https://github.com/microsoft/TypeScript-Node-Starter)

# Table of contents:

- [Getting started](#getting-started)
- [Template](#template)
  - [Project Structure](#project-structure)
  - [Typescript compilation](#typescript-compilation)
    - [Type Definition (`.d.ts`) Files](#type-definition-dts-files)
  - [Debugging](#debugging)(TBD)
  - [Testing](#testing)
  - [ESLint](#eslint)
- [Dependencies](#dependencies)
  - [`dependencies`](#dependencies)
  - [`devDependencies`](#devdependencies)

# Getting started

## Running on local host

- Install dependencies

```
cd <project_name>
npm install
```

- Build and run the project

```
npm run build
npm start
```

Finally, navigate to `http://localhost:3000` and you should see the template being served and rendered locally!

## Running on Kubernetes cluster using Skaffold

[Skaffold](https://skaffold.dev/docs/quickstart/) offers a CLI (Command Line Interface) that enables iterative development, on both local and remote clusters. The tool provides several features that make local development on Kubernetes a joy.

### Prerequisites

- Install Docker
- Install [minikube](https://minikube.sigs.k8s.io/docs/start/)
- Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-macos)
- Install Skaffold

```
curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/v1.16.0/skaffold-darwin-amd64 && chmod +x skaffold && sudo mv skaffold /usr/local/bin
```

> **Note!** Use this specific version of Skaffold

### Configurations

In the skafold.yaml file set the path where your .npmrc is stored

```js
  - image: example-service
    docker:
      dockerfile: Dockerfile
      secret:
        id: npmrc
        src: <<home path>>.npmrc
```

### Run Skaffold

`skaffold dev --port-forward`
Thats it - Slaffold will run the cluster and will watch for changes,
when a file is changed Skaffold will rebuild and deploy automaticly.

# Template

## Project Structure

| Name                | Description                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------- |
| **.vscode**         | Contains VS Code specific settings                                                            |
| **dist**            | Contains the distributable (or output) from your TypeScript build. This is the code you ship  |
| **node_modules**    | Contains all your npm dependencies                                                            |
| **src**             | Contains your source code that will be compiled to the dist dir                               |
| **src/controllers** | Controllers define functions that respond to various http requests                            |
| **src/models**      | Models define Mongoose schemas that will be used in storing and retrieving data from MongoDB  |
| **src/types**       | Holds .d.ts files not found on DefinitelyTyped.                                               |
| **src**/server.ts   | Entry point to your express app                                                               |
| **test**            | Contains your tests. Separate from source because there is a different build process.         |
| .env.example        | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos. |
| jest.config.js      | Used to configure Jest running tests written in TypeScript                                    |
| package.json        | File that contains npm dependencies                                                           |
| tsconfig.json       | Config settings for compiling server code written in TypeScript                               |
| .eslintrc           | Config settings for ESLint code style checking                                                |
| .eslintignore       | Config settings for paths to exclude from linting                                             |

## TypeScript Compilation options

```json
"compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
        "*": [
            "node_modules/*",
            "src/types/*"
        ]
    }
},
```

| `compilerOptions`            | Description                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"module": "commonjs"`       | The **output** module type (in your `.js` files). Node uses commonjs, so that is what we use                                                               |
| `"esModuleInterop": true,`   | Allows usage of an alternate module import syntax: `import foo from 'foo';`                                                                                |
| `"target": "es6"`            | The output language level. Node supports ES6, so we can target that here                                                                                   |
| `"noImplicitAny": true`      | Enables a stricter setting which throws errors when something has a default `any` value                                                                    |
| `"moduleResolution": "node"` | TypeScript attempts to mimic Node's module resolution strategy. Read more [here](https://www.typescriptlang.org/docs/handbook/module-resolution.html#node) |
| `"sourceMap": true`          | We want source maps to be output along side our JavaScript.                                                                                                |
| `"outDir": "dist"`           | Location to output `.js` files after compilation                                                                                                           |
| `"baseUrl": "."`             | Part of configuring module resolution.                                                                                                                     |
| `paths: {...}`               | Part of configuring module resolution.                                                                                                                     |

## Type Definition (`.d.ts`) Files

TypeScript uses `.d.ts` files to provide types for JavaScript libraries that were not written in TypeScript.

> **Note!** Because we're using `"noImplicitAny": true`, we are required to have a `.d.ts` file for **every** library we use. While you could set `noImplicitAny` to `false` to silence errors about missing `.d.ts` files, it is a best practice to have a `.d.ts` file for every library. (Even if the `.d.ts` file is [basically empty!](#writing-a-dts-file))

## Debugging

TBD

## Testing

[Jest](https://facebook.github.io/jest/) framework.

### Jest Configuration

Jest's configuration lives in `jest.config.js`, so let's open it up and add the following code:

```js
module.exports = {
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "./node_modules/ts-jest/preprocessor.js",
  },
  testMatch: ["**/test/**/*.test.(ts|js)"],
  testEnvironment: "node",
};
```

Basically we are telling Jest that we want it to consume all files that match the pattern `"**/test/**/*.test.(ts|js)"` (all `.test.ts`/`.test.js` files in the `test` folder), but we want to preprocess the `.ts` files first.
This preprocess step is very flexible, but in our case, we just want to compile our TypeScript to JavaScript using our `tsconfig.json`.
This all happens in memory when you run the tests, so there are no output `.js` test files for you to manage.

### Running tests

Simply run `npm run test`.
Note this will also generate a coverage report.

# Dependencies

## `dependencies`

| Package       | Description                                 |
| ------------- | ------------------------------------------- |
| body-parser   | Express 4 middleware.                       |
| compression   | Express 4 middleware.                       |
| dotenv        | Loads environment variables from .env file. |
| errorhandler  | Express 4 middleware.                       |
| express       | Node.js web framework.                      |
| mongoose      | MongoDB ODM.                                |
| @cider/logger | Cider custom logging library                |

## `devDependencies`

| Package    | Description                                                             |
| ---------- | ----------------------------------------------------------------------- |
| @types     | Dependencies in this folder are `.d.ts` files used to provide types     |
| jest       | Testing library for JavaScript.                                         |
| nodemon    | Utility that automatically restarts node process when it crashes        |
| supertest  | HTTP assertion library.                                                 |
| ts-jest    | A preprocessor with sourcemap support to help use TypeScript with Jest. |
| eslint     | Linter for JavaScript and TypeScript files                              |
| typescript | JavaScript compiler/type checker that boosts JavaScript productivity    |

# Todo

## Debugging

- [ ] Add documentation for debugging the app in local K8s cluster

## CI/CD

- [ ] Setup a template for the CI/CD

## Refactor existing projects to use the template

- [ ] analyzer
- [ ] fetcher
- [ ] github-app
