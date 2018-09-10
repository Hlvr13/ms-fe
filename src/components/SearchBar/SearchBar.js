import React, { Component } from 'react';
import allInstruments from '../../services/allInstruments';

import './SearchBar.css';

class SearchBar extends Component{

    state = {
        allInstruments:[]
    }


    componentDidMount(){
        allInstruments().then((resp) => {
            this.setState({allInstruments:resp.data.data.allInstruments})
        })

    }

    createSelector = (data,name) => {
        let options = data.map((option) => {
            return(
                <option key = {option._id} value = {option._id}>{option.name}</option>
            )
        })

        return(
            <select name = {name} id = {name} value = {this.state[name]} onChange = {this.onChangeInput}>
                <optgroup label = "">
                    <option value = "" defaultValue = "">Select Instrument</option>
                    {options}
                </optgroup>
            </select>
        )
    }

    onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        this.setState({
            [name]:value
        })

        console.log(this.state)
    }


    render(){
        return(
            <nav className = "navbar navbar-light navbar-expand-md navigation-clean-search">
                <div className = "container">
                    <button
                        className = "navbar-toggler"
                        data-toggle = "collapse"
                        data-target = "#navcol-1"
                    >
                    <span className = "sr-only">Toggle Navigation</span>
                    <span className = "navbar-toggler-icon"></span>
                    </button>

                    <div id = "navcol-1" className = "collapse navbar-collapse d-flex justify-content-center">
                        <ul className = "nav navbar-nav d-flex justify-content-center align-items-center">
                            <li className = "nav-item" role = "presentation">
                                {this.createSelector(this.state.allInstruments,'instrument')}
                            </li>
                            <li>
                                <button className="btn btn-light action-button" 
                                    onClick = {() => this.props.searchActivity(this.state.instrument)}>
                                    Search
                                </button>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </nav>
        )
    }
}

export default SearchBar;