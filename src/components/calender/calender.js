import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Date_Time extends Component {
  constructor(){
    super();
    this.state = {
      time: "",
      date: null
    }
  }

  render() {
    const {time, date} = this.state;
    console.log(time, date)
    return (
      <div className="App" style={{margin: '50px auto'}}>
        <input type="date" onChange={(e) => this.setState({date: e.target.value})}/>
        <input type="time" value={time} onChange={(e) => this.setState({time: e.target.value})}/>
        <br />
        <Button variant="contained" onClick={() => this.props.submit(time, date)}>Submit</Button>
      </div>
    );
  }
}

export default Date_Time;