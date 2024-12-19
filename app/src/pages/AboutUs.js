import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

function AboutUs() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Our Story
        </Typography>
        <Paper sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Mission Statement
          </Typography>
          <Typography variant="body1" paragraph>
            At Warrior Cove, we are committed to creating a supportive community for veterans 
            and their families. Our organization was founded by veterans who understand 
            firsthand the challenges of military transition and civilian reintegration.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            Who We Are
          </Typography>
          <Typography variant="body1" paragraph>
            We are a team of dedicated veterans and civilian supporters working together 
            to provide resources, community, and opportunities for those who have served 
            our nation. Our diverse background allows us to understand and address the 
            unique needs of the veteran community.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            What We Do
          </Typography>
          <Typography variant="body1" paragraph>
            Through various programs and initiatives, we focus on:
          </Typography>
          <ul>
            <Typography component="li" sx={{ ml: 2, mb: 1 }}>
              Building a strong veteran community
            </Typography>
            <Typography component="li" sx={{ ml: 2, mb: 1 }}>
              Providing transition assistance and resources
            </Typography>
            <Typography component="li" sx={{ ml: 2, mb: 1 }}>
              Creating networking opportunities
            </Typography>
            <Typography component="li" sx={{ ml: 2, mb: 1 }}>
              Supporting veteran families
            </Typography>
          </ul>
        </Paper>
      </Box>
    </Container>
  );
}

export default AboutUs; 