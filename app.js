const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any");
    const joke = response.data;
    res.render("index", { joke });
  } catch (error) {
    console.error(error);
    res.render("index", { joke: null });
  }
});

app.get("/joke", async (req, res) => {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any");
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch joke" });
  }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
