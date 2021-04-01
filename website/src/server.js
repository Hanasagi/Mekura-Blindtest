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
        console.log(rooms)
    })

    socket.on('disconnecting', () =>{
        io.sockets.emit('user disconnected');
        for (let key of rooms.keys()) {
            for(let value in rooms.get(key)){
                if(rooms.get(key)[value].id===socket.id){
                    rooms.get(key).splice(value,1)
                    updateUsersList(rooms.get(key))
                    if (!rooms.get(key).length) {
                        rooms.delete(key);
                        socket.disconnect(true);
                        console.log("destroyed")
                    }
                }
            }
        }
        console.log(rooms)
        /*socket.leave(room)
        let userList = rooms.get(room)
        io.sockets.in(room).emit({
            type: 'status',
            text: 'disconnected',
            created: Date.now(),
        });
        userList.filter(u=>u.id!==socket.id);

        console.log(rooms)*/
    });

    function updateUsersList(room){
        io.sockets.to(room).emit('list users', {
            users: rooms.get(room)
        });
    }

});


http.listen(port,()=> console.log('server running on port '+port));
