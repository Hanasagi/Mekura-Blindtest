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

let rooms=new Map()

io.on("connection",socket=>{
    socket.on("join server",(room,username,profilePic)=>{
        const user={
            username,
            profilePic,
            id: socket.id,
        };
        rooms.get(room).push(user);
        updateUsersList(room)
    })

    socket.on("join room",(roomName)=>{
        socket.join(roomName);
        if (!rooms.has(roomName)) {
            rooms.set(roomName, []);
        }
        console.log(rooms)
        updateUsersList(roomName)
    });

    socket.on("leave",(room)=>{
        socket.leave(room)
        let userList = rooms.get(room)
        userList.filter(u=>u.id!==socket.id);
        updateUsersList(room)
        if (!userList.length) {
            rooms.delete(room);
            socket.disconnect(true);
            console.log("destroyed")
        }
        console.log(rooms)
    })
    socket.on('disconnect', function () {
        io.sockets.emit('room disconnected');
    });

    function updateUsersList(room){
        socket.to(room).emit('list users', {
            users: rooms.get(room)
        });
    }

});


http.listen(port,()=> console.log('server running on port '+port));
