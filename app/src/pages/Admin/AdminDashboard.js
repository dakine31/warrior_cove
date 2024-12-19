import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const modules = [
    {
      title: 'Events',
      description: 'Manage upcoming events and registrations',
      link: '/admin/events'
    },
    {
      title: 'News',
      description: 'Update news articles and announcements',
      link: '/admin/news'
    },
    {
      title: 'Programs',
      description: 'Manage program information and content',
      link: '/admin/programs'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          {modules.map((module, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.12)'
                  }
                }}
              >
                <Typography variant="h5" component="h2" gutterBottom>
                  {module.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {module.description}
                </Typography>
                <Button
                  component={Link}
                  to={module.link}
                  variant="contained"
                  fullWidth
                >
                  Manage {module.title}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default AdminDashboard; 