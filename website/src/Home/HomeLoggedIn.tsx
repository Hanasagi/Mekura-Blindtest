import React, {useState, useEffect} from 'react';
import './Home.css';
import UserCard from "../Misc/UserCard";

export default function HomeLoggedIn() {

    useEffect(() => {
        const connectSocket=async()=>{
            let rooms = localStorage.getItem("room")!
            if(rooms!==null){
                rooms=JSON.parse(rooms)
                for(let i =0;i<rooms.length;i++){
                    setRooms(rooms[i])
                }
            }
        }
        connectSocket()
    },[])

    const initialFormData = Object.freeze({
        room: "",
    });
    const rooms:string[]= [];
    const [roomList,setRoomList]= useState(rooms)
    const [formData, updateFormData] = useState(initialFormData);
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
        a.href = window.location.origin+"/game#"+formData.room;
        a.innerText = roomName;
        subdiv.append(a)
        roomdiv!.append(subdiv)
        setRoomList([...roomList,roomName])
    }
    let createRoom = (e: any) => {
        e.preventDefault()
        setRooms(formData.room)
        window.location.href=window.location.origin+"/game#"+formData.room
    }
    return (
        <div>
            <UserCard/>
            <form onSubmit={createRoom}><input onChange={handleChange} type="text" name="room"/>
                <button type="submit">Submit</button>
            </form>
            <div id="roomlist">Room List
            </div>
        </div>
    );
}




