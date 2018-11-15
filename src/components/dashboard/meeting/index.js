import React, { Component } from 'react';
import firebase from '../../config/firebase'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Swing from 'react-swing';
import 'typeface-roboto';
import { Slide } from 'react-slideshow-image';

class meeting extends Component {
  constructor() {
    super()
    this.state = {
      setMeeting: false,
      arr: [],
      i: 0,
      meetingFlag: false,
    };
  }

  componentDidMount() {
    firebase.database().ref('users').child('/').on('child_added', e => {
      console.log(e.val())
      let x = this.state.arr;
      x.push(e.val())
      this.setState({ arr: x })
    })

    this.props.x && this.setState({setMeeting: true})
  }

  setMeeting() {
    return <div className="cont">
      <Typography component="h1" variant="h4" gutterBottom style={{ fontWeight: '400', color: 'white', textShadow: 'black 2px 2px 1px' }}>
        you have set no meeting yet
    </Typography>
      <br />
      <Button variant="contained" style={{backgroundColor: 'orange'}} onClick={() => this.setState({ setMeeting: true })}>Set a Meeting</Button>
    </div>
  }

  chooseMeeting() {
    let { arr } = this.state;
    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
    }

    return arr && arr.map((v, i) => {
      return i === this.state.i && <Swing
        className="stack"
        tagName="div"
        setStack={stack => this.setState({ stack: stack })}
        ref="stack"
        throwout={e => this.setState({ i: 1 + this.state.i })}
        throwoutend={() => console.log('throwoutend')}
        throwoutleft={() => console.log('throwoutleft')}
        throwoutright={() => this.props.setLocation(`/location/${v.location.lat + "," + v.location.lng}/${v.uid}`)}

      >
      
        <div key={i}>
          <Card style={{ width: '400px', margin: '10px auto', padding: '1px auto', textAlign: 'center' }}>
            
            <Slide {...properties} >
              <div className="each-slide" style={{color: 'white'}}>
                <div 
                style={{ 
                  'backgroundImage': `url(${v.images.url1})`,
                   color: 'white', margin: '0px auto',
                   height: '300px', width: '400px', 
                   backgroundSize: "cover" 
                   }}>
                </div>
              </div>
              <div className="each-slide">
              <div 
                style={{ 
                  'backgroundImage': `url(${v.images.url2})`,
                   color: 'white', margin: '0px auto',
                   height: '300px', width: '400px', 
                   backgroundSize: "cover" 
                   }}>
                </div>
              </div>
              <div className="each-slide">
              <div 
                style={{ 
                  'backgroundImage': `url(${v.images.url3})`,
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


  render() {
    const { setMeeting, meetingFlag } = this.state;
    // console.log(this.props.x)
    return (
      <div className="App">
        {setMeeting && this.chooseMeeting()}
        {!setMeeting && this.setMeeting()}
      </div>
    )
  }
}


export default meeting;