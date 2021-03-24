import axios from 'axios';
const BASE_URL = "https://openings.moe/";

class FetchMusic {

        initialFetch(){
               return axios.get(BASE_URL+"/api/list.php");
        }
}

export default new FetchMusic()