const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./dbConn");
const { expressjwt: jwt } = require("express-jwt");

const jwks = require("jwks-rsa");
const axios = require("axios");

const bodyParser = require("body-parser");
const routesHandler = require("./routes/handler");
const path = require("path");
const PORT = process.env.PORT;

const app = express();
app.use(express.static(path.join(__dirname + "/public")));
const verifyJWT = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-1hq24248m4pbr1hf.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://covid-tracker/",
  issuer: "https://dev-1hq24248m4pbr1hf.us.auth0.com/",
  algorithms: ["RS256"],
});
//app.use(verifyJWT);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", routesHandler);

connectDB();
mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
  app.listen(PORT || 5000, () => {
    console.log(`server is running on port ${PORT}.`);
  });
});

app.get("/", function (req, res) {
  res.send("Welcome to our API");
});
