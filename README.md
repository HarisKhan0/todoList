# Todo List [![Node.js CI](https://github.com/HarisKhan0/todoList/actions/workflows/node.js.yml/badge.svg)](https://github.com/HarisKhan0/todoList/actions/workflows/node.js.yml)

### Contributors: Sam Todd, Winton Gee, Hamza Aziz, Haris Khan, Bill Chan 

## Style Guide:

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

## ESLint Setup Instructions

Note: You will need to do this twice, for frontend and backend

Step 1 -> Run this Command to install eslint (Use default options) 
npm init @eslint/config

Step 2 -> Replace the content in the file ".eslintrc.js"  with this: 
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
"format": "prettier --write './**/*.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc"
 
Command To run eslint: 
npx eslint <FileName.txt> --fix
