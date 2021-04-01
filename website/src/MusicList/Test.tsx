import React, {useEffect} from 'react';
import {io} from "socket.io-client";

export default function Test(){

    useEffect(() => {
        const connectSocket=async()=>{
            const socket = io(window.location.hostname+":4001", {transports: ['websocket'], reconnection: true, rejectUnauthorized: false })
            let user = JSON.parse(localStorage.getItem("user")!)
            socket.on("connect", function () {
                console.log("connected: " + socket.id);
            });
            socket.on("list users",(user)=>{
                usertoDiv(user)
            })
            socket.emit("join room", window.location.href, user.user[0].username, user.user[0].profilePic)
            socket.on("error", (err) => {
                console.log(`${err.message}`);
            });
            window.addEventListener("beforeunload",()=>{
                let userDiv=document.querySelectorAll(".Test > div")
                for(let i=0;i<userDiv.length;i++) {
                    if(userDiv[i].innerHTML===user.user[0].username){
                        userDiv[i].remove()
                    }
                }
            })
        }
        connectSocket()
    },[])

    let usertoDiv=(user:any)=>{
        console.log(user)
        for(let i =0;i<user.users.length;i++){
            let div = document.querySelector(".Test")
            console.log(user.users[i])
            let userDiv=document.createElement("div")
            userDiv.innerHTML=user.users[i].username
            div!.append(userDiv)
        }

    }
    return(
        <div className="Test">{window.location.hash}</div>
    )
}