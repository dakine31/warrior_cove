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

function ManagePrograms() {
  const [programs, setPrograms] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [programForm, setProgramForm] = useState({
    title: '',
    description: '',
    image: '',
    benefits: '',
    requirements: '',
    schedule: '',
    location: ''
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/programs');
      if (!response.ok) throw new Error('Failed to fetch programs');
      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      setError('Failed to load programs');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProgram 
        ? `http://localhost:5001/api/programs/${editingProgram._id}`
        : 'http://localhost:5001/api/programs';
      
      const method = editingProgram ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(programForm)
      });

      if (!response.ok) throw new Error('Failed to save program');

      setSuccess(editingProgram ? 'Program updated successfully!' : 'Program created successfully!');
      setOpenDialog(false);
      setEditingProgram(null);
      setProgramForm({
        title: '',
        description: '',
        image: '',
        benefits: '',
        requirements: '',
        schedule: '',
        location: ''
      });
      fetchPrograms();
    } catch (error) {
      setError('Failed to save program');
    }
  };

  const handleEdit = (program) => {
    setEditingProgram(program);
    setProgramForm({
      title: program.title,
      description: program.description,
      image: program.image,
      benefits: program.benefits,
      requirements: program.requirements,
      schedule: program.schedule,
      location: program.location
    });
    setOpenDialog(true);
  };

  const handleDelete = async (programId) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;
    
    try {
      const response = await fetch(`http://localhost:5001/api/programs/${programId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete program');

      setSuccess('Program deleted successfully!');
      fetchPrograms();
    } catch (error) {
      setError('Failed to delete program');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom color="white">
          Manage Programs
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Button
          variant="contained"
          onClick={() => {
            setEditingProgram(null);
            setProgramForm({
              title: '',
              description: '',
              image: '',
              benefits: '',
              requirements: '',
              schedule: '',
              location: ''
            });
            setOpenDialog(true);
          }}
          sx={{ mb: 3 }}
        >
          Add New Program
        </Button>

        <Grid container spacing={3}>
          {programs.map((program) => (
            <Grid item xs={12} md={6} key={program._id}>
              <Card sx={cardStyles}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom color="white">
                    {program.title}
                  </Typography>
                  <Typography variant="body2" paragraph color="white">
                    {program.description}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Location: {program.location}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Schedule: {program.schedule}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleEdit(program)} sx={{ color: '#1976d2' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(program._id)} sx={{ color: '#d32f2f' }}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)} 
          maxWidth="sm" 
          fullWidth
          sx={dialogStyles}
        >
          <DialogTitle>
            {editingProgram ? 'Edit Program' : 'Add New Program'}
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                fullWidth
                label="Title"
                value={programForm.title}
                onChange={(e) => setProgramForm({...programForm, title: e.target.value})}
                margin="normal"
                required
                sx={textFieldStyles}
              />
              <TextField
                fullWidth
                label="Description"
                value={programForm.description}
                onChange={(e) => setProgramForm({...programForm, description: e.target.value})}
                margin="normal"
                multiline
                rows={4}
                required
                sx={textFieldStyles}
              />
              <TextField
                fullWidth
                label="Image URL"
                value={programForm.image}
                onChange={(e) => setProgramForm({...programForm, image: e.target.value})}
                margin="normal"
                required
                sx={textFieldStyles}
              />
              <TextField
                fullWidth
                label="Benefits"
                value={programForm.benefits}
                onChange={(e) => setProgramForm({...programForm, benefits: e.target.value})}
                margin="normal"
                multiline
                rows={3}
                required
                sx={textFieldStyles}
              />
              <TextField
                fullWidth
                label="Requirements"
                value={programForm.requirements}
                onChange={(e) => setProgramForm({...programForm, requirements: e.target.value})}
                margin="normal"
                multiline
                rows={3}
                required
                sx={textFieldStyles}
              />
              <TextField
                fullWidth
                label="Schedule"
                value={programForm.schedule}
                onChange={(e) => setProgramForm({...programForm, schedule: e.target.value})}
                margin="normal"
                required
                sx={textFieldStyles}
              />
              <TextField
                fullWidth
                label="Location"
                value={programForm.location}
                onChange={(e) => setProgramForm({...programForm, location: e.target.value})}
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
                {editingProgram ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </Container>
  );
}

export default ManagePrograms; 