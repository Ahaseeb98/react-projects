import React, { Component } from 'react';
import firebase from '../config/firebase'
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ImageUpload from '../firebase/imageUpload';
import GoogleMap from '../pages/googleMap/googleMap'
import Baverages from '../time&beverages/time&beverages'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super()    
    this.state = {
      next: 0,
      obj: {
        nickName: null,
        number: null,
        images: null,
        baverages: null,
        time: null,
        location: {},
        uid: null,
        name: null,
        photoUrl: null
      },
      x: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.profileImages = this.profileImages.bind(this);
    this.submit = this.submit.bind(this);
    this.nextbevragestime = this.nextbevragestime.bind(this)
  }


  componentWillMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(this.props);
      if (user) {
        let statusCopy = Object.assign({}, this.state);
        statusCopy.obj['name'] = user.displayName;
        statusCopy.obj['photoUrl'] = user.photoURL;
        statusCopy.obj['uid'] = user.uid;
        this.setState(statusCopy);
        console.log(this.state.obj)
      }
    });
  }
  next() {
    const {obj, next} = this.state;
    if(obj.nickName && obj.number){
    this.setState({next: 1 + next})
  }
    else{
      alert("Error Des")
    }
  }

  nextbevragestime(a, b) {
    console.log('**b**', a)
    if(a.Juice || a.Cocktails || a.Coffee){
      let statusCopy = Object.assign({}, this.state);
      statusCopy.obj['beverages'] = a;
      statusCopy.obj['time'] = b;
      this.setState(statusCopy);
      this.setState({next: 1 + this.state.next})
    }
      else{
        alert("Error Des")
      }
  }

  submit( location ) {
    console.log(location)
    let statusCopy = Object.assign({}, this.state);
    statusCopy.obj['location'] = location;
    this.setState(statusCopy);
    firebase.database().ref(`/users/${this.state.obj.uid}`).update(this.state.obj)
    // this.setState({next: 1 + this.state.next})
        this.props.history.push(`/dashboard:${this.state.obj.uid}`)

  }
  
  handleChange = (name, e) => {
    let statusCopy = Object.assign({}, this.state);
    statusCopy.obj[name] = e.target.value;
    this.setState(statusCopy);
  };
  
  profileImages(image) {
    let statusCopy = Object.assign({}, this.state);
    statusCopy.obj['images'] = image;
    this.setState(statusCopy);
    this.setState({next: 1 + this.state.next})
  }

ProfileNext() {
  return <center>
     <div className="log">
    <Typography component="h1" variant="h4" gutterBottom style={{fontWeight: '400', color: '',textShadow: 'black 1px 2px 1px'}}>
      Profile
    </Typography>
    <br />
    <TextField label="Nick Name" required name="nickName" onChange={(e) => this.handleChange('nickName', e)}/>
      <br />
      <br />
    <TextField label="Number" required name="number" onChange={(e) => this.handleChange('number', e)}/>
      <br />
      <br />
    <Button variant="contained" onClick={() => this.next()} style={{backgroundColor: 'orange'}}>Next</Button>

  </div>
  </center>
} 

  ProfileFinish() {
  return <ImageUpload profileImages={this.profileImages}/>
} 

  render() {
    const {next, obj} = this.state;
    console.log(obj)
    let arr = [this.ProfileNext(), this.ProfileFinish(), <Baverages  nextbevragestime= {this.nextbevragestime}/>, <GoogleMap submit= {this.submit}/>]
    return(
      <div className="App" >
        {arr[next]}
      </div>
   )
 }

}

export default App; 
