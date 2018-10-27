import React, { Component } from 'react';
import firebase from '../config/firebase'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Radio from '@material-ui/core/Radio';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Navbar from '../navbar/navbar';
import Date_Time from '../calender/calender'
class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arr: null,
      search: null,
      seacrhArr: null,
      obj: {
        userId: this.props.userId,
        vanue: null
      }
    };
    this.submit = this.submit.bind(this)
    this.x = this.x.bind(this)
  }

  componentDidMount() {
    this.getVanues();
  }

  x(e) {
    this.setState({ search: e })
    this.search()
  }

  submit(e, f) {
    console.log(e,f)
    let statusCopy = Object.assign({}, this.state);
    statusCopy.obj['time'] = e;
    statusCopy.obj['date'] = f;
    this.setState(statusCopy);
    firebase.database().ref(`meetings/${this.props.userId}/`).push(this.state.obj)
    alert('successfully Set up meeting')
  }

  getVanues = (query) => {
    console.log(this.props.ll)
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    const params = {
      client_id: "MFLC0HMSQJPI3UQLPYO4DX4GNBYMF2IYFJZAFZMJXN0EGSJQ",
      client_secret: "PLWAT2JO0ASGFH1RYIBDN40UDAPBPWHD3M5QMQVZ45AEPH12",
      ll: this.props.ll,
      radius: 5000,
      query: 'food',
      limit: 50,
      v: "20182510"
    }
    axios.get(endPoint + new URLSearchParams(params)).then(res => {
      console.log(res.data.response.groups[0].items);
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
      ll: this.props.ll,
      radius: 5000,
      v: "20182510"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(res => {
        console.log("Pizza******", res.data.response.venues);
        this.setState({ seacrhArr: res.data.response.venues })
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
    const { arr, seacrhArr, search , l, obj} = this.state;
    console.log(obj)
    return (
      <div className="App">
        {!l && <Navbar search={this.x} />}
        {
          arr && search === null && arr.map((v, i) => {
            return <div key={i}>
              <SnackbarContent
                message={v.venue.name}
                value={v.venue.name}
                style={{ margin: '5px auto' }}
                action={<Button variant="contained" color="default" onClick={() => this.next(v.venue.name)}>
                  Select venue</Button>}
              />
            </div>
          })
        }
        {
          seacrhArr && search !== null && seacrhArr.map((v, i) => {
            return <div key={i}>
              <SnackbarContent
                message={v.name}
                value={v.name}
                style={{ margin: '5px auto' }}
                action={<Button variant="contained" color="default" onClick={() => this.next(v.name)}>
                  Select venue</Button>}
              />
            </div>
          })
        }
        {
          !arr && !search && l && <Date_Time submit={this.submit}/>
        }
      </div>
    )
  }

}
export default Location;