import React, { Component } from 'react';
import signup from '../../services/signup';
import Firebase from '../../Firebase';
import allUsers from '../../services/allUsers';
import allInstruments from '../../services/allInstruments';
import FileUploader from 'react-firebase-file-uploader';
import { FaMusic, FaUsers, FaComment } from 'react-icons/fa'

import './Signup.css';

class Signup extends Component {

    state = {
        name           : '',
        lastName       : '',
        email          : '',
        password       : '',
        check_password : '',
        birthDate      : '',
        phone          : '',
        photo          : '',
        allUsers       : 0,
        allInstruments : 0
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

    availableUser = () => {
        let length = this.objLength(this.state.allUsers);
        let resp;
        for(let i = 0; i < length; i++){
            if(this.state.email === this.state.allUsers[i].email){
                resp = true;
                break;
            }else{
                resp = false;
            }
        }
        return resp;
    }

    validateEmail = () => {
        let emailValid;
        emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if(emailValid){
            return true;
        }else{
            return false;
        }
    }

    validatePasswords() {
        if(this.state.password.length >= 6 && this.state.password !== ''){
            if(this.state.password === this.state.check_password ) {
                return true;
            }else{
                alert("Passwords don't match");
                return false;
            }
        }else {
            alert("Password too short.")
            return false;
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        if(this.state.email !== '' && !this.availableUser() && this.validateEmail()){
            console.log("Todo el correo sirve");
            if(this.validatePasswords()){
                signup(this.state).then((response) => {
                    this.redirect('/login');
                }).catch((err) => {
                    console.log(err)
                })
            }

        }
    }

    handlerUploadSuccess = (filename) => {
        console.log(filename);
        Firebase.storage().ref('images').child(filename)
            .getDownloadURL().then((url) => {
                this.setState({photo:url})
            })
    }

    onInputCheck = (event) => {
        let name  = event.target.name;
        let value = event.target.value;

        this.setState({
            [name] : value
        })
    }

    redirect = (path) => {
        this.props.history.push(path);
    }

    render(){
        return(
            <section id="sc-register">
                <div className ="d-flex flex-column justify-content-center align-items-center" id="img">
                    <div className ="row" id="r-info-top">
                        <div className ="col d-flex flex-column align-items-center">
                            <h1><FaUsers size = "36px"/>  {this.state.totalUsers}</h1>
                            <h3>Musicians</h3>
                        </div>
                    </div>
                    <div className ="row" id="r-info-bottom">
                        <div className ="col d-flex flex-column align-items-center">
                            <h1><FaMusic size = "36px"/>  {this.state.totalInstruments}</h1>
                            <h3>Instruments Registred</h3>
                        </div>
                        <div className ="col d-flex flex-column align-items-center">
                            <h1><FaComment size = "36px"/> #</h1>
                            <h3>Connections</h3>
                        </div>
                    </div>
                </div>
                <div className ="d-flex flex-column justify-content-center align-items-center" id="form" >
                    <form id = "form2" onSubmit = {this.onFormSubmit}>
                        <img id = "logo"/>
                        <p id="register-title">Welcom to Music Soul</p>
                        <div className ="d-flex flex-column" id="form-info">
                            <input type="text" placeholder="First Name" name = "firstName" value = {this.state.firstName} onChange={this.onInputCheck}/>
                            <input type="text" placeholder="Last Name" name = "lastName" value = {this.state.lastName} onChange={this.onInputCheck}/>
                            <input type="email" placeholder="Email" name = "email" value = {this.state.email} onChange={this.onInputCheck}/>
                            <input type="text" placeholder="Phone" name = "phone" value = {this.state.phone} onChange={this.onInputCheck}/>
                            <input type="password" placeholder="Password" name = "password" value = {this.state.password} onChange={this.onInputCheck}/>
                            <input type="password" placeholder="Confirm Password" name = "check_password" value = {this.state.check_password} onChange={this.onInputCheck}/>
                        </div>
                        <input type="submit" value = "Register" className ="btn btn-primary" id="btn-register"/>      
                    </form>          
                </div>
                <div id = "signIn-btn">
                    <button className = "btn btn-primary" onClick = {() => this.redirect('/login')}>SIGN IN</button>
                </div>
        </section>
        )
    }

}

export default Signup;