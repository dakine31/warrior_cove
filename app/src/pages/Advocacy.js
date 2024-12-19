import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

function Advocacy() {
  const resources = [
    {
      id: 1,
      title: "Mental Health Benefits of Fishing",
      description: "Research-backed information on how fishing helps veterans cope with PTSD and anxiety.",
      downloadLink: "/resources/pdf/mental-health-fishing.pdf"
    },
    {
      id: 2,
      title: "Environmental Impact Guide",
      description: "Learn about sustainable fishing practices and conservation efforts.",
      downloadLink: "/resources/pdf/environmental-guide.pdf"
    }
  ];

  const actionItems = [
    {
      title: "Spread the Word",
      description: "Share our mission on social media and help us reach more veterans.",
      action: "Share Now"
    },
    {
      title: "Community Ambassador",
      description: "Become an ambassador for Warrior Cove in your local community.",
      action: "Learn More"
    },
    {
      title: "Conservation Pledge",
      description: "Join our initiative for responsible fishing and environmental stewardship.",
      action: "Take the Pledge"
    }
  ];

  const handleDownload = async (resourceName) => {
    try {
      const filename = resourceName.split('/').pop();
      const response = await fetch(`http://localhost:5001/api/resources/${filename}`);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resource:', error);
      alert('Failed to download resource. Please try again later.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Advocacy & Awareness
        </Typography>

        {/* Educational Resources */}
        <Paper sx={{ p: 4, mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Educational Resources
          </Typography>
          <Grid container spacing={3}>
            {resources.map((resource) => (
              <Grid item xs={12} md={6} key={resource.id}>
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                  <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {resource.title}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {resource.description}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleDownload(resource.downloadLink)}
                    >
                      DOWNLOAD RESOURCE
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Take Action Section */}
        <Paper sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Take Action
          </Typography>
          <List>
            {actionItems.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  mb: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  borderRadius: 1,
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  padding: 3,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)'
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                      {item.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      {item.description}
                    </Typography>
                  }
                  sx={{ mb: { xs: 2, sm: 0 } }}
                />
                <Button 
                  variant="contained" 
                  sx={{ 
                    ml: { sm: 2 },
                    backgroundColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#1565c0'
                    }
                  }}
                >
                  {item.action}
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
}

export default Advocacy; 