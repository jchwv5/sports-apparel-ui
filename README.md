# Sports Apparel, Inc.

This is a starter project for a Sports Apparel Company that was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install Prerequisites

### Node Version Manager (NVM)

NVM is a utility to help you quickly install and switch between Node versions. With NVM, there is no need to manually install and uninstall versions.

Follow the Installation Steps for [NVM on GitHub](https://github.com/coreybutler/nvm-windows).

## Getting Started

1. Clone this project locally.
2. Run `npm install` in the root folder to install dependencies.

This command installs a package, and any packages that it depends on.

3. Run `npm start`.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Features

* Page that displays products
* Fetch call to the `sports-apparel-api`

## Dependencies

* Refer to the Getting Started section of the README for the [sports-apparel-api repository](https://gitlab.catalyt.es/training/cyclecurriculum/group-project/trainer-resources/sports-apparel-api)
* ESLint\
`npm install eslint-config-airbnb eslint-plugin-jsx-a11y typescript @typescript-eslint/parser`
* React Router Dom\
`npm install react-router-dom`
* Material UI Core\
`npm install @material-ui/core`
* Material UI Icons\
`npm install @material-ui/icons`
* CLSX Styling\
`npm i -S clsx`

## Available Commands

In the project directory, you can run:

### `npm run lint`

Runs linting on project that uses Eslint with AirBnB config.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
