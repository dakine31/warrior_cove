import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { textFieldStyles, dialogStyles, cardStyles } from '../../styles/commonStyles';

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    image: '',
    spotsLeft: '',
    type: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      console.log('Fetched events:', data);
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingEvent 
        ? `http://localhost:5001/api/events/${editingEvent._id}`
        : 'http://localhost:5001/api/events';
      
      const method = editingEvent ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(eventForm)
      });

      if (!response.ok) throw new Error('Failed to save event');

      const data = await response.json();
      console.log('Saved event:', data);

      setSuccess(editingEvent ? 'Event updated successfully!' : 'Event created successfully!');
      setOpenDialog(false);
      setEditingEvent(null);
      setEventForm({
        title: '',
        date: '',
        location: '',
        description: '',
        image: '',
        spotsLeft: '',
        type: ''
      });
      
      await fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      setError('Failed to save event');
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      date: new Date(event.date).toISOString().split('T')[0],
      location: event.location,
      description: event.description,
      image: event.image,
      spotsLeft: event.spotsLeft,
      type: event.type
    });
    setOpenDialog(true);
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const response = await fetch(`http://localhost:5001/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete event');

      setSuccess('Event deleted successfully!');
      fetchEvents();
    } catch (error) {
      setError('Failed to delete event');
    }
  };

  useEffect(() => {
    console.log('Events state updated:', events);
  }, [events]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom color="white">
          Manage Events
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Button
          variant="contained"
          onClick={() => {
            setEditingEvent(null);
            setEventForm({
              title: '',
              date: '',
              location: '',
              description: '',
              image: '',
              spotsLeft: '',
              type: ''
            });
            setOpenDialog(true);
          }}
          sx={{ mb: 3 }}
        >
          Add New Event
        </Button>

        <Grid container spacing={3}>
          {events && events.length > 0 ? (
            events.map((event) => (
              <Grid item xs={12} md={6} key={event._id}>
                <Card sx={cardStyles}>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom color="white">
                      {event.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Date: {new Date(event.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Location: {event.location}
                    </Typography>
                    <Typography variant="body2" color="white">
                      {event.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
                      Available Spots: {event.spotsLeft}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Type: {event.type}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton onClick={() => handleEdit(event)} sx={{ color: '#1976d2' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(event._id)} sx={{ color: '#d32f2f' }}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" color="white" align="center">
                No events found. Create one to get started!
              </Typography>
            </Grid>
          )}
        </Grid>

        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)} 
          maxWidth="sm" 
          fullWidth
          sx={dialogStyles}
        >
          <DialogTitle>
            {editingEvent ? 'Edit Event' : 'Add New Event'}
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                fullWidth
                label="Title"
                value={eventForm.title}
                onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                margin="normal"
                required
                sx={textFieldStyles}
              />
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={eventForm.date}
                onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                sx={textFieldStyles}
              />
              <TextField
                fullWidth
                label="Location"
                value={eventForm.location}
                onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                margin="normal"
                required
                sx={textFieldStyles}
              />
              <TextField
                fullWidth
                label="Description"
                value={eventForm.description}
                onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                margin="normal"
                multiline
                rows={4}
                required
                sx={textFieldStyles}
              />
              <TextField
                fullWidth
                label="Image URL"
                value={eventForm.image}
                onChange={(e) => setEventForm({...eventForm, image: e.target.value})}
                margin="normal"
                required
                sx={textFieldStyles}
              />
              <TextField
                fullWidth
                label="Available Spots"
                type="number"
                value={eventForm.spotsLeft}
                onChange={(e) => setEventForm({...eventForm, spotsLeft: e.target.value})}
                margin="normal"
                required
                sx={textFieldStyles}
              />
              <TextField
                fullWidth
                label="Event Type"
                value={eventForm.type}
                onChange={(e) => setEventForm({...eventForm, type: e.target.value})}
                margin="normal"
                required
                sx={textFieldStyles}
              />
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={() => setOpenDialog(false)}
                sx={{ color: 'white' }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained"
              >
                {editingEvent ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </Container>
  );
}

export default ManageEvents; 