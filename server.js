const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(session({
  secret: "worldview", 
  resave: false,
  saveUninitialized: true,
  cookie: {secure: "auto"}
}));
// Define API routes here
const routes = require("./routes/api.js");
const userRoutes = require("./routes/user-routes");
app.use('/users', userRoutes);
app.use(routes);

// Send every other request to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/worldview", { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
