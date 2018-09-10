import axios from 'axios';
import constantes from '../const';

export default (data) => {
    return axios.post(constantes.url + "register/", data);
}