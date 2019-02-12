import React from "react";
// import SignUp fromimport React from "react";
// import {Link} from "react-router-dom";
import axios from "axios";

class FProfile extends React.Component {
  state = {
    results: {},
    followData: {}
  };

  componentDidMount() {
    // after component loads, get all products from db
    //this call needs to get the person's profile we asked about and the users followers below
    // console.log(response.data.followers)
    // axios.get(`/fprofile`).then(response => console.log(response.data))
    axios.get(`/fprofile/${this.props.match.params._id}`).then((response) => {
      console.log(response);
      this.setState({
        results: response.data
      });
  
    }).then(response => console.log(response)).catch(err => console.log(err)) 
   
  }

  follow = () => {
    axios.put(`/api/Users/${this.props.match.params.id}`).then((response) => {
      // update state object with newest data
      this.setState({
        followData: response.data
      });
    });
  };

  render() {
    return (
      <div className="card">
      <div className="card-header"><h1><strong><center>{this.state.results.name}</center></strong></h1></div>
      <div className="card-body">
        <img alt={this.state.results.name} src={this.state.results.image} style={{width:"100%"}} />
        <br />
        <br />
        <h2><strong>Name:</strong> {this.state.results.name}</h2>
        <h2><strong>Age:</strong> {this.state.results.age}</h2>
        <h2><strong>Country:</strong> {this.state.results.country}</h2>
        <h2><strong>Music:</strong> {this.state.results.faveSong}</h2>
        <h2><strong>Food:</strong> {this.state.results.faveFood}</h2>
        <h2><strong>Place:</strong> {this.state.results.favePlace}</h2>
        <h2><strong>Countries Visited:</strong> {this.state.results.countriesVisited}</h2>
        <h2><strong>Did you know?:</strong> {this.state.results.funFact}</h2>
        <br />
        <button 
          className="btn btn-outline-primary btn-lg" 
          onClick={this.follow}
          disabled={this.state.results.quantity <= 0}
        >
          Follow
        </button>
      </div>
    </div>
    );
  }
}
export default FProfile;