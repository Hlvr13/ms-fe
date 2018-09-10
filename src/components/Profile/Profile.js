import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaEnvelope, FaMobile } from 'react-icons/fa';
import YouTube from 'react-youtube';
import singleUser from '../../services/singleUser';
import Pop from 'reactjs-popup';
import ResponsiveEmbed from 'react-responsive-embed';
import './Profile.css'

class Profile extends Component{

    state = {
        userData:'',
        instrument:'',
        urlYT:'',
        urlYTEmbed:'',
        id:this.props.match.params.id
    }

    componentDidMount(){
        singleUser(this.state.id).then((resp) => {
            console.log(resp)
            this.setState({
                userData: resp.data.data.singleUser,
                instrument: resp.data.data.singleUser.instrument.name,
                urlYT: resp.data.data.singleUser.urlYT

            })
        }).catch((err) => {
            console.log(err);
        })

    }

    youtube_parser(url){
        console.log(url);
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    }


    usePop = (triggerObj,msg) => {
        if(msg !== ''){
            return(
                <Pop trigger = {triggerObj} position = "top center" on = "hover">{msg}</Pop>
            )
        }else{
            return(
                <Pop trigger = {triggerObj} position = "top center" on = "hover">Not available.</Pop>
            )
        }
    }

    renderUserInfo = () => {
        const iconSize = 50;

        return(
            <div className = "user-info-format">
                <h2>{this.state.userData.firstName} {this.state.userData.lastName}</h2>
                <h3>{this.state.instrument}</h3>
                <hr className = "hr-format"/>
                <p>Ranking</p>
                <hr/>
                <div className = "row justify-content-around">
                    <div className = "col">
                        <Link to = '#'>
                            {this.usePop(<FaFacebook size = {iconSize + 'px'}/>,this.state.userData.urlFB)} 
                        </Link>
                    </div>
                    <div className = "col">
                        <Link to = '#'>
                            {this.usePop(<FaTwitter size = {iconSize + 'px'}/>,this.state.userData.urlTW)} 
                        </Link>
                    </div>
                    <div className = "col">
                        <Link to = '#'>
                            {this.usePop(<FaEnvelope size = {iconSize + 'px'}/>,this.state.userData.email)}
                        </Link>
                    </div>
                    <div className = "col">
                        <Link to = '#' >
                            {this.usePop(<FaMobile size = {iconSize + 'px'}/>,this.state.userData.phone)}
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    renderUserVideo = () => {
        
        if(this.state.urlYT !== undefined || this.state.urlYTEmbed !== ''){
            var aux = this.state.urlYT;
            aux = aux.split('watch?v=');
            aux = 'https://www.youtube.com/embed/' + aux[1]; 
            this.state.urlYTEmbed = aux;
            return(
                <div id = "video-config">
                    <ResponsiveEmbed src =  {this.state.urlYTEmbed} />
                </div>
            )
        }
        else{
            return(
                <h1 style = {{fontSize:"2rem",fontFamily:'Roboto',fontWeight:"bold"}}>User has not shared a video.</h1>
            )  
        }
    }

    render(){
        return(
            <div>
            <NavBar/>
            <section id="sc-profile">
                <div id="user-bg"></div>
                <div className ="container d-flex flex-column justify-content-center align-items-center" id="user-info">
                    {this.renderUserInfo()}
                </div>
                <div id="video">
                    {this.renderUserVideo()}
                </div>
            </section>
        </div>
        )
    }
}

export default Profile;
