require("dotenv").config();
const express = require("express");
const http = require("node:http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const cors = require("cors");

const port = process.env.APP_PORT;
const imageUrl = process.env.BASE_URL;
const corsOrigin = process.env.FRONTEND_URL;
const dbConnect = require("./app/database/database.js");
const routes = require("./app/routes");
const workSocket = require("./app/socket/workSocket");

app.use(cors());
app.use(express.json());
app.use(`${imageUrl}/images`, express.static(`${__dirname}/public/images/`));
dbConnect();

const io = new Server(server, {
  cors: {
    origin: corsOrigin,
  },
});

io.on("connection", (socket) => {
  workSocket(io, socket);
});

app.use(routes);

console.log(__dirname);

app.get("/", (req, res) => {
  res.send("working");
});

server.listen(port, () => {
  console.log("app running on port", port);
});
