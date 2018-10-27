import React, {Component} from 'react';
import firebase from '../config/firebase';
import Button from '@material-ui/core/Button';

const storage = firebase.storage();
class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // image: null,
      name: null,
      url: {
        url1: "",
        url2: "",
        url3: "",
      },
      // progress: 0
    }
    this.handleChange = this.handleChange.bind(this);
      this.handleProps = this.handleProps.bind(this);
  }
  handleChange = e => {
       this.setState({name : e.target.name});
    if (e.target.files[0]) {
      const image = e.target.files[0];
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(progress)
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(u => {
            // console.log(u);
            let {name} = this.state;
            let statusCopy = Object.assign({}, this.state);
            // console.log(name)
            statusCopy.url[name] = u;
            this.setState(statusCopy);
            this.setState({name: null});
            // console.log(name)
        })
    });
    }
  }
  handleProps = () => {
      this.props.profileImages(this.state.url)
  }
  render() {
      console.log(this.state.url)
    return (
      <div>
      <div style={{display: 'inline-block', margin: '10px'}}>
        <img src={this.state.url.url1 ? this.state.url.url1 : 'http://via.placeholder.com/300x300'} alt="Uploaded images" height="300" width="300" style={{display:"inline"}} />
        <br/>
        <input type="file" name="url1" id="url1" onChange={this.handleChange} className="inputfile" />
        <label htmlFor="url1">Choose a file</label>   
      </div>
      <div style={{display: 'inline-block', margin: '10px'}}>
        <img src={this.state.url.url2 ? this.state.url.url2 : 'http://via.placeholder.com/300x300'} alt="Uploaded images" height="300" width="300" style={{display:"inline"}} />
        <br/>
        <input type="file" name="url2" id="url2" onChange={this.handleChange} className="inputfile" />
        <label htmlFor="url2">Choose a file</label>   
      </div>
      <div style={{display: 'inline-block', margin: '10px'}}>
        <img src={this.state.url.url3 ? this.state.url.url3 : 'http://via.placeholder.com/300x300'} alt="Uploaded images" height="300" width="300" style={{display:"inline"}} />
        <br/>
        <input type="file" name="url3" id="url3" onChange={this.handleChange} className="inputfile" />
        <label htmlFor="url3">Choose a file</label>   
      </div> 
      <br />
      <Button variant="contained" onClick={this.handleProps}>Next</Button>
      </div>
    )
  }
}

export default ImageUpload;