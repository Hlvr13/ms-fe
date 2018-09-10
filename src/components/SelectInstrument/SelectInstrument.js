import React , { Component } from 'react';
import updateUser from "../../services/updateUser";
import allInstruments from "../../services/allInstruments";

class SelectInstrument extends Component {

    state = {
        allInstruments : []
    }

    componentDidMount() {
        allInstruments().then((resp) => {
            console.log(resp, '<<<');
            console.log(resp.data.data.allInstruments)
            this.setState({allInstruments: resp.data.data.allInstruments})
        }).catch((err) => {
            console.log(err);
        })
    }

    createSelector = (data, name) => {
        console.log("createSelector");
        console.log(data);

        let options = data.map((option) => {    
            return(
                <option key={option._id} value={option._id}>{option.name}</option>
            )
        })
        return(
            <select name={name} id={name} value={this.state[name]} onChange={this.onChangeInput} className="form-control">
                <option value="" selected> --- </option>
                {options}
            </select>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        updateUser(this.props.match.params.id, this.state).then((resp) => {
            console.log(resp.data.data);
            let id = resp.data.data.updateUser._id;

            this.props.history.push('/home')

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

    loadData() {
        if (this.state.userData === "") {
            return(
                <div></div>
            )
        } else {
            return(
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="instrument">Select Instrument: </label>
                            {this.createSelector(this.state.allInstruments, "instrument")}
                        </div>
                        <button className="btn btn-info" type="submit">Update</button>
                    </form>
                </div>
            )
        }
    }

    render(){
        return(
            <div>{this.loadData()}</div>
        )
    }
}

export default SelectInstrument;