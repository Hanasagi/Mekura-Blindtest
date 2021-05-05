
const app = require('express')();
const http = require('http').createServer(app);
const socketIO = require('socket.io');

let io = socketIO(http,{
    cors: {
        origin: "localhost:4001/",
        methods: ["GET", "POST"]
    }
})


const port = process.env.PORT || 4001;

let rooms=new Map()
let games= new Map()

io.on("connection",socket=>{
    socket.on("join room",(room,username,profilePic)=>{
        socket.join(room);
        if (!rooms.has(room)) {
            rooms.set(room, []);
        }
        const user={
            username,
            profilePic,
            id: socket.id,
        };
        rooms.get(room).push(user);
        updateUsersList(room)
    })

    socket.on("start game",(room,musicList)=>{
        console.log(room, musicList)
        if (!games.has(room)) {
            games.set(room, musicList);
        }
        console.log(games)
    })

    socket.on('disconnecting', () =>{
        for (let key of rooms.keys()) {
            for(let value in rooms.get(key)){
                if(rooms.get(key)[value].id===socket.id){
                    io.sockets.to(key).emit('user disconnected');
                    removeUser(key,rooms.get(key)[value])
                    rooms.get(key).splice(value,1)

                    if (!rooms.get(key).length) {
                        rooms.delete(key);
                        socket.disconnect(true);
                        console.log("destroyed")
                    }
                }
            }
        }
    });

    function updateUsersList(room){
        io.sockets.to(room).emit('list users', {
            users: rooms.get(room)
        });
    }

    function removeUser(room,user){
        io.sockets.to(room).emit('remove user', {
            user: user
        });
    }

});


http.listen(port,()=> console.log('server running on port '+port));
