import axios from 'axios';
import getToken from '../resolvers/getToken';
import constantes from '../const';

export default (id, data) => {
    let {firstName, lastName, phone, email, photo, instrument, urlYT, urlFB, urlTW } = data;
    return axios({
        url : constantes.url + 'graphql',
        method : 'post',
        data : {
            query : 
                `mutation {
                    updateUser(id:"${id}", data:{
                        firstName  : "${firstName}",
                        lastName   : "${lastName}",
                        email      : "${email}",
                        phone      : "${phone}",
                        photo      : "${photo}",
                        instrument : "${instrument}",
                        urlYT      : "${urlYT}",
                        urlFB      : "${urlFB}",
                        urlTW      : "${urlTW}",
                        location   : "Pitiquito"
                    }){
                        _id,
                        firstName,
                        lastName,
                        email,
                        phone,
                        photo,
                    }
                }`    
        },
        headers : { 'Authorization' : 'JWT ' + getToken() }
    })
}