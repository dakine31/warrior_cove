import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#232323',
        borderTop: '1px solid #3C3C3C',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © 2024 Warrior Cove. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <IconButton color="inherit" href="https://facebook.com" target="_blank" sx={{ color: '#ffffff' }}>
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" href="https://twitter.com" target="_blank" sx={{ color: '#ffffff' }}>
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" href="https://instagram.com" target="_blank" sx={{ color: '#ffffff' }}>
            <InstagramIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer; 