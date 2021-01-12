// Express is already installed
const express = require("express");
// Array of movies
const movies = require("./movies");

const app = express();
// In codesandbox we need to use the default port which is 8080
const port = 8080;

app.get("/", (request, response) => {
  response.send("Welcome to my favourite movie list");
});

app.get("/api/movies", (request, response) => {
  response.status(200).json(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find((elem) => elem.id.toString() === req.params.id);
  if (!movie) {
    res.status(404).send("Not found");
  }
  res.status(200).json(movie);
});

app.get("/api/search", (req, res) => {
  const duration = movies.find(
    (elem) => elem.duration <= Number(req.query.maxDuration)
  );
  if (!duration) {
    res.status(404).send("No movies found for this duration");
  }
  res.status(200).json(duration);
});

app.get("/users", (req, res) => {
  res.status(401).send("Unauthorized");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
