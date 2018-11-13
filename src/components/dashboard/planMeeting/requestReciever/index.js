import React, { Component } from 'react';
import firebase from '../../../config/firebase'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

class meetingPlan extends Component {
  constructor() {
    super()
    this.state = {
      arr: []
    };
  }

  componentDidMount() {
    console.log(this.props.userId)

    firebase.database().ref('meetings/').on('child_added', e => {
        (e.val().requestSender) === this.props.userId &&
            firebase.database().ref(`users/${e.val().requestReciever}`).on('value', v => {
                console.log('e', v.val().name)
                const x = this.state.arr;
                x.push({
                    ...v.val(),
                    ...e.val()
                })
                this.setState({arr: x})
            })
    })
  }

  render() {
    const {arr} = this.state;
      console.log(arr)
    return (
      <div className="App">
       {
          arr && arr.map((v, i) => {
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
                        subheader={!v.status && 'Status : Pending'}
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
                        <Button variant="outlined" style={{width: '50%'}}>
                            Comfirm
                        </Button>
                        <Button variant="outlined" style={{width: '50%'}}>
                            Get Direction
                        </Button>
                    </Card>
            </div>
          })
      }
      </div>
    )
  }
}

  export default meetingPlan;