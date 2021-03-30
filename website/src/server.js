const app = require('express')();
const http = require('http').createServer(app);
const socketIO = require('socket.io');

let io = socketIO(http,{
    cors: {
        origin: "localhost:4001/",
        methods: ["GET", "POST"]
    }
})

app.get("/", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});

app.get("/game", (req, res) => {
    const { id } = window.location.hash;
    console.log(id)
});

const port = process.env.PORT || 4001;

let users=[]
let rooms=[]

io.on("connection",socket=>{
    socket.on("join server",(username,profilePic)=>{
        const user={
            username,
            profilePic,
            id: socket.id,
        };
        users.push(user);
        io.emit("new user",users);
    })

    socket.on("join room",(roomName)=>{
        socket.join(roomName);
        if (typeof rooms[roomName] === "undefined")
            rooms[roomName] = {};
        io.sockets.in(roomName).emit('message', 'what is going on, party people?');
    });
    socket.on("new user",()=>{
        console.log(users)
    })
    socket.on("list room",()=>{
        console.log(socket.rooms)
        console.log(rooms)
    })

    socket.on("list user",()=>{
        console.log(users)
    })
    socket.on("disconnect",()=>{
        users= users.filter(u=>u.id!==socket.id);
        io.emit("new user",users);
    })

    socket.on('message', function(data) {
        console.log('Incoming message:', data);
    });
});

http.listen(port,()=> console.log('server running on port '+port));
