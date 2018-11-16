import React, { Component } from 'react';
import firebase from '../../../config/firebase'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Popup from '../popup/popup'
import AddToCalendar from 'react-add-to-calendar'

class meetingPlan extends Component {
  constructor() {
    super()
    this.state = {
      arr: []
    };
  }

  componentDidMount() {
    firebase.database().ref('meetings/').on('child_added', e => {
        (e.val().requestSender) === this.props.userId &&
            firebase.database().ref(`users/${e.val().requestReciever}`).on('value', v => {
                console.log('e', v.val().name)
                const x = this.state.arr;
                x.push({
                    key: e.key,
                    ...v.val(),
                    ...e.val()
                })
                this.setState({arr: x})
            })
    })
  }

  cancel(e) {
    console.log(e)
      firebase.database().ref(`meetings/${e}`).update({status: 'Canceled'})
  }
 
  render() {
    const {arr} = this.state;
      console.log(arr)
    return (
      <div className="App">
       {
          arr && arr.map((v, i) => {
            let event = {
                title: `Meeting with ${v.name}`,
                // description: 'This is the sample event provided as an example only',
                location: `${v.vanue.e}`,
                startTime: `${v.Meetingdate}T20:45:00-04:00`,
                endTime: `${v.Meetingdate}T21:45:00-04:00`
            }
             let items = [
               { google: 'Google' }
            ]
              return <div key={i}>
                  <Card 
                  style={{width: '400px', margin: '10px auto'}}
                  >
                        <CardHeader 
                        style={{textAlign: 'left'}}
                        avatar={
                            <Avatar aria-label="Recipe" 
                            >
                            <img src={v.photoUrl}/>

                            </Avatar>
                        }
                        title={v.name}
                        subheader={!v.status ? 'Status : Pending' : ('Status : ' + v.status)}
                        />
                        <Typography variant="button" gutterBottom align="left" style={{marginLeft: '30px'}}>
                            Meeting Date : {v.Meetingdate}
                        </Typography>
                        <Typography variant="button" gutterBottom align="left" style={{marginLeft: '30px'}}>
                            Meeting Time : {v.Meetingtime + ' PM'}
                        </Typography>
                        <Typography variant="button" gutterBottom align="left" style={{marginLeft: '30px'}}>
                            Vanue : {v.vanue.e}
                        </Typography>
                        {
                             v.status === 'Accepted' ? <Button variant="outlined" style={{width: '50%', margin: '5px'}}>
                             <AddToCalendar 
                             style={{color: 'pink!important', border: '1px solid black'}}
                             event={event}
                             listItems={items} />
                             </Button>
                             :
                             <Button variant="outlined" style={{width: '45%', margin: '5px'}} onClick={() => this.cancel(v.key)}>
                                 Cancel
                             </Button>
                        }
                        <Button variant="outlined" style={{width: '45%', margin: '5px'}}>
                            Get Direction
                        </Button>
                    </Card>
            </div>
          })
      }
                 <Popup userId={this.props.userId}/>

      </div>
    )
  }
}

  export default meetingPlan;