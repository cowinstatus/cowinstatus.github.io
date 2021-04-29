import React from 'react';

export default class MainClass extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          pincode: '',
          hospitals: [],
          message: ''
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({pincode: event.target.value});
    }
    processData(data) {
        // checks if any of the age is less than 45+
        console.log('logging data & centers', data, data.centers);
        let centres = data.centers;
        let hospitals = [];
        let availablity = 'None';
        centres.forEach(centre => {
            centre.sessions.forEach(session=> {
                if (session.min_age_limit < 45) {
                    availablity = 'Available';
                }
            });
            let hospitalObj = {
                district: centre.district_name,
                name: centre.name,
                availablity
            };
            hospitals.push(hospitalObj);
        });
        this.setState({hospitals: hospitals});
        this.setState({message: availablity});
    }
    handleSubmit(event) {
      console.log('pin code request sent:', this.state.pincode);
      fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${this.state.pincode}&date=01-05-2021`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.processData(data);
      });
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="pincode">Enter pincode:
            
            <input type="text" id="pincode" value={this.state.pincode} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Check" />
          
            {this.state.hospitals.map(hospital=> (
                <ul>
                <li>
                    {hospital.district}
                </li>
                <li>
                    {hospital.name}
                </li>
                <li>
                    {hospital.availablity}
                </li>
                </ul>
            ))}
            

          <div>availablity: {this.state.message}</div>
        </form>
        
      )
    }
  }
