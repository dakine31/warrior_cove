import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Card, 
  CardContent, 
  CardMedia 
} from '@mui/material';

function Programs() {
  const testimonials = [
    {
      id: 1,
      name: "John D.",
      branch: "USMC",
      quote: "Warrior Cove's fishing retreat gave me a chance to reconnect with fellow veterans while enjoying the peace of nature. It was exactly what I needed.",
      image: "/testimonial1.jpg" // You'll need to add these images to public folder
    },
    {
      id: 2,
      name: "Sarah M.",
      branch: "Army",
      quote: "The therapeutic aspect of fishing combined with the camaraderie of other veterans created an incredible healing experience.",
      image: "/testimonial2.jpg"
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Programs & Initiatives
        </Typography>

        {/* Fishing Events & Retreats Section */}
        <Paper sx={{ p: 4, mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Fishing Events & Retreats
          </Typography>
          <Typography variant="body1" paragraph>
            Our signature fishing programs provide veterans with therapeutic outdoor experiences
            that promote healing, camaraderie, and personal growth. Each event is carefully
            designed to create a supportive environment where veterans can connect with nature
            and each other.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Therapeutic Retreats
                  </Typography>
                  <Typography variant="body2">
                    Multi-day fishing expeditions focused on healing and brotherhood
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Skills Workshops
                  </Typography>
                  <Typography variant="body2">
                    Learn fishing techniques from experienced guides
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Family Fishing Days
                  </Typography>
                  <Typography variant="body2">
                    Special events for veterans and their families
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Success Stories Section */}
        <Paper sx={{ p: 4, mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Success Stories
          </Typography>
          <Grid container spacing={3}>
            {testimonials.map((testimonial) => (
              <Grid item xs={12} md={6} key={testimonial.id}>
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={testimonial.image}
                    alt={testimonial.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {testimonial.name} - {testimonial.branch}
                    </Typography>
                    <Typography variant="body2">
                      "{testimonial.quote}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Photo Gallery Section */}
        <Paper sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Photo Gallery
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`/gallery${item}.jpg`}
                    alt={`Gallery image ${item}`}
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default Programs; 