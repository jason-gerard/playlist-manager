# playlist-manager

Web app which allows users to sign up and upload their songs and cover art, and have other people listen to their songs, like them and add them to playlists. The app is a full RESTful API using json web tokens (JWT) for authentication and Vue.js to build a SPA on the front-end.

## Getting Started

Follow these steps to get the project up and running on your local computer.

### Prerequisites

You will need PostgreSQL, Node.js, and a semi modern browser because async / await is used.

### Installing

First git clone the project

```
git clone https://github.com/jason-gerard/playlist-manager.git
```

Then install all dependencies

```
cd server
npm install
```

Next to populate the app with some test users and songs, we will run the index.js file in the seed directory

```
node seed
```

After that start server dev env (script which runs nodemon)

```
npm start
```

Finally we will install front end dependencies and start the front end dev env in a new terminal window

```
cd client
npm install
npm run dev
```

## Built With

-   Express Node.js framework
-   PostgreSQL
-   Sequelize as the ORM
-   Vue.js
-   Materialize front-end UI framework
