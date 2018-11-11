import React, { Component } from 'react';
import firebase from '../config/firebase';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Navbar from '../navbar/navbar';
import Date_Time from '../calender/calender';
import 'typeface-roboto';
import GetDirection from '../getDirections/getDirection'

class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arr: null,
      search: null,
      seacrhArr: null,
      obj: {
        userId: this.props.match.params.userId,
        vanue: null
      },
      mapToggle: false,
      destination: null
    };
    this.submit = this.submit.bind(this)
    this.x = this.x.bind(this)
    this.getDirections = this.getDirections.bind(this)
  }

  getDirections(e) {
    console.log(e)
    this.setState({mapToggle: true})
    console.log(this)
    this.setState({destination: e})
    let x = 
    this.props.history.push(`/getDirections/:${e.lat}/:${e.lng}`)
  }

  componentDidMount() {
    this.getVanues();
  }

  x(e) {
    this.setState({ search: e })
    this.search();
  }

  submit(e, f) {
    console.log(e,f)
    let statusCopy = Object.assign({}, this.state);
    statusCopy.obj['time'] = e;
    statusCopy.obj['date'] = f;
    this.setState(statusCopy);
    firebase.database().ref(`meetings/${this.props.match.params.userId}/`).push(this.state.obj)
    alert('successfully Set up meeting')
    this.props.history.replace(`/dashboard:${this.props.match.params.userId}`)
  }

  getVanues = (query) => {
    console.log(this.props.ll)
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    const params = {
      client_id: "MFLC0HMSQJPI3UQLPYO4DX4GNBYMF2IYFJZAFZMJXN0EGSJQ",
      client_secret: "PLWAT2JO0ASGFH1RYIBDN40UDAPBPWHD3M5QMQVZ45AEPH12",
      ll: this.props.match.params.location,
      radius: 5000,
      query: 'food',
      limit: 3,
      v: "20182510"
    }
    axios.get(endPoint + new URLSearchParams(params)).then(res => {
      this.setState({ arr: res.data.response.groups[0].items })
    }).catch(error => {
      console.log("ERROR!! " + error)
    })
  }

  search() {
    let endPoint = "https://api.foursquare.com/v2/venues/search?";
    const parameters = {
      client_id: "MFLC0HMSQJPI3UQLPYO4DX4GNBYMF2IYFJZAFZMJXN0EGSJQ",
      client_secret: "PLWAT2JO0ASGFH1RYIBDN40UDAPBPWHD3M5QMQVZ45AEPH12",
      query: this.state.search,
      ll: this.props.match.params.location,
      radius: 5000,
      limit: 7,
      v: "20182510"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(res => {
        // console.log("Pizza******", res.data.response.venues);
        this.setState({ seacrhArr: res.data.response.venues})
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })
  }


  next(e) {
    let statusCopy = Object.assign({}, this.state);
    statusCopy.obj['vanue'] = e;
    this.setState(statusCopy);
    this.setState({l: e, search: null, arr: null})
  }


  render() {
    const { arr, seacrhArr, search , l, obj, mapToggle, destination} = this.state;
    console.log(this.props.match, obj)
    return (
      <div className="App">
        {!l && <Navbar search={this.x} />}
        {
          arr && !mapToggle && search === null && arr.map((v, i) => {
            return <div key={i}>
              <SnackbarContent
                message={v.venue.name}
                value={v.venue.name}
                style={{ margin: '5px auto' }}
                action={<div>
                  <Button className="listBtn" variant="contained" color="default" size="small" onClick={() => this.next(v.venue.name)}>
                  Select venue
                  </Button>
                  <Button className="listBtn" variant="contained" color="default" size="small" onClick={() => this.getDirections(v.venue.location.labeledLatLngs[0])}>
                  getDirection
                  </Button>
                  </div>
                  }
              />
            </div>
          })
        }
        {
          seacrhArr && !mapToggle &&search !== null && seacrhArr.map((v, i) => {
            console.log(v)
            return <div key={i}>
              <SnackbarContent
                message={v.name}
                value={v.name}
                style={{ margin: '5px auto' }}
                action={<div>
                  <Button className="listBtn" variant="contained" color="default" size="small" onClick={() => this.next(v.name)}>
                  Select venue
                  </Button>
                  <Button className="listBtn" variant="contained" color="default" size="small" onClick={() => this.getDirections(v.location.labeledLatLngs[0])}>
                  getDirection
                  </Button>
                  </div>
                  }
              />
            </div>
          })
        }
        {
          !arr && !search && l && <Date_Time submit={this.submit}/>
        }
        {
          mapToggle && <GetDirection destination={destination}/>
        }
      </div>
    )
  }

}
export default Location;