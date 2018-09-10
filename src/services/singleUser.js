import axios from 'axios';
import getToken from '../resolvers/getToken';
import constantes from '../const';

export default (id) => {

    return axios ({
        url    : constantes.url + 'graphql',
        method : 'post',
        data   : {
            query : 
                `query {
                    singleUser(id:"${id}") {
                        _id,
                        firstName,
                        lastName,
                        email,
                        phone,
                        genre,
                        location,
                        photo,
                        urlYT,
                        urlFB,
                        urlTW,
                        instrument {
                            _id,
                            name
                        }
                    }
                }`
        },
        headers : {
            'Authorization' : 'JWT '+ getToken()
        } 
    })
}

//instrument,