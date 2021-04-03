import React, {useEffect} from 'react';
import {io} from "socket.io-client";
import './Test.scss'

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
            socket.on("remove user",(user)=>{
                let userDiv = evaluateXPath(`//div[@class='Test']/div/div[@class='${user.user.username}']`)!
                let wrapper = document.querySelector('.'+userDiv.parentElement!.className)!
                let i= parseInt(userDiv.parentElement!.className!.charAt(1))
                wrapper.removeChild(userDiv)
                let iterator=document.querySelectorAll(".Test>div").length
                for(i;i<iterator;i++){
                    let elemI=document.querySelector(`.Test>div>div:nth-child(${i})`)
                    if(elemI!==null) {
                        elemI.parentNode!.insertBefore(elemI,elemI.parentNode!.firstChild)
                        document.querySelector(`.Test > div > div:nth-child(${i})`)!.remove()
                    }
                }
            })
            socket.emit("join room", window.location.href, user.user[0].username, user.user[0].profilePic)
            socket.on("error", (err) => {
                console.log(`${err.message}`);
            });
        }
        connectSocket()
    },[])

    let usertoDiv=(user:any)=>{
        let userDiv=document.querySelectorAll(".Test > div > div")
        let j=0;

        for(let i =0;i<user.users.length;i++){
            let checkUserPresence=evaluateXPath(`//div[@class='Test']/div/div[@class='${user.users[i].username}']`)
            if(checkUserPresence!==null){

                console.log(user.users)
                user.users.splice(i,1)
                console.log(user.users)
            }
            j++;
            let div = document.querySelector(`.Test > .P${j}`)
            let userDiv=document.createElement("div")
            let username=document.createElement("p")
            let profilePic=document.createElement("img")
            username.innerHTML=user.users[i].username
            profilePic.src=user.users[i].profilePic
            userDiv.className=user.users[i].username
            userDiv.append(username,profilePic)
            div!.append(userDiv)

        }

    }
    let evaluateXPath=(xpath:string)=>{
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    return(
        <div className="Test">{window.location.hash}
            <div className="P1">Test</div>
            <div className="P2">Test</div>
            <div className="P3">Test</div>
            <div className="P4">Test</div>
            <div className="P5">Test</div>
            <div className="P6">Test</div>
            <div className="P7">Test</div>
            <div className="P8">Test</div>
        </div>
    )
}