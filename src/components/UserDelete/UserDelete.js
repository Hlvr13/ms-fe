import React, { Component } from 'react';
import singleUser from '../../services/singleUser';
import deleteUser from '../../services/deleteUser';

class UserDelete extends Component {
    
    state = {
        userData  : '',
        firstName : '',
    }

    componentDidMount() {
        singleUser(this.props.match.params.id).then((resp) => {
            console.log(resp.data.data.singleUser)

            this.setState({
                userData : resp.data.data.singleUser,
                firstName : "firstName"
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    deleteUser = () => {
        deleteUser(this.props.match.params.id).then((resp) => {
            console.log(resp)
            this.props.history.push('/user')
        }).catch((err) => {
            console.log(err)
        })
    }

    goBack = () => {
        this.props.history.push('/user/' + this.props.match.params.id)
    }
    
    renderOptions = () => {
        const {firstName} = this.state.firstName;

        if(!this.state) {
            return(
                <div></div>
            )
        } else {
            return(
                <div className="">
                    Are you sure you want to delete your account, <strong>{firstName}</strong>?
                    <button className="btn btn-danger" onClick={this.deleteUser}>Yes</button>
                    <button className="btn btn-info" onClick={this.goBack}>No</button>
                </div>

                
            )
        }
    }

    render() {
        return(
            <div>{this.renderOptions()}</div>
        )
    }
}

export default UserDelete;