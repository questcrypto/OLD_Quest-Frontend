# quest-project
## Architectural Distinctions
#
This is a standard React web app with the following distinctions:

* Written in TypeScript.
* Divided into separate sub-modules using yarn workspaces.
* Uses [redux-saga](https://github.com/redux-saga/redux-saga) for asynchronous operations.
* Its reducers only take initialized state as a parameter.

## Installation

### 1. Install Dependencies
yarn

### 2 Run Development Server
yarn start
## Working With The Codebase:

### Code Structure 
The codebase is separated into modules. 

#### Front Module
This module contains all of the presentational components for the front end.  The root App component is initialized in src/start-app.tsx and defined in modules/app/app.tsx.  

* public Is the web server entry into the app, which has the main index.html file.
* src Main components and utilities that get built and bundled by webpack.
    1. assets Images and fonts that get bundled with the app, and not served by cdn.
    2. components Components should be kept small.  If the component has some supporting files that are tightly coupled to the component, like a style declaration, create a directory of the same name, in kebab case.  Component names should be pascal case ComponentName.  Currently, the file names for components are pascal cased ComponentName and the directories are kebab cased component-name.  Component types are separated into forms, routes and shared, as the app grows, shared components may be further segmented into similar sub-types.
    3. theme Setup of the global styling and theme.

#### Logic Module

logic Application logic and state management. For any API we need to create three file one for   
    action second one for reducer and third one for saga.
* action define actions, e.g. for login action create login-action.ts file and define actions     e.g. LOGIN_START,LOGIN_SUCCESS,LOGIN_FAILURE
* reducer In reducer we manage the state according to action. e.g for login create       
   login-reducer.ts  file and change the state according to login actions result e.g. LOGIN_START,LOGIN_SUCCESS,LOGIN_FAILURE 
* saga It is a middleware in which we call api and according to result call the success or     
    failure action , e.g. for login create the login-saga.ts file and according to result of api we call the action e.g. LOGIN_SUCCESS , LOGIN_FAILURE.


#### Routing
All app routes are declared in /src/modules/app/components/routes/routes.tsx.  Route components /src/modules/app/components/routes/routes.tsx should be thin, and setup state that is passed via props to components included within the route. 

### Styled Components
[Styled Components](https://www.styled-components.com/) are used to define styles that are modular and reusable alongside React components. Theme variables should always be preferred over defining styles inline, unless they are one-time use. Theme variables are defined in /src/shared/styles/theme.ts.  The theme variables are provided via the `<ThemeProvider />`that wraps the main <App />, and so can be accessed via theme props in any Styled Component, like so 


javascript 
background-color: ${(props: ThemeProps<Theme>) => props.theme.backgroundDark};

Global css styles that affect DOM elements across the entire app are defined in front/src/theme/global.ts. 
### State Management
The app uses [Redux](https://redux.js.org/api/api-reference) for state management and [Redux Saga](https://github.com/redux-saga/redux-saga) for async state changes.  The app differs from other redux implementations by:
* Reducers that are defined in the app are distinguished from third-party reducers, like connected-react-router, the former should be defined in the combinedDefinedReducers call in the root reducer, while the latter should be in combineReducers.


## Linting
Always run yarn tslint before submitting PRs and fix any errors that cannot be autofixed. In the near future, pre-commit hooks will be used to automatically run this step, and autofix any autofixable errors.

## IDE Setup:
Your IDE should be able to warn you of TSLint errors as defined in the tslint.json.  Ideally you can also configure your IDE to automatically fix errors on save.

### Web Storm
Recompile Typescript on save:
Preferences > Languages and Frameworks > Typescript > Recompile on Changes (check box)

Show correct project tslint errors: 
Preferences > Languages and Frameworks > Typescript > TSLint > Enable (check box) 
Preferences > Languages and Frameworks > Typescript > TSLint > Configuration File > Automatic Search

Fix errors on save:
Set two separate File Watchers in Preferences > Tools > File Watcher > Custom
File Type: Typescript
Scope: Current File
Program: [absolute project path]/node_modules/.bin/tslint
Arguments: -c $ProjectFileDir$/tslint.json --fix $FileName$
Output paths to refresh:
Working directory: $FileDir$
Environment Variables: 
(Uncheck all Advanced Options)
Set up the second File Watcher with all the same options +  File Type: Typescript JSX

### VS Code 
// TODO

References:
[Styled Components](https://www.styled-components.com/)
[Redux](https://redux.js.org/api/api-reference)
[Redux Saga](https://github.com/redux-saga/redux-saga)
[Formik Form](https://github.com/jaredpalmer/formik)