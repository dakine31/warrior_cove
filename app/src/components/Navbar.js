import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Warrior Cove
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/programs">Programs</Button>
        <Button color="inherit" component={Link} to="/events">Events</Button>
        <Button color="inherit" component={Link} to="/get-involved">Get Involved</Button>
        <Button color="inherit" component={Link} to="/news">News</Button>
        <Button color="inherit" component={Link} to="/advocacy">Advocacy</Button>
        <Button color="inherit" component={Link} to="/about">About Us</Button>
        <Button color="inherit" component={Link} to="/contact">Contact</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
