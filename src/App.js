import React, { Component } from 'react'
import MapContainer from './components/Maps'
import Input from './components/input-box'
import {SubButton} from './components/Button'
import './App.css'
import Geocode from "react-geocode";
const Routific = require('routific')


Geocode.setApiKey("AIzaSyBLzw_LL129w-1uGfSG9X4kTg8M28GEMjw");


// This is your actual token
const token   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzQ2NjQ5Y2I4YmEwYTFjYmE1NDA4NzciLCJpYXQiOjE1NDgxMTcxNDh9.C-M5s7JRFW-fCUcw9o2bW914JHPK3ywV-kcyhlImAdM'

const options = {token: token}
const client  = new Routific.Client(options);
const vrp = new Routific.Vrp();

class App extends Component {
    state = {
        add0: '',
        add1: '',
        add2: '',
        add3: '',
        add4: '',
        
    }
    
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

     handleSubmit = (e) => {
        e.preventDefault();
        const coords = Array(5);
        console.log(this.state)

        var t0 = Geocode.fromAddress(this.state.add0).then(function(response){
              return response.results[0].geometry.location;
            }
          );
        
        var t1 = Geocode.fromAddress(this.state.add1).then(function(response){
              return response.results[0].geometry.location;
            }
          );
        
        var t2 = Geocode.fromAddress(this.state.add2).then(function(response){
              return response.results[0].geometry.location;
            }
          );
        
        var t3 = Geocode.fromAddress(this.state.add3).then(function(response){
              return response.results[0].geometry.location;
            }
          );

        var t4 = Geocode.fromAddress(this.state.add4).then(function(response){
              return response.results[0].geometry.location;
            }
          );

        

        var comb = {'t0':{}, 't1':{}, 't2':{}, 't3':{}, 't4':{}}
        var vists = []

        Promise.all([t0, t1, t2, t3, t4]).then(function(values) {
            console.log(values)
            console.log(typeof values)
            
            comb['t0'] = values[0];
            comb['t1'] = values[1];
            comb['t2'] = values[2];
            comb['t3'] = values[3];
            comb['t4'] = values[4];
        })
            
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
                        <Input className="title" name="add0" onChange={this.handleChange} type="text" placeholder="Enter Address"/>
                        <br/>
                        <Input className="title" name="add1" onChange={this.handleChange} type="text" placeholder="Enter Address"/>
                        <br/>
                        <Input className="title" name="add2" onChange={this.handleChange} type="text" placeholder="Enter Address"/>
                        <br/>
                        <Input className="title" name="add3" onChange={this.handleChange} type="text" placeholder="Enter Address"/>
                        <br/>
                        <Input className="title" name="add4" onChange={this.handleChange} type="text" placeholder="Enter Address"/>
                        <br/>
                        <SubButton onClick={this.handleSubmit}>Compute Route</SubButton>
                    </form>
                </div>
            </div>
        )
    }
}

export default App;