import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Alert
} from '@mui/material';

function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/news');
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      // Sort news by date, most recent first
      const sortedNews = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setNews(sortedNews);
    } catch (error) {
      setError('Failed to load news');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom color="white">
          Stories from the Field
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Grid container spacing={4}>
          {news.map((article) => (
            <Grid item xs={12} md={4} key={article._id}>
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
                  image={article.image}
                  alt={article.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip 
                    label={article.category}
                    sx={{ 
                      mb: 2,
                      backgroundColor: 
                        article.category === 'Stories' ? '#1976d2' :
                        article.category === 'Education' ? '#2e7d32' :
                        '#ed6c02',
                      color: 'white'
                    }}
                  />
                  <Typography variant="h5" component="h2" gutterBottom color="white">
                    {article.title}
                  </Typography>
                  <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.7)" gutterBottom>
                    {new Date(article.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                    {article.summary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default News; 