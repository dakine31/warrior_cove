import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Warrior Cove
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Supporting Our Veterans Community
        </Typography>
        <Typography variant="body1" paragraph>
          We are dedicated to serving veterans and their families through various
          programs and initiatives. Our mission is to provide support, resources,
          and community engagement opportunities for those who have served our country.
        </Typography>
      </Box>
    </Container>
  );
}

export default Home; 