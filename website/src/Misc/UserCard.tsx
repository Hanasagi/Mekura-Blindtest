import React,{Component} from 'react';
import './UserCard.scss';
import UserService from '../Services/UserService'

class UserCard extends Component {
  private obj: any;
  constructor(props:any){
    super(props)
    this.obj = JSON.parse(localStorage.getItem("user")!)
  }
  

  render() {
      return(
        <div className="userCard">
          <img alt="profilePic" className="profilePic" src={this.getProfilePicture()}></img>
          <p className="username">{this.getUsername()}</p>
          <button type="button" onClick={() => this.handleLogout()}>Log out</button>
        </div>
      );
    }

  getProfilePicture(): string{
    let t = this.obj.user[0].profilePic
  	return t
  }

  getUsername(): string{
    let t= this.obj.user[0].username
    return t
  }

  handleLogout(){
    let t = this.obj.user[0].id
    UserService.deleteUser(t)
    localStorage.removeItem(this.obj)
    window.location.href = "/"
  }
}

export default UserCard;
