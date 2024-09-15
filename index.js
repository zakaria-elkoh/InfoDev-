const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const session = require('express-session');
const flash = require('connect-flash');
const articleRoutes = require("./router/article.router");
const commentRoutes = require("./router/comment.router");
const registerPath = require("./router/register.router");
const loginPath = require("./router/login.router");
const pageNotFoundPath = require("./router/404.router");
const db = require("./models");

// session middleware
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Définir le répertoire des vues
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());

// Analyser les corps des requêtes
app.use(bodyParser.urlencoded({ extended: true }));

// Définir le répertoire public pour les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Middleware to pass session data to views
// Make userId available in all views
app.use((req, res, next) => {
  res.locals.userId = req.session.userId || null;
  next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(flash());

app.use(articleRoutes);
app.use(registerPath);
app.use(loginPath);
app.use(commentRoutes);
app.use(pageNotFoundPath);


db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
})

// Définir le répertoire des vues
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");


// // Analyser les corps des requêtes
// app.use(bodyParser.urlencoded({ extended: true }));

// // Définir le répertoire public pour les fichiers statiques
// app.use(express.static(path.join(__dirname, "public")));

// app.use(articleRoutes);


// db.sequelize.sync().then(() => {
//   app.listen(3000, () => {
//     console.log("Server is running on http://localhost:3000");
//   });
// });
