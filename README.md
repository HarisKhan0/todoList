# ListIt [![Node.js CI](https://github.com/HarisKhan0/todoList/actions/workflows/node.js.yml/badge.svg)](https://github.com/HarisKhan0/todoList/actions/workflows/node.js.yml)

### Contributors: Sam Todd, Winton Gee, Hamza Aziz, Haris Khan, Bill Chan

## Project Description

ListIt is an intuitive todo list application for students and young professionals. The application has unique features like priority assignment for tasks, color coordination, and grouping settings. ListIt provides users with a form to create new items, a table view of their upcoming tasks, and a weekly view to more easily visualize upcoming deadlines. Unlike notion or the notes app, ListIt is focused around crafting a central user experience that is unique to each user and their respective tasks.

## UI Prototype

[UI Prototype](https://www.figma.com/file/F2zLCdkTA1iBqbnejYWYgY/ListIt?type=design&node-id=0%3A1&t=TaABfoWTTAxYEwVC-1).

Last updated: 06/06/23

## Class Diagram

[UML Class Diagram](https://github.com/HarisKhan0/todoList/wiki/UML-Class-Diagram)

Last updated: 06/07/23

## Development Enviornment Setup

### React App Setup

1. Clone the repository using the URL form the green "<>Code" button located at the top right of the page.

2. Inside the backend directory, run the following command to install all required dependencies.

```bash
npm install
```

3. Inside the frontend directory, run the same command from step 2 to install all required dependencies.

4. You can start the frontend or backend by running the following command in the corresponding directory.

```bash
npm start
```

### Style Guide

Filenames: lower snake case

Component: upper snake case

Comment Style: double slash (//)

Curly Braces: Curly braces on the same line (K&R style (OTBS))

Alignment: tab

Imports: absolute imports

```javascript
import java.util.ArrayList //example
```

Function Naming Convention: lowerCamelCase()
String Convention: double quotes (“)

Commands for installing Linter (ESLint):

```bash
npm init @eslint/config
```

Instructions for installing IDE instructons:
Followed Canvas instructions for ESLint and then installed VSCode extenion locally.

### Linter Setup

Note: You will need to do this twice, for frontend and backend

1. Run this Command to install eslint (Use default options)

```bash
npm init @eslint/config
```

2. Replace the content in the file ".eslintrc.js" with this:

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": "off",
  },
};
```

3. Run this command

```bash
npm install eslint-config-prettier eslint-plugin-prettier prettier --save-dev
```

4. Add this line in the file "package.json"

```json
"format": "prettier --write './\*_/_.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc"
```

Commands To run eslint:

```bash
npx eslint <FileName.txt>
```

```bash
npx eslint <FileName.txt> --fix
```

Commands To run prettier:

```bash
npx prettier <FileName.txt> --check
```

```bash
npx prettier <FileName.txt> --write
```
