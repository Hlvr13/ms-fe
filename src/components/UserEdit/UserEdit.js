import React , { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import singleUser from "../../services/singleUser";
import updateUser from "../../services/updateUser";
import allInstruments from "../../services/allInstruments";

import { Link } from 'react-router-dom';
import Firebase from '../../Firebase';
import FileUploader from 'react-firebase-file-uploader';

import './UserEdit.css';

class UserEdit extends Component {

    state = {
        userData       : "",
        name           : "",
        lastName       : "",
        email          : "",
        phone          : "",
        allInstruments : []
    }


    componentDidMount() {

        singleUser(this.props.match.params.id).then((resp) => {
            let user = resp.data.data.singleUser;

            this.setState({
                userData   : user,
                id         : user._id,
                firstName  : user.firstName,
                lastName   : user.lastName,
                email      : user.email,
                phone      : user.phone,
                photo      : user.photo,
                urlYT      : user.urlYT,
                urlFB      : user.urlFB,
                urlTW      : user.urlTW,
            })

            if (user.instrument !== null) {
                this.setState({
                    instrument : user.instrument._id
                })
            }

        }).catch((err) => {
            console.log(err);
        })

        allInstruments().then((resp) => {
            this.setState({allInstruments: resp.data.data.allInstruments})
        }).catch((err) => {
            console.log(err);
        })
    }

    createSelector = (data, name) => {
        let options = data.map((option) => {    
            return(
                <option key={option._id} value={option._id}>{option.name}</option>
            )
        })
        return(
            <select name={name} id={name} value={this.state[name]} onChange={this.onChangeInput} className="form-control">
                <option value=""> Select Instrument </option>
                {options}
            </select>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.userData);

        updateUser(this.props.match.params.id, this.state).then((resp) => {
            let id = resp.data.data.updateUser._id;

            this.props.history.push('/user/'+id)

        }).catch((err) => {
            console.log(err);
        })
    }

    onChangeInput = (e) => {
        let name = e.target.name
        let value = e.target.value

        this.setState({
            [name] : value
        })
    }

    handlerUploadSuccess = (filename) => {
        console.log(filename);
        Firebase.storage().ref('images').child(filename)
            .getDownloadURL().then((url) => {
                this.setState({photo:url})
            })
    }

    loadData() {
        if (this.state.userData === "") {
            return(
                <div></div>
            )
        } else {
            return(
                <div className="container">
                    <div className="row">
                        <div className="user-page col-sm-8 col-md-8 col-lg-4">
                            <form onSubmit={this.handleSubmit}>

                                <div className="form-group user-photo">
                                    <img src={this.state.photo} alt="Profile" />
                                    <FileUploader 
                                        accept="image/*"
                                        randomizeFilename
                                        storageRef={Firebase.storage().ref('images')}
                                        onUploadError={error => console.log(error)}
                                        onUploadSuccess={this.handlerUploadSuccess} />
                                </div>

                                <table>
                                    <tbody>
                                        <tr>
                                            <td><label htmlFor="name">Name:</label></td>
                                            <td><input type="text" name="firstName" value={this.state.firstName} onChange={this.onChangeInput}  /></td>
                                        </tr>

                                        <tr>
                                            <td><label htmlFor="name">Lastname:</label></td>
                                            <td><input type="text" name="lastName" value={this.state.lastName} onChange={this.onChangeInput}  /></td>
                                        </tr>

                                        <tr>
                                            <td><label htmlFor="email">E-mail:</label></td>
                                            <td><input type="email" name="email" value={this.state.email} onChange={this.onChangeInput}  /></td>
                                        </tr>

                                        <tr>
                                            <td><label htmlFor="phone">Phone:</label></td>
                                            <td><input type="text" name="phone" value={this.state.phone} onChange={this.onChangeInput} /></td>
                                        </tr>

                                        <tr>
                                            <td><label htmlFor="urlYT">URL YouTube:</label></td>
                                            <td><input type="text" name="urlYT" value={this.state.urlYT} onChange={this.onChangeInput} /></td>
                                        </tr>

                                        <tr>
                                            <td><label htmlFor="urlFB">URL Facebook:</label></td>
                                            <td><input type="text" name="urlFB" value={this.state.urlFB} onChange={this.onChangeInput} /></td>
                                        </tr>

                                        <tr>
                                            <td><label htmlFor="urlTW">URL Twitter:</label></td>
                                            <td><input type="text" name="urlTW" value={this.state.urlTW} onChange={this.onChangeInput} /></td>
                                        </tr>

                                        <tr>
                                            <td><label htmlFor="instrument">Instrument: </label></td>
                                            <td>{this.createSelector(this.state.allInstruments, "instrument")}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <Link className="btn btn-success" to={`/user/${this.state.id}`}>Back</Link>
                                <button className="btn btn-info" type="submit">Update</button>
                                <Link className="btn btn-danger" to={`/user/delete/${this.state.id}`}>Delete</Link>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render(){
        return(
            <div>
                <NavBar/>
                {this.loadData()}
            </div>
        )
    }
}

export default UserEdit;