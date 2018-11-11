import React, { Component } from 'react';
import firebase from '../config/firebase'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Swing from 'react-swing';
import 'typeface-roboto';
import { Slide } from 'react-slideshow-image';

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      setMeeting: false,
      arr: [],
      i: 0,
      meetingFlag: false,
      meetDetails: null
    };
  }

  componentDidMount() {
    // firebase.database().ref('meetings').child(`${this.props.match.params.userId}`).on('child_added', e => {
    //   if(e.val() !== null) {
    //     console.log(e.val())
    //     let y = this.state.arr;
    //     y.push(e.val())
    //     this.setState({meetDetails: y})
    //   }
    //   // else {        
    //     // this.setState({setMeeting: false})

    //   // }
    // })
    firebase.database().ref('user').child('/').on('child_added', e => {
      // console.log(e.val().images)
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
    const slideImages = [];
    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      // arrows: true
    }
    return arr && arr.map((v, i) => {
        slideImages.push(v.images.url1, v.images.url2, v.images.url3)
      return i === this.state.i && <Swing
        className="stack"
        tagName="div"
        setStack={stack => this.setState({ stack: stack })}
        ref="stack"
        throwout={e => this.setState({ i: 1 + this.state.i })}
        throwoutend={() => console.log('throwoutend')}
        throwoutleft={() => console.log('throwoutleft')}
        // throwoutright={() => this.setState({ meetingFlag: true, location: v.location.lat+","+v.location.lng })}
        throwoutright={() => this.props.history.push(`/location/${v.location.lat + "," + v.location.lng}/${v.uid}`)}

      >

        <div key={i}>
          <Card style={{ width: '400px', margin: '10px auto', padding: '1px auto', textAlign: 'center' }}>
            
            <Slide {...properties} >
              <div className="each-slide" style={{color: 'white'}}>
                <div 
                style={{ 
                  'backgroundImage': `url(${slideImages[0]})`,
                   color: 'white', margin: '0px auto',
                   height: '300px', width: '400px', 
                   backgroundSize: "cover" 
                   }}>
                </div>
              </div>
              <div className="each-slide">
              <div 
                style={{ 
                  'backgroundImage': `url(${slideImages[1]})`,
                   color: 'white', margin: '0px auto',
                   height: '300px', width: '400px', 
                   backgroundSize: "cover" 
                   }}>
                </div>
              </div>
              <div className="each-slide">
              <div 
                style={{ 
                  'backgroundImage': `url(${slideImages[2]})`,
                   color: 'white', margin: '0px auto',
                   height: '300px', width: '400px', 
                   backgroundSize: "cover" 
                   }}>
                </div>
              </div>
            </Slide>
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
    const { setMeeting, meetingFlag, meetDetails } = this.state;
    console.log(meetDetails)
    return (
      <div className="App">
        {setMeeting && !meetingFlag && !meetDetails && this.chooseMeeting()}
        {!setMeeting && this.setMeeting()}
        {/* {meetingFlag && <Location ll= {location} userId={this.props.match.params.userId}/>} */}
        {/* {
          !setMeeting && meetDetails && meetDetails.map((v, i)=> {
            return <div className="box">
              <h3>{v.vanue}</h3>
              <p>{v.date}</p>
            </div>
          })
        } */}
      </div>
    )
  }
}


export default Dashboard;