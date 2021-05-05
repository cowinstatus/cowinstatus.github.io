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
        let centres = data.centers;
        let hospitals = [];
        let availablity = 'None';
        let isAvailable = 'None';
        if (centres && centres.length > 0) {
          centres.forEach(centre => {
              centre.sessions.forEach(session=> {
                  if (session.min_age_limit < 45) {
                      availablity = 'Available';
                      if (session.available_capacity == 0) {
                        availablity = 'Booked';
                      } else {
                        isAvailable = 'Available';
                      }
                  }
              });
              let hospitalObj = {
                  district: centre.district_name,
                  name: centre.name,
                  availablity
              };
              hospitals.push(hospitalObj);
          });
          // sort hospitals by availability
          hospitals.sort((a,b)=> {
            if (a.availablity === "Available" && b.availablity === "None") {
              return -1;
            } else if (a.availablity === "None" && b.availablity === "Available") {
              return 1;
            }
            return 0;
          });
          debugger;
          hospitals = hospitals.filter((x, i) => i < 10);
          this.setState({hospitals: hospitals});
          
      } else {
        isAvailable = "Possible invalid pin code";
      }
      this.setState({message: isAvailable});
    }
    handleSubmit(event) {
      console.log('pin code request sent:', this.state.pincode);
      this.setState({hospitals: {}});
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
        <section class="body">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="pincode" className="pincode-label">Enter pincode:
          </label>
            <input type="text" id="pincode" className="pincode-text" value={this.state.pincode} onChange={this.handleChange} />
          
          <input type="submit" className="btn-availability" value="Check Availability" />
        </form>
        {
        !(this.state.message ==='' || this.state.message ==='Available') &&
          <div className="availability-msg">Available at any place: {this.state.message}
          </div>
        }
         {this.state.message === 'Available' && 
            <span>
              <a href="https://www.cowin.gov.in/" title="book on cowin"> Book on CoWin site</a>
            </span>
          }
        {this.state.hospitals.length > 0 && 
          <table>
            <th>Place</th>
            <th>Hospital</th>
            <th>Availability</th>
            {this.state.hospitals.map(hospital=> (
                    <tr>
                    <td>
                        {hospital.district}
                    </td>
                    <td>
                        {hospital.name}
                    </td>
                    <td>
                        {hospital.availablity}
                    </td>
                    </tr>
            ))}
        </table>
        }
        <footer>
          <a href="https://trello.com/b/G0AAwP7b/status-board-of-items">Features board</a>
          <a href="https://github.com/cowinstatus/cowinstatus.github.io">Github</a>
        </footer> 
        </section>
        
      )
    }
  }
