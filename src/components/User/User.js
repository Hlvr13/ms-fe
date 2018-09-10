import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import singleUser from '../../services/singleUser';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io'
import ResponsiveEmbed from 'react-responsive-embed';

import './User.css';

class Home extends Component {

    

    state = {
        id    : this.props.match.params.id,
        youtubeID : '',
        videoData : ''
    }
    
    componentDidMount() {
        singleUser(this.state.id).then((user) => {

            let thisUser = user.data.data.singleUser;

            this.setState({
                firstName  : thisUser.firstName,
                lastName   : thisUser.lastName,
                email      : thisUser.email,
                phone      : thisUser.phone,
                genre      : thisUser.genre,
                location   : thisUser.location,
                photo      : thisUser.photo,
                urlYT      : thisUser.urlYT,
                urlFB      : thisUser.urlFB,
                urlTW      : thisUser.urlTW,
                profileBgImg: "https://image.freepik.com/free-vector/bright-background-with-dots_1055-3132.jpg"
            })
            var sp = this.state.urlYT.split('watch?v=');
            sp = 'https://www.youtube.com/embed/' + sp[1]; 
            this.setState({ urlYTEmbed: sp})

            if (user.instrument !== null) {
                this.setState({
                    instrument : thisUser.instrument.name
                })
            }

        }).catch((err) => {
            console.log(err);
        })

    }

    loadAudition() {
        const playerOptions = {
            //height : '400',
            //width  : '800',
            playerVars : {
                autoplay : 1
            }
        }

        return(
            <YouTube 
                id="RVp5ldfuaus" 
                videoId="RVp5ldfuaus" 
                opts={playerOptions} />
        )
    }

    loadGenre() {
        if (this.state.genre) {
            return(
                <tr>
                    <td>Genre:</td>
                    <td>{this.state.genre}</td>
                </tr>
            )
        }
    }

    loadLocation() {
        if (this.state.location) {
            return(
                <tr>
                    <td>Location:</td>
                    <td>{this.state.location}</td>
                </tr>
            )
        }
    }

    loadFBLink() {
        if (this.state.urlFB) {
            return(
                <tr>
                    <td><FaFacebook /></td>
                    <td><a href={this.state.urlFB} target="_blank">{this.state.urlFB}</a></td>
                </tr>
            )
        }
    }

    loadTWLink() {
        if (this.state.urlTW) {
            return(
                <tr>
                    <td><FaTwitter /></td>
                    <td><a href={this.state.urlTW} target="_blank">{this.state.urlTW}</a></td>
                </tr>
            )
        }
    }

    loadYTLink() {
        if (this.state.urlYT) {
            return(
                <tr>
                    <td><FaYoutube /></td>
                    <td><a href={this.state.urlYT} target="_blank">{this.state.urlYT}</a></td>
                </tr>
            )
        }
    }

    render() {
        return(
            <div>
                <NavBar/>
                <section id="profile">
                    <div className = "container-fluid">
                        <div className = "row">
                            <div className = "col d-flex flex-column justify-content-center align-items-center" id="user-info" style = {{backgroundImage:`url(${this.state.profileBgImg})`}}>
                                <div><img src= {this.state.photo} id="profile-img"/></div>
                                <div className = "d-flex flex-column">
                                    <h1>{this.state.firstName} {this.state.lastName}</h1>
                                    <h3>{this.state.instrument}</h3>
                                    <h5>Email: {this.state.email}</h5>
                                    <h5>Phone: {this.state.phone}</h5>
                                    <h5></h5>
                                </div>
                                <div className = "d-flex flex-column">
                                        <Link className = "btn btn-primary" to = {`/user/edit/${this.state.id}`}>Edit</Link>
                                </div>
                            </div>
                            <div className = "col d-flex flex-column justify-content-around align-items-center">
                                <div>
                                    <h1>Bio</h1>
                                    <h4>General information about the user/ Preferences.</h4>
                                </div>
                                <div>
                                    <h1>Experience</h1>
                                    <h4>User experience/band experience/time spend learning instrument</h4>
                                </div>
                                <div>
                                    <h1>Bands</h1>
                                    <h4>User bands/past bands/etc.</h4>
                                </div>
                            </div>
                        </div>
                        <Link to = "#" innerRef = "#simon"><IoIosArrowDown size = "24px"/></Link>
                    </div>
                </section>
                <section id = "videoSection">
                    <ResponsiveEmbed src =  {this.state.urlYTEmbed} />
                </section>
            </div>




/*             <div className="container">
                <div className="row">
                    <div className='user-page col-sm-8 col-md-8 col-lg-4'>
                        <div className='user-photo-container'>
                            <div className="user-photo">
                                <img src={this.state.photo} alt="Profile"/>
                            </div>               
                            <div className="edit-button"><Link to={`/user/edit/${this.state.id}`} className="btn btn-info">Edit</Link></div>
                        </div>

                        <table>
                            <tbody>
                                <tr>
                                    <td>Firstname:</td>
                                    <td>{this.state.firstName}</td>
                                </tr>

                                <tr>
                                    <td>Lastname:</td>
                                    <td>{this.state.lastName}</td>
                                </tr>

                                <tr>
                                    <td>E-mail:</td>
                                    <td>{this.state.email}</td>
                                </tr>

                                <tr>
                                    <td>Phone:</td>
                                    <td>{this.state.phone}</td>
                                </tr>

                                
                                {this.loadGenre()}
                                {this.loadLocation()}
                                

                                <tr>
                                    <td>Instrument:</td>
                                    <td>{this.state.instrument}</td>
                                </tr>

                                {this.loadYTLink()}
                                {this.loadFBLink()}
                                {this.loadTWLink()}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div> */
        )
    }
}

export default Home;