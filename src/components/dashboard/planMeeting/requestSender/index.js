import React, { Component } from 'react';
import firebase from '../../../config/firebase'
import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

class meetingPlan extends Component {
  constructor() {
    super()
    this.state = {
      arr: null
    };
  }

  componentDidMount() {
    firebase.database().ref('meetings/').on('child_added', e => {
        e.val().requestReciever === this.props.userId && 
      firebase.database().ref(`users/${e.val().requestSender}`).on('value', v => {
        // console.log(v.val())
        let x = [];
        x.push(v.val())
        this.setState({arr: x})
        })
    })
  }

  render() {
      console.log(this.state.arr)
      const {arr} = this.state;
    return (
      <div className="App">
     {
          arr && arr.map((v, i) => {
            //   console.log(v,'ok des')
              return <h1>
                  {v.name}{i}
              </h1>
          })
      }
      </div>
    )
  }
}

  export default meetingPlan;
  