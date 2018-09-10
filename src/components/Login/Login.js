import React, { Component } from 'react';
import { FaMusic, FaUsers, FaComment } from 'react-icons/fa'
import { FaEnvelope, FaLock } from 'react-icons/fa';
import allUsers from '../../services/allUsers';
import allInstruments from '../../services/allInstruments';
import login from '../../services/login';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {

    state = {
        email:'',
        password:''
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

    redirect = () => {
        this.props.history.push('/signup');
    }

    render() {
        return(
            <div>
                <section id = "section1">
                    <ul className = "slideshow">
                        <li><span></span> </li>
                        <li><span></span> </li>
                        <li><span></span> </li>
                        <li><span></span> </li>
                        <li><span></span> </li>
                        <li><span></span> </li>
                    </ul>
                    <div className ="row">
                        <div className ="col">
                            <div id="register-content">
                                <div className ="container" id="signup-format">
                                    <h1>Don´t have an account?</h1>
                                    <p> The art of a great band falls on the connection of each member.</p>
                                    <button className ="btn btn-primary" type="button" onClick = {this.redirect}>SIGN UP</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className ="row" id="offset">
                        <div className ="col">
                            <div id="signin-content" >
                                <form id = "signin-form" onSubmit = {this.submitForm}>
                                    <div className ="container" id="signin-format">
                                        <h1>LOG IN</h1>
                                        <div id="input-format">
                                            <input 
                                                type="text" required
                                                placeholder="Email"
                                                name = "email"
                                                value = {this.state.email}
                                                onChange = {this.handleInputUser}
                                                />
                                                <FaEnvelope className = "email-icon"/>
                                            <input 
                                                type="password" required 
                                                placeholder="Password"
                                                name = "password"
                                                value = {this.state.password}
                                                onChange = {this.handleInputUser}
                                                />
                                                <FaLock className = "password-icon"/>
                                        </div>
                                        <div>
                                            <Link to = "#">Forgot Pasword?</Link>
                                            <button className ="btn btn-primary" type="submit">Log In</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Login;