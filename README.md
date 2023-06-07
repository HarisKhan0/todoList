# ListIt [![Node.js CI](https://github.com/HarisKhan0/todoList/actions/workflows/node.js.yml/badge.svg)](https://github.com/HarisKhan0/todoList/actions/workflows/node.js.yml)

### Contributors: Sam Todd, Winton Gee, Hamza Aziz, Haris Khan, Bill Chan

## Project Description:

ListIt is an intuitive todo list application for students and young professionals. The application has unique features like priority assignment for tasks, color coordination, and grouping settings. ListIt provides users with a form to create new items, a table view of their upcoming tasks, and a weekly view to more easily visualize upcoming deadlines. Unlike notion or the notes app, ListIt is focused around crafting a central user experience that is unique to each user and their respective tasks. 

## UI Prototype

Our intitial UI prototype produced on Figma can be found [here](https://www.figma.com/file/F2zLCdkTA1iBqbnejYWYgY/ListIt?type=design&node-id=0%3A1&t=TaABfoWTTAxYEwVC-1).

Last updated: 06/02/23

## Class Diagram

[Include Link to Class Diagrams Wikipage here]

## Development Enviornment Setup

### Style Guide:

Filenames: lower snake case

Component: upper snake case

Comment Style: double slash (//)

Curly Braces: Curly braces on the same line (K&R style (OTBS))

Alignment: tab

Imports: absolute imports
i.e.) import java.util.ArrayList

Function Naming Convention: lowerCamelCase()
String Convention: double quotes (“)

Commands for installing Linter (ESLint):
npm init @eslint/config

Commands for installing Style Checker:

Instructions for installing IDE instructons:
Followed Canvas instructions for ESLint and then installed VSCode extenion locally.

### Linter Setup

Note: You will need to do this twice, for frontend and backend

Step 1 -> Run this Command to install eslint (Use default options)
npm init @eslint/config

Step 2 -> Replace the content in the file ".eslintrc.js" with this:
module.exports = {
"env": {
"browser": true,
"es2021": true,
"jest": true,
"node": true,
},
"extends": [
"eslint:recommended",
"plugin:react/recommended",
"plugin:prettier/recommended"
],
"overrides": [
],
"parserOptions": {
"ecmaVersion": "latest",
"sourceType": "module"
},
"plugins": [
"react"
],
"rules": {
"react/prop-types": 0,
"react/react-in-jsx-scope": "off"
}
}

Step 3 -> Run this command
npm install eslint-config-prettier eslint-plugin-prettier prettier --save-dev

Step 4 -> Add this line in the file "package.json"
"format": "prettier --write './\*_/_.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc"

Commands To run eslint:

- npx eslint <FileName.txt>
- npx eslint <FileName.txt> --fix

Commands To run prettier:

- npx prettier <FileName.txt> --check
- npx prettier <FileName.txt> --write
