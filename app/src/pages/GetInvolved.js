import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';

function GetInvolved() {
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    experience: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission to backend
    setSnackbar({
      open: true,
      message: 'Thank you for volunteering! We will contact you soon.',
      severity: 'success'
    });
    setVolunteerForm({
      name: '',
      email: '',
      phone: '',
      interest: '',
      experience: ''
    });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Get Involved
        </Typography>

        {/* Volunteer Section */}
        <Paper sx={{ p: 4, mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Volunteer Opportunities
          </Typography>
          <Typography variant="body1" paragraph>
            Join our team of dedicated volunteers and make a difference in veterans' lives.
            We have various opportunities available to match your skills and interests.
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Event Support
                  </Typography>
                  <Typography variant="body2">
                    Help organize and run fishing events, assist participants, and ensure safety
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Marketing & Outreach
                  </Typography>
                  <Typography variant="body2">
                    Support our social media, photography, and community engagement efforts
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Transportation
                  </Typography>
                  <Typography variant="body2">
                    Help veterans attend events by providing transportation services
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box component="form" onSubmit={handleVolunteerSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={volunteerForm.name}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                  required
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={volunteerForm.email}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                  required
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={volunteerForm.phone}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                  <InputLabel>Area of Interest</InputLabel>
                  <Select
                    value={volunteerForm.interest}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, interest: e.target.value })}
                    required
                  >
                    <MenuItem value="events">Event Support</MenuItem>
                    <MenuItem value="marketing">Marketing & Outreach</MenuItem>
                    <MenuItem value="transportation">Transportation</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Relevant Experience"
                  value={volunteerForm.experience}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, experience: e.target.value })}
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Submit Volunteer Application
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Donations Section */}
        <Paper sx={{ p: 4, mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Donations & Fundraising
          </Typography>
          <Typography variant="body1" paragraph>
            Your financial support helps us provide life-changing experiences for veterans.
            All donations are tax-deductible and directly support our programs.
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    One-Time Donation
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Make an immediate impact with a one-time gift
                  </Typography>
                  <Button variant="contained" color="primary">
                    Donate Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Monthly Giving
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Join our sustaining donors program
                  </Typography>
                  <Button variant="contained" color="primary">
                    Become a Monthly Donor
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Corporate Matching
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Double your impact through employer matching
                  </Typography>
                  <Button variant="contained" color="primary">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Membership Section */}
        <Paper sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Sponsor a Veteran
          </Typography>
          <Typography variant="body1" paragraph>
            Make a direct impact by sponsoring a veteran's participation in our programs.
            Your sponsorship covers equipment, transportation, and program costs.
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Day Trip Sponsor
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    $150
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Sponsor a veteran for a single-day fishing trip
                  </Typography>
                  <Button variant="contained" color="primary">
                    Sponsor a Day Trip
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Weekend Retreat Sponsor
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    $500
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Support a veteran's weekend healing retreat
                  </Typography>
                  <Button variant="contained" color="primary">
                    Sponsor a Weekend
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Full Program Sponsor
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    $1,000
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Fund a veteran's complete program experience
                  </Typography>
                  <Button variant="contained" color="primary">
                    Sponsor Full Program
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default GetInvolved; 