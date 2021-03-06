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
    constructor(props){
        super(props);
        this.state = {
            add0: '11090 Ophir Drive, Los Angeles, CA',
            add1: '10653 Helendale Avenue, Los Angeles, CA',
            add2: '464 Camino De Encanto, Los Angeles, CA',
            add3: '1145 Gayley Ave, Los Angeles, CA',
            add4: '11400 Washington Blvd, Los Angeles, CA ',

            requestComplete: false,
            output: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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

        var t0 = Geocode.fromAddress(this.state.add0).then(function(response){
              return response.results[0].geometry.location;
            }
          ).catch((err) => {
              console.log(err)
          });
        
        var t1 = Geocode.fromAddress(this.state.add1).then(function(response){
              return response.results[0].geometry.location;
            }
          ).catch((err) => {
              console.log(err)
          });

        var t2 = Geocode.fromAddress(this.state.add2).then(function(response){
              return response.results[0].geometry.location;
            }
          ).catch((err) => {
              console.log(err)
          });

        var t3 = Geocode.fromAddress(this.state.add3).then(function(response){
              return response.results[0].geometry.location;
            }
          ).catch((err) => {
              console.log(err)
          });

        var t4 = Geocode.fromAddress(this.state.add4).then(function(response){
              return response.results[0].geometry.location;
            }
          ).catch((err) => {
              console.log(err)
          });
        

        


        var visits = []

        Promise.all([t0, t1, t2, t3, t4]).then(function(values) {
            console.log(values)
            values.map((value, index) => {
                visits.push(
                    {
                        id: index.toString(),
                        location: {
                            name: value['lat'].toString() + value['lng'].toString(), 
                            lat: value['lat'],
                            lng: value['lng']
                        },
                        start: "1:00",
                        end: "23:00",
                        duration: 10
                    })

            })

            visits.map((visit) => {
                vrp.addVisit(visit.id, visit);
              })

            const vehicles = [
                {
                    id: "primary_car",
                    start_location: {
                        id: "home",
                        lat: values[0]['lat'],
                        lng: values[0]['lng']
                    },
                    end_location: {
                        id: "home",
                        lat: values[0]['lat'],
                        lng: values[0]['lng']
                    }
                }
            ]
            vehicles.map((vehicle) => {
                vrp.addVehicle(vehicle.id, vehicle);
              })
              vrp.addOption("traffic", "slow");
        }).then(() => {
            client.route(vrp, (err, solution, jobId) => {
                if (err) {
                  console.log("An error occurred");
                  console.log(err);

                } else if (solution.status === "success") {
                  console.log("Solution is:")
                  this.setState({
                      requestComplete: true,
                      output: solution
                  })
                //   console.log(this.state.output.solution.primary_car[0].location_id)
                }
              })
        })
            
    }

    render() {
        var finished = this.state.requestComplete;
        var d;
        if(finished){
            d = 
            <div>
                <h1>Route Details</h1>
                <h4>Status: {this.state.output.status}</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Location ID</th>
                            <th>Location Name</th>
                            <th>Arrival Time</th>
                            <th>Finish Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.output.solution.primary_car.map((location, index) => (
                            <tr key={index}>
                               <td>{location.location_id}</td>
                               <td>{location.location_name}</td>
                               <td>{location.arrival_time}</td>
                               <td>{location.finish_time}</td>
                            </tr>
                        ) )}
                    </tbody>
                </table>
                <br/>
                <br/>
                <br/>
                

            </div>
        }
        return (
            <div>
                <div>
                    <MapContainer/>
                </div>
                
                <div className="iform">
                    {d}
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