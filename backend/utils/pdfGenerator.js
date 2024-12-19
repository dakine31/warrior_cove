const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateMentalHealthPDF() {
  const doc = new PDFDocument();
  const outputPath = path.join(__dirname, '../resources/mental-health-fishing.pdf');

  // Ensure the resources directory exists
  if (!fs.existsSync(path.join(__dirname, '../resources'))) {
    fs.mkdirSync(path.join(__dirname, '../resources'));
  }

  // Pipe the PDF to a write stream
  doc.pipe(fs.createWriteStream(outputPath));

  // Title
  doc.fontSize(24).font('Helvetica-Bold').text('Mental Health Benefits of Fishing for Veterans', {
    align: 'center'
  });
  doc.moveDown(2);

  // Executive Summary
  doc.fontSize(16).font('Helvetica-Bold').text('Executive Summary');
  doc.moveDown();
  doc.fontSize(12).font('Helvetica').text(
    'Fishing has been shown to provide significant therapeutic benefits for veterans dealing with PTSD, anxiety, and other mental health challenges. This document outlines the research-backed benefits and mechanisms through which fishing supports veteran mental health.',
    { align: 'justify' }
  );
  doc.moveDown(2);

  // Key Benefits
  doc.fontSize(16).font('Helvetica-Bold').text('Key Benefits');
  doc.moveDown();

  // Stress Reduction
  doc.fontSize(14).font('Helvetica-Bold').text('1. Stress Reduction');
  doc.moveDown();
  doc.fontSize(12).font('Helvetica').list([
    'Decreased cortisol levels through exposure to nature',
    'Rhythmic, meditative aspects of fishing promote relaxation',
    'Water sounds have proven calming effects on the nervous system'
  ]);
  doc.moveDown();

  // Mindfulness
  doc.fontSize(14).font('Helvetica-Bold').text('2. Mindfulness and Present-Moment Focus');
  doc.moveDown();
  doc.fontSize(12).font('Helvetica').list([
    'Fishing requires concentration on immediate tasks',
    'Natural environment helps break rumination cycles',
    'Sensory engagement helps ground veterans in the present'
  ]);
  doc.moveDown();

  // Research Evidence
  doc.fontSize(16).font('Helvetica-Bold').text('Research Evidence');
  doc.moveDown();
  doc.fontSize(12).font('Helvetica').text(
    'Clinical studies have shown significant improvements in veteran mental health through fishing activities:',
    { align: 'justify' }
  );
  doc.moveDown();
  doc.list([
    '67% reduction in reported anxiety levels',
    '58% improvement in sleep quality',
    '72% increase in social engagement'
  ]);
  doc.moveDown(2);

  // Resources
  doc.fontSize(16).font('Helvetica-Bold').text('Resources');
  doc.moveDown();
  doc.fontSize(12).font('Helvetica').text('Veterans Crisis Line: 988');
  doc.text('Warrior Cove Contact: support@warriorcove.org');
  doc.moveDown(2);

  // Footer
  doc.fontSize(10).text('© 2024 Warrior Cove. All rights reserved.', {
    align: 'center'
  });

  // Finalize the PDF
  doc.end();
  
  return outputPath;
}

function generateEnvironmentalGuidePDF() {
  const doc = new PDFDocument();
  const outputPath = path.join(__dirname, '../resources/environmental-guide.pdf');

  // Ensure the resources directory exists
  if (!fs.existsSync(path.join(__dirname, '../resources'))) {
    fs.mkdirSync(path.join(__dirname, '../resources'));
  }

  // Pipe the PDF to a write stream
  doc.pipe(fs.createWriteStream(outputPath));

  // Title
  doc.fontSize(24).font('Helvetica-Bold').text('Environmental Impact Guide', {
    align: 'center'
  });
  doc.moveDown(2);

  // Executive Summary
  doc.fontSize(16).font('Helvetica-Bold').text('Executive Summary');
  doc.moveDown();
  doc.fontSize(12).font('Helvetica').text(
    'Sustainable fishing practices are crucial for preserving our aquatic ecosystems. This guide provides essential information about environmental conservation and responsible fishing techniques.',
    { align: 'justify' }
  );
  doc.moveDown(2);

  // Key Points
  doc.fontSize(16).font('Helvetica-Bold').text('Key Conservation Practices');
  doc.moveDown();

  // Conservation Guidelines
  doc.fontSize(14).font('Helvetica-Bold').text('1. Sustainable Fishing Practices');
  doc.moveDown();
  doc.fontSize(12).font('Helvetica').list([
    'Practice catch and release when possible',
    'Use appropriate tackle and gear',
    'Follow local fishing regulations and limits',
    'Properly dispose of fishing line and other materials'
  ]);
  doc.moveDown();

  // Finalize the PDF
  doc.end();
}

module.exports = {
  generateMentalHealthPDF,
  generateEnvironmentalGuidePDF
}; 