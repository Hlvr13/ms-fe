import axios from 'axios';
import getToken from '../resolvers/getToken';
import constant from '../const';

export default () => {
    return axios({
        url: constant.url_queries,
        method: 'post',
        data: {
            query:`
                query{
                    allUsers{
                        _id,
                        firstName,
                        lastName,
                        email,
                        instrument{
                            name,
                            _id
                        },
                        location,
                        photo,
                        urlFB,
                        urlTW,
                        urlYT
                    }
                }
            `
        }, headers: {'Authorization':'JWT ' + getToken()}
    })
}