import React, { Component } from 'react';
import firebase from '../../config/firebase'
import Button from '@material-ui/core/Button'
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import img from '../../../a.jpeg'

const provider = new firebase.auth.FacebookAuthProvider();

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: null
    };
    this.login = this.login.bind(this);
  }


  login() {
    firebase.auth().signInWithPopup(provider).then(result => {
      var user = result.user;
      // console.log(user)
      this.setState({ x: user.displayName })

// user.updateProfile({
//   photoURL: `${photoURL}?type=large`
// })

    }).catch(function (error) {
      console.log("Error", error)
    });
  }
  componentWillMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        firebase.database().ref('/users/' + user.uid).on('value', e => {
          if (e.val() === null) {
            this.props.history.replace('/profile')
          }
          else {
            this.props.history.replace(`/dashboard${user.uid}`);
          }
        })
      }
    });
  }

  render() {
    console.log(this.state.x)
    return (
      <div className="App" style={{ background: `url(${img}) no-repeat center center fixed`, backgroundSize: 'cover', height: '100vh', width: "100%" }} >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Typography component="h1" variant="h2" gutterBottom style={{ fontWeight: '400', color: 'white', textShadow: 'black 1px 2px 1px' }}>
          Login or Signup with facebook.
      </Typography>
        <Button onClick={this.login} variant="contained" color="primary" >Login with facebook!</Button>
      </div>
    )
  }

}

export default App; 