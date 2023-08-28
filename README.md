# React Boilerplate & State Management POC

## Setup
- Webpack v5.88
- Eslint v7.32
- Babel v7.22
- React v18.2

This boilerplate does not use `create-react-app` or any other boilerplate framework, it's simply a poor man's boilerplate to quickly get a React environment set up and act as a quick starting off point.

1. Run `npm install` to install project dependencies.
2. Run `npm run dev` to run the dev envornment on port 8080.
3. Open `http://localhost:8080` to view the application.

## Atomic Components
- components/atoms
  - small, isolated components that don't import other components (like a button)
- components/molecules
  - components which import multiple atoms or other molecules
- components/pages
  - top level components, primarily used for route handling

## Signup Form State Management

I chose to store all form values in a single state reference object (`formValues`). This allows the form to be extended for unknown future profile fields (First Name, Email address, etc) without having to define new state variables. On change error handling is added for immediate user feedback.


## A note about mocked implementation

I used [https://dummyjson.com](https://dummyjson.com/docs/users) for a mock API to simulate user creation. After create, the returned user profile is saved in localStorage to simulate a logged in user. Of course, in a production environment, the API would handle server-side validation and we'd securely store the `access_token` and use that to fetch the user profile.