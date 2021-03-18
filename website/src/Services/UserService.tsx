import axios from 'axios';
const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/user";

class UserService {

        getUsers(){
                return axios.get(EMPLOYEE_API_BASE_URL);
        }

        createUser(user: any) {
                return axios.post<string>(EMPLOYEE_API_BASE_URL, {headers:{ "Content-Type": "application/x-www-form-urlencoded" }, user});
        }

        getUserByName(username:string){
                return axios.post<string>(EMPLOYEE_API_BASE_URL + '/search',{headers:{ "Content-Type": "application/x-www-form-urlencoded"},username});
        }

        getUserById(userId:number){
                return axios.get<number>(EMPLOYEE_API_BASE_URL + '/' + userId,{headers:{ "Content-Type": "application/x-www-form-urlencoded" }});
        }

        updateUser(user:any, userId:any){
                return axios.put(EMPLOYEE_API_BASE_URL + '/' + userId, user);
        }

        deleteUser(userId:number){
                return axios.delete<number>(EMPLOYEE_API_BASE_URL + '/' + userId);
        }
}

export default new UserService()