import React,{useEffect} from 'react';
import './Redirect.css';
import UserService from '../Services/UserService'
import MiscService from '../Services/MiscService'
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
      let secret= await fetchSecret()
      secret = secret.replaceAll('"','')

      let options = {
        url: 'https://discord.com/api/oauth2/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          "client_id": "817438308823990312",
          "client_secret": secret,
          "grant_type": 'authorization_code',
          "code": code,
          "redirect_uri": "http://localhost:80/redirect",
          "scope": 'identify guilds'
        })
      }
      //eslint-disable-next-line
      let get_token = await fetch('https://discord.com/api/oauth2/token', options).then((response) => {
        return response;
      }).then(response=>{
        return response.json();
       }).then(response=>{
        FetchUserInfo(response)
      }).catch((error)=>console.error(error));
    };
      fetchToken()
  },[])
  return "";
}

function fetchSecret(){
  let secret = MiscService.getByName("sc").catch((error)=>console.error(error));
      return secret.then((r:any)=>{
        return r.data.value;
      })
}

async function FetchUserInfo(token:any){
      axios.get(
          `https://discordapp.com/api/users/@me`,
          {headers: {Authorization: `Bearer ${token.access_token}`}}
        ).then(r=>{
          return r
        }).then(r=>{
          let user={"username":r.data.username,"profilePic":`https://cdn.discordapp.com/avatars/${r.data.id}/${r.data.avatar}.png?size=256`,"token":token}
          UserService.createUser(JSON.stringify(user))
          localStorage.setItem("user",`{"user":[{"username":"${r.data.username}","token":"${token.access_token}"}]}`)
        }).then(r=>{
           window.location.href = "/"
        })
}

export default Redirect;
