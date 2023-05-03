const express = require('express');
const body_parser =require('body-parser');
const userRouter =require('./routers/user.router');
const imgRouter =require('./routers/img.router');
const itemRouter =require('./routers/item.router');

const cors = require("cors");
var http = require('http');

const app = express();

var server = http.createServer(app);
var io = require("socket.io")(server);

app.use(express.json());
var clients = {};
app.use(cors());

io.on("connection",(socket) => {
    console.log("connected");
    console.log(socket.id," has joined");
    socket.on("passId", (name) => {
        console.log(name);
        clients[name] = socket;
        //console.log(clients);
    });
    socket.on("message", (msg) => {
        console.log(msg);
        let targetName = msg.targetName;
        if(clients[targetName]) {
            console.log("Emiting message")
            clients[targetName].emit("message",msg);
        }
    })
});

server.listen(3001, "0.0.0.0", () => {
    console.log("Server started");
})

app.use(body_parser.json());

app.use('/',userRouter);
app.use('/profile',imgRouter)
app.use('/item',itemRouter)

module.exports=app;