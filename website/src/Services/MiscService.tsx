import axios from 'axios';
const BASE_URL = "http://localhost:8080/api/v1/misc";

class MiscService {

        getUsers(){
                return axios.get(BASE_URL);
        }

        createEntry(entry: any) {
                return axios.post<string>(BASE_URL, {headers:{ "Content-Type": "application/x-www-form-urlencoded" }, entry});
        }

        getByName(name:string){
                return axios.post<string>(BASE_URL + '/search',{headers:{ "Content-Type": "application/x-www-form-urlencoded"},name});
        }

        getEntryById(entryId:number){
                return axios.get<number>(BASE_URL + '/' + entryId,{headers:{ "Content-Type": "application/x-www-form-urlencoded" }});
        }

        updateEntry(entry:any, entryId:number){
                return axios.put(BASE_URL + '/' + entryId, entry);
        }

        deleteEntry(entryId:number){
                return axios.delete<number>(BASE_URL + '/' + entryId);
        }
}

export default new MiscService()