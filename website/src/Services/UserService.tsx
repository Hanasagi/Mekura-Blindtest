import axios from 'axios';
const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/user";

class UserService {

        getUsers(){
                return axios.get(EMPLOYEE_API_BASE_URL);
        }

        createUser(user: string) {
                return axios.post (EMPLOYEE_API_BASE_URL, {headers:{ "Content-Type": "application/x-www-form-urlencoded" }, user})
        }

        getUserById(userId:any){
                return axios.get(EMPLOYEE_API_BASE_URL + '/' + userId);
        }

        updateUser(user:any, userId:any){
                return axios.put(EMPLOYEE_API_BASE_URL + '/' + userId, user);
        }

        deleteUser(userId:any){
                return axios.delete(EMPLOYEE_API_BASE_URL + '/' + userId);
        }
}

export default new UserService()