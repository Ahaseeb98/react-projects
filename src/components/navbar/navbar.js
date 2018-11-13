import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
          counter: 0,
          anchorEl: null,
        }
    }
    handleMenu = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
      this.setState({ anchorEl: null });
    };
  render() {
    return (
      <div>
      <AppBar position="static" style={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Typography className="flex" variant="title" color="#000">
              Select Location For Meeting
          </Typography>
              <div style={{textAlign: 'right', width: '73%'}}> 
              <TextField
                id="outlined-search"
                label="Search field"
                type="search"
                margin="normal"
                variant="outlined"
                color="white"
                onChange={(e)=> this.props.search(e.target.value)}
              />
              
              </div>
        </Toolbar>
        </AppBar>
       
    </div>
  );
}
}
export default NavBar;
