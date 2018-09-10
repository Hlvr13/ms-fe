import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import MusicianCard from '../MusicianCard/MusicianCard';
import allUsers from '../../services/allUsers';
import './Search.css'

class Search extends Component{

    state = {
        users:'',
        usersFiltered:'',
        instrumentSelected:''
    }

    componentDidMount(){
        allUsers().then((resp) => {
            console.log(resp.data);
            this.setState({
                users : resp.data.data.allUsers
            });
        }).catch((err) => {
            console.log(err);
        })

    }

    searchActivity = (inst) => {
        this.setState({
            instrumentSelected:inst
        })
    }

    redirect = (id) => {
        this.props.history.push(`/profile/${id}`)
    }

    renderPlayers = () => {

        if(this.state.users !== '' ){
            
            let players = this.state.users.map((user,index) => {
                if (user.instrument !== null) {
                    if(user.instrument._id === this.state.instrumentSelected){
                        return(
                            <MusicianCard
                                key = {index}
                                user = {user}
                                redirect = {this.redirect}
                            />
                        )
                    }
                }
                
            });
            return players;
        }else{
        }
    }

    render(){
        return(
            <div>
                <NavBar/>
                <SearchBar searchActivity = {this.searchActivity}/>
                <div className = "container">
                    <div className = "row">
                            {this.renderPlayers()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;