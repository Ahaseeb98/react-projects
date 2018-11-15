import React, { Component } from 'react';
import firebase from '../../../config/firebase'
import swal from 'sweetalert';

class meetingPlan extends Component {
  constructor() {
    super()
    this.state = {
      arr: [],
      open: false
    };
  }

  componentDidMount() {
    firebase.database().ref('meetings/').on('value', e0 => {


e0.forEach(e => {
            e.val().requestReciever === this.props.userId && 
            firebase.database().ref(`users/${e.val().requestSender}`).once('value', v => {
              const x = {
                  key: e.key,
                  ...v.val(),
                  ...e.val()
              }
              // this.setState({open: true})
              if(x.seen !== true) { 
                console.log(v.photoUrl)
                  return swal({
                          title: "Meeting Request",
                          text: x.name,
                          icon: x.photoUrl,
                          buttons: true,
                          dangerMode: true,
                      }) 
                      .then(function(){
                        // firebase.database().ref(`meetings/${v.key}`).update({seen: true})
                       });

                  }
            })      
      });  
  })
    
  }
  render() {
      const {arr, open} = this.state;
      console.log(open)
    return (
      <div className="App">
      </div>
    )
  }
}

  export default meetingPlan;
  