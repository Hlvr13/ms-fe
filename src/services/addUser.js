import axios from 'axios';
import getToken from '../resolvers/getToken';
import constantes from '../const';

export default (data) => {
    let {firstName, lastName, phone, email, photo, password } = data;
    return axios({
        url : constantes.url + 'graphql',
        method : 'post',
        data : {
            query : 
                `mutation {
                    addUser(data:{
                        firstName : "${firstName}",
                        lastName  : "${lastName}",
                        email     : "${email}",
                        phone     : "${phone}",
                        photo     : "${photo}",
                        password  : "${password}"
                    }){
                        _id,
                        firstName,
                        lastName,
                        email,
                        phone,
                        photo
                    }
                }`    
        },
        headers : { 'Authorization' : 'JWT ' + getToken() }
    })
}