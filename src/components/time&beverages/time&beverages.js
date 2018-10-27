import React, { Component } from 'react';
import 'typeface-roboto';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      Coffee: false,
      Juice: false,
      Cocktails: false,
      time1: false,
      time2: false,
      time3: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = () => {
    let obj = {
      coffee: this.state.Coffee,
      Juice: this.state.Juice,
      Cocktails: this.state.Cocktails
    }
    let obj1 = {
      time1: this.state.time1,
      time2: this.state.time2,
      time3: this.state.time3
    }
    this.props.nextbevragestime(obj, obj1)
  };

  beverages() {
    return <FormControl component="fieldset">
      <Typography component="h1" variant="h4">
        Select Your Beverages
      </Typography>
      <FormGroup className="check" >
        <FormControlLabel
          control={
            <Checkbox onChange={() => this.setState({ Coffee: !this.state.Coffee })}
              value="Coffee" />
          }
          label="Coffee"
        />
        <FormControlLabel
          control={
            <Checkbox onChange={() => this.setState({ Juice: !this.state.Juice })}
              value="Juice" />
          }
          label="Juice"
        />
        <FormControlLabel
          control={
            <Checkbox onChange={() => this.setState({ Cocktails: !this.state.Cocktails })}
              value="Cocktails"
            />
          }
          label="Cocktails"
        />
      </FormGroup>
      <Button variant="contained" onClick={() => this.setState({ flag: true })}>Next</Button>
    </FormControl>
  }

  time() {
    return <FormControl component="fieldset">
      <Typography component="h1" variant="h4">
        Select Meeting Time
      </Typography>
      <FormGroup className="check" >
        <FormControlLabel
          control={
            <Checkbox onChange={() => this.setState({ time1: !this.state.time1 })}
              value="20 min" />
          }
          label="20 min"
        />
        <FormControlLabel
          control={
            <Checkbox onChange={() => this.setState({ time2: !this.state.time2 })}
              value="60 min" />
          }
          label="60 min"
        />
        <FormControlLabel
          control={
            <Checkbox onChange={() => this.setState({ time3: !this.state.time3 })}
              value="100 min"
            />
          }
          label="100 min"
        />
      </FormGroup>
      <Button variant="contained" onClick={() => this.handleChange()}>Next</Button>
    </FormControl>
  }
  render() {
    return (
      <div className="App" >
        {!this.state.flag ? this.beverages() : this.time()}
      </div>
    )
  }

}

export default App; 
