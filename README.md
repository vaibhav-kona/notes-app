# Notes App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features
- Listing of the folders tree and notes per folder 
- Create folders with upto 2 level nesting
- Move notes from one folder to another
- Create, update, delete and recover notes

**High level architecture** 

![hld.drawio.svg](documentation/hld.drawio.svg)


**Schema and api design is here** - [apis.md](documentation/apis.md)


## Dependencies
1. node >= 20
2. npm >= 10
3. yarn
   1. `npm i -g yarn`
4. json-server
   1. `npm i -g json-server` 

## Mock server setup
- Install json-server globally
  `npm install -g json-server`
- db.json has the initial base data. This can be updated as needed to test different scenarios
- `yarn start:server` to start the server for the mock apis

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**NoteEditor: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn lint`
Linting is configured with eslint to enable good coding practices.

## Testing
- Testing in watch mode can be run as below
  - Watch mode - `yarn run test`
  - CI mode - `yarn run test:ci` 

## Linting

- Setup prettier for ide (https://prettier.io/docs/en/editors.html)
- Enable format on save in vscode, webstorm
- CRA uses internal eslint as lint output that comes with the separate eslint config is not added since this will only help with feedback when plugin is installed in the editor as
- Linting and test on staged files - Run `npx lint-staged` to run linting and formatting fixes for the staged files
