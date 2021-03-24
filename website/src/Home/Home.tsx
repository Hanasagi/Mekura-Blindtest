import React,{Component} from 'react';
import './Home.css';
import HomeLoggedIn from "./HomeLoggedIn"
import UserService from '../Services/UserService'
import axios from 'axios'

interface State {
  isLoaded: any;
}

class Home extends Component {

   state: Readonly<State> = {isLoaded: false };

  componentDidMount() {
    let username = localStorage.getItem("user")!
    if(username!=null){
      let userJSON = JSON.parse(username)

      UserService.getUserByName(userJSON.user[0].username).then((r: any)=>{
        if(r!=null){
          let t = JSON.parse(r.data.token)
          let u =
          `{"user":
            [{
              "username":${r.data.username},
              "profilePic":${r.data.profilePic},
              "token":"${t.access_token}",
              "id":"${r.data.id}"
            }]
          }`
          localStorage.setItem("user",u)
          this.setState({isLoaded: true })
        }
      });
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return(
        <div className="App">
        <a
          className="App-link"
          href="https://discord.com/api/oauth2/authorize?client_id=817438308823990312&redirect_uri=http%3A%2F%2F172.17.89.177%3A3000%2Fredirect&response_type=code&scope=identify%20guilds"
          rel="noopener noreferrer"
        >
          Log in
        </a>
    </div>
      ) 
    } else {
      return (<HomeLoggedIn/>)
    }
  }
}

export default Home;