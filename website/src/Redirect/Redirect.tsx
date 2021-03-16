import React,{useEffect} from 'react';
import './Redirect.css';
import UserService from '../Services/UserService'
import axios from 'axios'

function Redirect() {
  return (
    <div>
        {FetchUserToken()}
    </div>
  )
}

function readGrantCode(){
  return window.location.href.substring(window.location.href.indexOf("=")+1)
}

function FetchUserToken(){
  useEffect(() => {
    async function fetchToken(){
      let code = readGrantCode();
      let options = {
        url: 'https://discord.com/api/oauth2/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          "client_id": "817438308823990312",
          "client_secret": "",
          "grant_type": 'authorization_code',
          "code": code,
          "redirect_uri": "http://172.17.89.177:3000/redirect",
          "scope": 'identify guilds'
        })
      }
      //eslint-disable-next-line
      let get_token = await fetch('https://discord.com/api/oauth2/token', options).then((response) => {
        return response;
      }).then(response=>{
        return response.json();
       }).then(response=>{
        fetchUserInfo(response)
      });
    };
      fetchToken()
  },[])
  return "";
}

async function fetchUserInfo(token:any){
      axios.get(
          `https://discordapp.com/api/users/@me`,
          {headers: {Authorization: `Bearer ${token.access_token}`}}
        ).then(r=>{
          return r
        }).then(r=>{
          let user={"username":r.data.username,"profilePic":`https://cdn.discordapp.com/avatars/${r.data.id}/${r.data.avatar}.png?size=256`,"token":token}
          UserService.createUser(JSON.stringify(user))
        })
}

export default Redirect;
