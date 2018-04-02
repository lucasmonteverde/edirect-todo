# EDirectInsure TODO List

This challenge involves the creation of a multi-user task manager web application.

## Setup Guide

#### _Install Dependencies_

`npm i` or `yarn`

#### _Environment Variables_

Copy `.env.example` to `.env` and populate:

```sh
MONGODB=""
JWT_SECRET=""
```

#### _Local Tasks_

- `npm run dev` development task, will start server on `http://localhost:3000` and webpack-dev-server on `http://localhost:3000`

- `npm run build` build local assets.

#### _Server Tasks_

- `npm start` used only for production server with env vars declared, otherwise run `npm run dev` which has `dotenv` configured.


# Demo

[https://edirect-todo.herokuapp.com/](https://edirect-todo.herokuapp.com/) - Heroku hosted app