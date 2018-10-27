import React, { Component } from 'react';
import firebase from '../config/firebase'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import Swing from 'react-swing';
import Location from '../location/location'
class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      setMeeting: true,
      arr: [],
      i: 0,
      meetingFlag: false
    };
  }

  componentDidMount() {
    firebase.database().ref('user').child('/').on('child_added', e => {
      console.log(e.val().images)
      let x = this.state.arr;
      x.push(e.val())
      this.setState({ arr: x })
    })
  }

  setMeeting() {
    return <div className="cont">
      <Typography component="h1" variant="h4" gutterBottom style={{ fontWeight: '400', color: 'white', textShadow: 'black 1px 2px 1px' }}>
        you have set no meeting yet
    </Typography>
      <br />
      <Button variant="contained" color="primary" onClick={() => this.setState({ setMeeting: true })}>Set a Meeting</Button>
    </div>
  }

  chooseMeeting() {
    let { arr } = this.state;
    return arr && arr.map((v, i) => {
      return i === this.state.i && <Swing
        className="stack"
        tagName="div"
        setStack={stack => this.setState({ stack: stack })}
        ref="stack"
        throwout={e => this.setState({ i: 1 + this.state.i })}
        throwoutend={() => console.log('throwoutend')}
        throwoutleft={() => console.log('throwoutleft')}
        throwoutright={() => this.setState({ meetingFlag: true, location: v.location.lat+","+v.location.lng })}
      >
        <div key={i}>
          <Card style={{ width: '400px', margin: '10px auto', padding: '1px auto', textAlign: 'center' }}>
            <div
              style={{
                margin: '0px auto', height: '300px', width: '400px',
                background: `url(${v.images.url3})no-repeat center `,
                backgroundSize: "cover"
              }}>
            </div>
            <CardContent>
              <Button color="primary" aria-label="Add">
                reject
                      </Button>
              <span>
                {v.name}
              </span>
              <Button color="secondary" aria-label="Edit">
                accept
                      </Button>
            </CardContent>
          </Card>
        </div>
      </Swing>

    })
  }

  // }

  render() {
    const { setMeeting, arr, i , meetingFlag, location} = this.state;
    console.log(location)
    return (
      <div className="App">
        {setMeeting && !meetingFlag && this.chooseMeeting()}
        {!setMeeting && this.setMeeting()}
        {meetingFlag && <Location ll= {location} userId={this.props.match.params.userId}/>}
      </div>
    )
  }

}


export default Dashboard;