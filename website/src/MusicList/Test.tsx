import React from 'react';
import {io} from "socket.io-client";


const socket = io(window.location.hostname+":4001", {transports: ['websocket'], reconnection: true, rejectUnauthorized: false })
localStorage.debug = '*';

socket.on("error", (err) => {
    console.log(`${err.message}`);
});

socket.on("list users",(user)=>{
    usertoDiv(user)
})

socket.on("connect", function () {
    console.log("connected: " + socket.id);
});

socket.on("leave", function (room) {
    console.log("disconnected: " + socket.id);
});

let user = JSON.parse(localStorage.getItem("user")!)
socket.emit("join room",window.location.origin+"/game"+window.location.hash)
socket.emit("join server",window.location.origin+"/game"+window.location.hash,user.user[0].username, user.user[0].profilePic)

function usertoDiv(user:any){
    console.log(user)
    for(let i =0;i<user.users.length;i++){
        let div = document.getElementById('Test')!
        div.append(document.createElement("a").innerText=user.users[i])
    }

}


export default function Test(){
    return(
        <div className="Test">a</div>
    )
}