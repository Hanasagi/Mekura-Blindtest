import React,{Component} from 'react';
import './Home.css';
import UserCard from "../Misc/UserCard";

export default class HomeLoggedIn extends Component {
	render(){
		return(
			<div>
				<UserCard/>
			</div>
			);
	}

}

