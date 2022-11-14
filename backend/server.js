const Api = require("./api.js");
const myApi = new Api();
const express = require("express");
const port = 8019;
//const port = 5000;
// const { restart } = require("nodemon");
// const cors = require("cors");
// const Home = require("./services/Home.js");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");

const index = require("./routes/index");

const passport = require("passport");
const config = require("./config/config");
const BearerStrategy = require("passport-azure-ad").BearerStrategy;

// const home = new Home();

const options = {
  identityMetadata: `https://${config.mazureConfig.metadata.authority}/${config.mazureConfig.credentials.tenantID}/${config.mazureConfig.metadata.version}/${config.mazureConfig.metadata.discovery}`,
  issuer: `https://${config.mazureConfig.metadata.authority}/${config.mazureConfig.credentials.tenantID}/${config.mazureConfig.metadata.version}`,
  clientID: config.mazureConfig.credentials.clientID,
  audience: config.mazureConfig.credentials.clientID, // audience is this application
  validateIssuer: config.mazureConfig.settings.validateIssuer,
  passReqToCallback: config.mazureConfig.settings.passReqToCallback,
  loggingLevel: config.mazureConfig.settings.loggingLevel,
  loggingNoPII: config.mazureConfig.settings.loggingNoPII,
};
const bearerStrategy = new BearerStrategy(options, (token, done) => {
  // Send user info using the second argument
  done(null, {}, token);
});

var subDir = "ah2stagingwebservice";
const app = express();
app.set("trust proxy", 1); // trust first proxy
app.use(function (req, res, next) {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://assetcaredemo.keppelom.com",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.append("Access-Control-Allow-Credentials", true);
  res.append("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.append(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-PINGOTHER, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    return res.status(200).json({});
  }
  next();
});
app.use(`/${subDir}/public`, express.static("public"));

// CORS implemented so that we don't get errors when trying to access the server from a different server location
// app.use(cors());
// app.options("*", cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(passport.initialize());
passport.use(bearerStrategy);

app.use(`/${subDir}`, index(myApi, passport));
// app.use(`/${subDir}`, userData(myApi, passport));

const server = http.createServer(app);
const io = socketIo(server, {
  path: `/${subDir}/socket.io`,
  handlePreflightRequest: (req, res, next) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
  },
});

io.of(`${subDir}`).on("connection", (socket) => {
  console.log(" io New client connected");
  myApi.CreateSocket(socket);
});

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
