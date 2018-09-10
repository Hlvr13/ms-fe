import React, { Component } from 'react';
import { FaMusic, FaUsers, FaComment } from 'react-icons/fa'
import { FaEnvelope, FaLock } from 'react-icons/fa';
import allUsers from '../../services/allUsers';
import allInstruments from '../../services/allInstruments';
import login from '../../services/login';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {

    state = {
        allUsers:'',
        totalUsers: 0,
        totalInstruments: 0
    }

    objLength = (obj) => {
        var length = 0;
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                length++;
            }
        }
        return length;
    }

    handleInputUser = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    submitForm = (e) => {
        e.preventDefault();
        login(this.state).then((resp) => {
            if (resp.status === 200) {
                let token = resp.data.token;
                localStorage.setItem('music_soul_token', token);
                this.props.history.push('/search');
            } else {
                console.log(resp.data);
            }

        }).catch((err) => {
            console.log(err);
        })
    }


    componentDidMount(){
        allUsers().then((resp) => {
            var totalUsers = this.objLength(resp.data.data.allUsers);
            this.setState({
                allUsers: resp.data.data.allUsers,
                totalUsers: totalUsers
            })
            
        }).catch((err) => {
            console.log(err);
        })

        allInstruments().then((resp) => {
            var totalInstruments = this.objLength(resp.data.data.allInstruments);
            this.setState({
                totalInstruments: totalInstruments
            })
        })

    }

    prueba = () => {
        console.log("Si entro");
    }

    render() {
        return(
            <div>
                <section id = "home" className = "d-flex flex-column justify-content-center">
                    <div id = "stats">
                        <div className = "container-fluid d-flex justify-content-center">
                            <div id = "text-format" className = "row">
                                <div className = "col">
                                    <h1><FaUsers size = "36px"/>  {this.state.totalUsers}</h1>
                                    <h3>Musicians</h3>
                                </div>
                                <div className = "col">
                                    <h1><FaMusic size = "36px"/>  {this.state.totalInstruments}</h1>
                                    <h3>Instruments Registred</h3>
                                </div>
                                <div className = "col">
                                    <h1><FaComment size = "36px"/> #</h1>
                                    <h3>Connections</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Home;