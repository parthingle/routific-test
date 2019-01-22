import React, { Component } from 'react'
import MapContainer from './components/Maps'
import Input from './components/input-box'
import {SubButton} from './components/Button'
import './App.css'
class App extends Component {
    state = {
        add1: '',
        add2: '',
        add3: '',
        add4: '',
        add5: '',

        geo1: '',
        geo2: '',
        geo3: '',
        geo4: '',
        geo5: '',
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <div>
                    <MapContainer/>
                </div>
                
                <div className="iform">
                    <h2>A Simple App to Compute the Most Optimized Route using Routific</h2>
                    <h3>The first address will be considered the start and end locations</h3>
                    <form>
                        <Input className="title" name="add1" onChange={this.handleChange} type="text" placeholder="Enter Address"/>
                        <br/>
                        <Input className="title" name="add2" onChange={this.handleChange} type="text" placeholder="Enter Address"/>
                        <br/>
                        <Input className="title" name="add3" onChange={this.handleChange} type="text" placeholder="Enter Address"/>
                        <br/>
                        <Input className="title" name="add4" onChange={this.handleChange} type="text" placeholder="Enter Address"/>
                        <br/>
                        <Input className="title" name="add5" onChange={this.handleChange} type="text" placeholder="Enter Address"/>
                        <br/>
                        <SubButton onClick={this.handleSubmit}>Compute Route</SubButton>
                    </form>
                </div>
            </div>
        )
    }
}

export default App;