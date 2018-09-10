import React, { Component } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import payload from '../../resolvers/payload';
import singleUser from '../../services/singleUser';
import './NavBar.css';

class NavBar extends Component {

    state = {
        id:'',
        photo:'',
        userData:''
    }

    componentDidMount(){
        const token = localStorage.getItem('music_soul_token');
        if(token !== null){
            let pl = payload(token);
            let id = pl.id;
            singleUser(id).then((resp) => {
                this.setState({
                    photo:resp.data.data.singleUser.photo,
                    userData:resp.data.data.singleUser
                })
            }).catch((err) => {
                console.log(err);
            })
        }

    }

    changeProfile = () => {
        const token = localStorage.getItem('music_soul_token');
        
        if (token !== null) {
            let pl = payload(token);

            return(
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className = "nav navbar-nav mx-auto">
                        <li className = "nav-item" role = "presentation">
                            <Link className = "nav-link" to = "/search">Search Musicians</Link>
                        </li>
                    </ul>
                    <ul className = "nav navbar-nav">
                        <li className = "dropdown">
                                <img src = {this.state.photo} alt = '' id = "profile-picture"/>
                                <IoIosArrowDown size = "15px" style = {{marginRight:"25px"}}/>
                            <div className = "dropdown-content">
                                <Link className = "nav-link" to = {`/user/${pl.id}`}>Profile</Link>
                                <hr/>
                                <Link className = "nav-link" to = "/logout">Logout</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            )
            
        } else {
            return(
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className = "nav navbar-nav ml-auto">
                        <li className = "nav-item" role = "presentation">
                            <Link className = "nav-link" to = "/login">Log In</Link>
                        </li>
                        <li className = "nav-item" role = "presentation">
                            <Link className = "nav-link" to = "/signup">Sign Up</Link>
                        </li>
                    </ul>
                </div>
            )
        }

    }

    render() {
        return(
            <nav className = "navbar navbar-light navbar-expand-md">
                <div className = "container-fluid">
                    <Link className="navbar-brand" to="#">MusicSoul</Link>
                    <button className="navbar-toggler"
                        data-toggle="collapse" 
                        data-target="#navbarNavDropdown" 
                        aria-controls="navbarSupportedContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {this.changeProfile()}
                </div>
            </nav>
        )
    }
}

export default NavBar;