import React, { Component } from 'react';
import './MusicianCard.css';
import { Link } from 'react-router-dom';
import { FaFacebook } from 'react-icons/fa'; 
import { FaTwitter } from 'react-icons/fa';


class MusicianCard extends Component{

    state = {
        user: this.props.user
    }
    
    loadPicture() {
        if (this.state.user.photo !== "") {
            return(
                <img className="card-img-top" src = {this.state.user.photo} alt="musician" />
            )
        }
    }

    loadCartText() {
        if (this.state.user.description !== undefined) {
            return(
                <p className = "card-text"></p>
            )
        }
    }

    loadFBLink() {
        debugger;
        if (this.state.user.urlFB !== "") {
            return(
                <Link className="icon-separation" to={this.state.user.urlFB}><FaFacebook/></Link>
            )
        }
    }

    loadTWLink() {
        if (this.state.user.urlTW !== "") {
            return(
                <Link to={this.state.user.urlTW}><FaTwitter/></Link>
            )
        }
    }

    render(){
        return(
            <div className="col-sm-8 col-lg-4">
                <div className = "col-mb-4 card-contour">
                    <div className = "card-body card-body-style" onClick = {() => this.props.redirect(this.state.user._id)}>
                        <div className="card-photo-container">{this.loadPicture()}</div>
                        <h4 className = "card-title">{this.state.user.firstName} {this.state.user.lastName}</h4>
                        <h6 className = "text-muted card-subtitle mb-6">{this.state.user.instrument.name}</h6>
                        {this.loadCartText()}
                        <div className = "footer-social-media">
                            {this.loadFBLink()}
                            {this.loadTWLink()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MusicianCard;