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
import RequestReciever from './requestReciever'
import RequestSender from './requestSender'
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

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const {value} = this.state;
    const { classes } = this.props;

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
        value === 0 
          &&
        <RequestReciever userId={this.props.userId}/>
      }
      {
        value === 1 
        &&
        <RequestSender userId={this.props.userId} />
      }
      </div>
    )
  }
}


meetingPlan.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(meetingPlan);
  