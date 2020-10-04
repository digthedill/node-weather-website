const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

//resuable info shared to hbs files
const content = {
  title: "Fucking Weather",
  name: "Dill",
};

app.get("", (req, res) => {
  res.render("index", content);
});

app.get("/about", (req, res) => {
  res.render("about", { ...content, title: "About" });
});
app.get("/help", (req, res) => {
  res.render("help", {
    ...content,
    title: "Help",
    msg:
      "If you are in trouble, do not panic and do not call the police. This is a message to provide you the security you need to get through this crazy world.",
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query);
  if (!req.query.address) {
    return res.send({
      error: "You must provide a REAL address!",
    });
  }
  const address = req.query.address;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (!address)
      return res.send({
        error: "Please provide a location",
      });
    if (error) return res.send({ error });
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error });
      res.send({ ...forecastData, location });
    });
  });
});

//404 page specific to help article
app.get("/help/*", (req, res) => {
  res.render("_404", { ...content, error: "Help article not found" });
});

//404 page setup (must be last)
app.get("*", (req, res) => {
  res.render("_404", { ...content, error: "404 page not found" });
});

//listen takes a port as an argument
app.listen(3000, () => {
  console.log("server is up on port 3000");
});
