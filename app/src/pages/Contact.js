import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
  MenuItem
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Contact() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission
    setSnackbar({
      open: true,
      message: 'Message sent successfully! We will respond shortly.',
      severity: 'success'
    });
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const faqs = [
    {
      question: "How can I participate in your programs?",
      answer: "Our programs are open to all veterans and their families. Simply register for an event through our Events page or contact us directly for more information."
    },
    {
      question: "Do I need fishing experience to participate?",
      answer: "No experience is necessary! We provide all equipment and instruction for beginners."
    },
    {
      question: "How is Warrior Cove funded?",
      answer: "We are funded through a combination of private donations, corporate sponsorships, and grants. All donations are tax-deductible."
    },
    {
      question: "Can I volunteer if I'm not a veteran?",
      answer: "Absolutely! We welcome volunteers from all backgrounds who are passionate about supporting veterans."
    }
  ];

  const subjectOptions = [
    "General Inquiry",
    "Program Information",
    "Volunteer Opportunities",
    "Media Request",
    "Partnership Proposal",
    "Other"
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Contact & Support
        </Typography>

        {/* Contact Form */}
        <Paper sx={{ p: 4, mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Get in Touch
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  required
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                >
                  {subjectOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" size="large">
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* FAQs Section */}
        <Paper sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
            <Accordion 
              key={index}
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                mb: 1,
                '&:before': { display: 'none' }
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Contact; 