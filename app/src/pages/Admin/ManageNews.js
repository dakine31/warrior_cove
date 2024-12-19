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
  IconButton,
  MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { textFieldStyles, dialogStyles, cardStyles } from '../../styles/commonStyles';

function ManageNews() {
  const [news, setNews] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [newsForm, setNewsForm] = useState({
    title: '',
    date: '',
    category: '',
    image: '',
    summary: '',
    content: ''
  });

  const categories = ['Stories', 'Education', 'Updates'];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/news');
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      setNews(data);
    } catch (error) {
      setError('Failed to load news');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting news form:', newsForm);
      const url = editingNews 
        ? `http://localhost:5001/api/news/${editingNews._id}`
        : 'http://localhost:5001/api/news';
      
      const method = editingNews ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(newsForm)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Failed to save news');
      }

      const data = await response.json();
      console.log('Saved news:', data);

      setSuccess(editingNews ? 'News updated successfully!' : 'News created successfully!');
      setOpenDialog(false);
      setEditingNews(null);
      setNewsForm({
        title: '',
        date: '',
        category: '',
        image: '',
        summary: '',
        content: ''
      });
      await fetchNews();
    } catch (error) {
      console.error('Error saving news:', error);
      setError(error.message || 'Failed to save news');
    }
  };

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
    setNewsForm({
      title: newsItem.title,
      date: new Date(newsItem.date).toISOString().split('T')[0],
      category: newsItem.category,
      image: newsItem.image,
      summary: newsItem.summary,
      content: newsItem.content
    });
    setOpenDialog(true);
  };

  const handleDelete = async (newsId) => {
    if (!window.confirm('Are you sure you want to delete this news item?')) return;
    
    try {
      const response = await fetch(`http://localhost:5001/api/news/${newsId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete news');

      setSuccess('News deleted successfully!');
      fetchNews();
    } catch (error) {
      setError('Failed to delete news');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom color="white">
          Manage News
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Button
          variant="contained"
          onClick={() => {
            setEditingNews(null);
            setNewsForm({
              title: '',
              date: '',
              category: '',
              image: '',
              summary: '',
              content: ''
            });
            setOpenDialog(true);
          }}
          sx={{ mb: 3 }}
        >
          Add News Article
        </Button>

        <Grid container spacing={3}>
          {news.map((item) => (
            <Grid item xs={12} md={6} key={item._id}>
              <Card sx={cardStyles}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom color="white">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Date: {new Date(item.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Category: {item.category}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {item.summary}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleEdit(item)} sx={{ color: '#1976d2' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item._id)} sx={{ color: '#d32f2f' }}>
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
            {editingNews ? 'Edit News Article' : 'Add News Article'}
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                select
                fullWidth
                label="Category"
                value={newsForm.category}
                onChange={(e) => setNewsForm({...newsForm, category: e.target.value})}
                margin="normal"
                required
                sx={textFieldStyles}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              
              <TextField
                fullWidth
                label="Title"
                value={newsForm.title}
                onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                margin="normal"
                required
                sx={textFieldStyles}
              />
              
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={newsForm.date}
                onChange={(e) => setNewsForm({...newsForm, date: e.target.value})}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                sx={textFieldStyles}
              />
              
              <TextField
                fullWidth
                label="Image URL"
                value={newsForm.image}
                onChange={(e) => setNewsForm({...newsForm, image: e.target.value})}
                margin="normal"
                required
                sx={textFieldStyles}
              />
              
              <TextField
                fullWidth
                label="Summary"
                value={newsForm.summary}
                onChange={(e) => setNewsForm({...newsForm, summary: e.target.value})}
                margin="normal"
                multiline
                rows={2}
                required
                sx={textFieldStyles}
              />
              
              <TextField
                fullWidth
                label="Content"
                value={newsForm.content}
                onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                margin="normal"
                multiline
                rows={6}
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
                {editingNews ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </Container>
  );
}

export default ManageNews; 