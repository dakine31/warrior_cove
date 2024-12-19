import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip
} from '@mui/material';

function Events() {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    specialNeeds: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      const sortedEvents = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(sortedEvents);
    } catch (error) {
      setError('Failed to load events');
    }
  };

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
    setOpenDialog(false);
    setSuccess('Registration submitted successfully!');
    setRegistrationForm({
      name: '',
      email: '',
      phone: '',
      specialNeeds: ''
    });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom color="white">
          Upcoming Events
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Grid container spacing={4}>
          {events.map((event) => (
            <Grid item xs={12} md={4} key={event._id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip 
                    label={event.type}
                    sx={{ 
                      mb: 2,
                      backgroundColor: 
                        event.type === 'Retreat' ? '#1976d2' :
                        event.type === 'Tournament' ? '#2e7d32' :
                        event.type === 'Family Event' ? '#ed6c02' :
                        '#9c27b0',
                      color: 'white'
                    }}
                  />
                  <Typography variant="h5" component="h2" gutterBottom color="white">
                    {event.title}
                  </Typography>
                  <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.7)" gutterBottom>
                    {new Date(event.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.7)" gutterBottom>
                    Location: {event.location}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.9)" paragraph>
                    {event.description}
                  </Typography>
                  <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.7)" gutterBottom>
                    Available Spots: {event.spotsLeft}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => handleRegister(event)}
                    disabled={event.spotsLeft < 1}
                  >
                    {event.spotsLeft < 1 ? 'Event Full' : 'Register Now'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)}
          sx={{
            '& .MuiDialog-paper': {
              backgroundColor: '#2C2C2C',
              color: 'white'
            }
          }}
        >
          <DialogTitle>Register for {selectedEvent?.title}</DialogTitle>
          <form onSubmit={handleSubmitRegistration}>
            <DialogContent>
              <TextField
                fullWidth
                label="Name"
                value={registrationForm.name}
                onChange={(e) => setRegistrationForm({...registrationForm, name: e.target.value})}
                margin="normal"
                required
                sx={{
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#1976d2' }
                  }
                }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={registrationForm.email}
                onChange={(e) => setRegistrationForm({...registrationForm, email: e.target.value})}
                margin="normal"
                required
                sx={{
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#1976d2' }
                  }
                }}
              />
              <TextField
                fullWidth
                label="Phone"
                value={registrationForm.phone}
                onChange={(e) => setRegistrationForm({...registrationForm, phone: e.target.value})}
                margin="normal"
                required
                sx={{
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#1976d2' }
                  }
                }}
              />
              <TextField
                fullWidth
                label="Special Needs or Requirements"
                value={registrationForm.specialNeeds}
                onChange={(e) => setRegistrationForm({...registrationForm, specialNeeds: e.target.value})}
                margin="normal"
                multiline
                rows={3}
                sx={{
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#1976d2' }
                  }
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} sx={{ color: 'white' }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Register
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </Container>
  );
}

export default Events; 