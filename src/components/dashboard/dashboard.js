import React, { Component } from 'react';
import firebase from '../config/firebase'
import 'typeface-roboto';
import SetMeeting from './meeting';
import MeetingPlan from './planMeeting'
import CircularProgress from '@material-ui/core/CircularProgress';


class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      setMeeting: null,
      meetingFlag: null
    };
    this.setLocation = this.setLocation.bind(this)
    this.setMeeting = this.setMeeting.bind(this)
  }
  componentDidMount() {
    firebase.database().ref('meetings/').on('value', e => {
      // console.log(e.val())
       e.val() === null ? this.setState({setMeeting: true}) : this.setState({setMeeting: false})
      //  console.log('loading Ends')
    })
  }

  setLocation(e) {
     this.props.history.push(e)
  }

  setMeeting() {
    this.setState({setMeeting: true, meetingFlag: true})

  }


  render() {
    const {setMeeting, meetingFlag} = this.state;
    return (
      <div className="App">
      {
        setMeeting === null
         ? <CircularProgress  color="secondary" style={{margin: '300px auto'}}/>
        : 
        setMeeting
         ? <SetMeeting setLocation={this.setLocation} x={meetingFlag}/>
         : 
        <MeetingPlan setMeeting={this.setMeeting} userId={this.props.match.params.userId}/>
      }
      </div>
    )
  }
}


export default Dashboard;