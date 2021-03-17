import React,{useEffect, Component} from 'react';
import './Home.css';
import UserCard from "../Misc/UserCard";
import UserService from '../Services/UserService'

interface State {
  isLoaded: any;
}

class Home extends Component {

   state: Readonly<State> = {isLoaded: false };

  componentWillMount() {
    let username = localStorage.getItem("user")!
  
    let userJSON = JSON.parse(username)
    let i = UserService.getUserByName(userJSON.username).then((r)=>{
      if(r!=null){
        UserCard.getUserInfo(r)
        this.setState({isLoaded: true })
      }
    });
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
      return (
        <div>
          <UserCard/>
          Logged in
        </div>
      )
    }
  }
}

export default Home;