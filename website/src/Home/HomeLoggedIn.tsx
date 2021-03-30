import React, {Component, useState, useRef} from 'react';
import {io} from "socket.io-client";
import './Home.css';
import UserCard from "../Misc/UserCard";

const socket = io(window.location.hostname+":4001", {transports: ['websocket'], reconnection: true, rejectUnauthorized: false })
localStorage.debug = '*';

socket.on("error", (err) => {
    console.log(`${err.message}`);
});

socket.on("connect", function () {
    console.log("connected");
});
console.log(socket.connected)

const initialFormData = Object.freeze({
    room: "",
});


export default function HomeLoggedIn() {
    const [username, setUsername] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [allRoom] = useState<string[]>([]);
    const [formData, updateFormData] = React.useState(initialFormData);
    const handleChange = (e: any) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };
    const setRooms = (roomName: string) => {
        let roomdiv = document.getElementById("roomlist")
        let subdiv = document.createElement("div")
        let a = document.createElement("a")
        a.href = roomName;
        a.innerText = roomName;

        subdiv.append(a)
        allRoom.push(roomName)
        // @ts-ignore
        roomdiv.append(subdiv)
        console.log(allRoom)
    }
    let createRoom = (e: any) => {
        e.preventDefault()
        let user = JSON.parse(localStorage.getItem("user")!)
        socket.emit("join server",user.user[0].username, user.user[0].profilePic)
        socket.emit("join room",window.location.origin+"/game#"+formData.room)
        socket.emit("list room")
        console.log()
       // window.location.href=window.location.origin+"/game#"+formData.room
    }
    return (
        <div>
            <UserCard/>
            <form onSubmit={createRoom}><input onChange={handleChange} type="text" name="room"></input>
                <button type="submit">Submit</button>
            </form>
            <div id="roomlist">Room List
            </div>
        </div>
    );
}




