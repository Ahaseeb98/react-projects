import React, { Component } from 'react';
import firebase from '../../config/firebase'
import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
const styles = {
    root: {
      flexGrow: 1,
    },
  };
class meetingPlan extends Component {
  constructor() {
    super()
    this.state = {
      value: 0,
      arr: []
    };
  }

  componentDidMount() {
    firebase.database().ref('meetings/').on('child_added', e => {
        let x = this.state.arr;
        x.push(e.val())
        this.setState({ arr: x })
    })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

userData(user) {
    return firebase.database().ref(`users/${user}`).on('value', e => {
          console.log(e.val().name);
          return <h1>{e.val().name}</h1>
      })
}


  
  render() {
      const {arr, value} = this.state;
      const { classes } = this.props;
        // console.log(value)
    return (
      <div className="App">
      <Paper className={classes.root}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Sent Requests" style={{width: '100%!important'}}/>
                <Tab label="Received Requests" style={{width: '100%!important'}}/>
              </Tabs>
            </Paper>
      <Button onClick={()=> this.props.setMeeting()}>Set a Meeting</Button>
      {
        value === 0 && <div>
        <h2>
          Sent Requests
        </h2>
        {
          arr && arr.map((v, i) => {
              return <div key={i}>
                  {this.userData(v.requestReciever)}
              </div>
          })
        }
          </div>
      }

      
      {
        value === 1 && <div>
        <h2>
          Received Requests
        </h2>
        {
          arr && arr.map((v, i) => {
              console.log(v.requestSender !== this.props.userId && 'des')
              
          })
        }
          </div>
      }
      </div>
    )
  }
}


meetingPlan.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(meetingPlan);
  