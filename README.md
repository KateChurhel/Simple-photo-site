# Simple site with photos

This doc provides how-to-get-started information.

## Table of Contents

1. [Pre-requirements](#1-pre-requirements)
1. [Project setup and running](#2-project-setup-and-running)
1. [Project code style](#3-project-code-style)

## 1. Pre-requirements
- node: ~10.16.3
- npm: ~6.10.3

## 2. Project setup and running
#### 2.1 `npm` commands
- `npm install` installs all dependencies
- `npm start` starts dev server
- `npm run build` builds bundle. It will be located in `./build` folder
- `npm run configure` configures environment variables. They will be located in `./build/env.js` file

#### 2.2 Environment variables
To change the environment variables, add a new file `.env` to the root, following the example `.env.tpl`.

## 3. Project code style

- The project uses **eslint** with _airbnb_ codestyle [for JavaScript](https://github.com/airbnb/javascript) and
[for React](https://github.com/airbnb/javascript/tree/master/react) with some differences. 
- The project uses [**ITCSS**](https://github.com/ahmadajmi/awesome-itcss) methodology and **stylelint** with _standard_
codestyle [for styles](https://github.com/stylelint/stylelint-config-standard) with some differences.
